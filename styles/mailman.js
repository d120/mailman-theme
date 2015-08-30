// mailman.js

var urlMatch = location.pathname.match(/\/mailman\/+([a-z]+)(\/([A-Za-z0-9-]+))?/);
var currentView = urlMatch[1];

var dispListName = $("meta[name=list-name]").attr("content");
if (!dispListName) dispListName = urlMatch[3];

try { var recentlyUsed = JSON.parse(window.localStorage.mailmanRecent); }catch(e){}
if (! (recentlyUsed instanceof Array)) recentlyUsed = [];

if (dispListName) {
  var listName = dispListName.toLowerCase();

  var pos = recentlyUsed.indexOf(listName);
  if (pos > -1) recentlyUsed.splice(pos, 1);
  recentlyUsed.unshift(listName);
  if (recentlyUsed.length > 7) recentlyUsed.splice(7, 99);
  window.localStorage.mailmanRecent = JSON.stringify(recentlyUsed);
}

var navbarHtml = '<nav class="navbar navbar-default navbar-static-top orange-stripe"><div class="container"> \
    <div class="navbar-header"><a class="navbar-brand" href="/mailman/listinfo"><span>D120.de/</span>mailman</a></div> \
    <div id="navbar"><ul class="nav navbar-nav" id="topNavigation"></ul></div> \
  </div></nav>';

var menu = [];

if (listName) {
    menu = [
      ["listinfo", "Info", ""],
      [null, "Abonnieren", "/mailman/listinfo/"+listName+"#subscribe"],
      ["options", "Login f&uuml;r Mitglieder", ""],
      ["private", "Nachrichtenarchiv", ""],
      ["admin", "Admin", ""],
    ];
}
$(function() {
    if ($('#navbar').length == 0) {
        $("body>table:first-child").addClass("table").wrap("<div class=container>");
        $("body>hr+table").addClass("container").wrap("<footer>");
        $("body>form").addClass("container");
        $("body").prepend(navbarHtml);
    }

    var $nav = $("#topNavigation");
    if (listName)
      $nav.html('<li class="dropdown">\
	      <a href="#" class="dropdown-toggle" data-toggle="dropdown">' + dispListName + ' <span class="caret"></span></a>\
              <ul class="dropdown-menu" id="listOfLists"></ul></li>');
    recentlyUsed.forEach(function(name) {
      $('#listOfLists').append('<li><a href="/mailman/listinfo/'+name+'"><b>'+name+'</b></a></li>');
    });
    $.get('/mailman/listinfo', function(html) {
      var matches = html.match(/href="listinfo\/([A-Za-z0-9-]*)/g);
      for(var i in matches)
        $('#listOfLists').append('<li><a href="/mailman/'+matches[i].substr(6)+'">' + matches[i].substr(15) + '</a></li>');
      $("<div id='sideNav'></div>").html($("#listOfLists").html()).appendTo("body");
    });
    menu.forEach(function(item) {
	var href=item[0], text=item[1];
	var li = $("<li><a></a></li>").appendTo($nav).toggleClass("active", href == currentView)
	    .find("a").html(text).attr("href",!item[2] ? "/mailman/"+href+"/"+listName+"/"	 : item[2]);
    });


    var archiveRefTexts = { thread: "Diskussionsfaden", subject: "Betreff", author: "Autor", date: "Datum" };
    $("li[data-ref]").each(function() {
	var ref = this.getAttribute("data-ref");
	if (!$(this).find("a").length) $(this).addClass("active").html("<a href='#'>"+archiveRefTexts[ref]+"</a>");
	else $(this).find("a").html(archiveRefTexts[ref]);
    });



    
});





/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=adbdb628047aba50dc1d)
 * Config saved to config.json and https://gist.github.com/adbdb628047aba50dc1d
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var r=t.fn.jquery.split(" ")[0].split(".");if(r[0]<2&&r[1]<9||1==r[0]&&9==r[1]&&r[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(t){"use strict";function r(r){var e=r.attr("data-target");e||(e=r.attr("href"),e=e&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var o=e&&t(e);return o&&o.length?o:r.parent()}function e(e){e&&3===e.which||(t(n).remove(),t(a).each(function(){var o=t(this),n=r(o),a={relatedTarget:this};n.hasClass("open")&&(e&&"click"==e.type&&/input|textarea/i.test(e.target.tagName)&&t.contains(n[0],e.target)||(n.trigger(e=t.Event("hide.bs.dropdown",a)),e.isDefaultPrevented()||(o.attr("aria-expanded","false"),n.removeClass("open").trigger("hidden.bs.dropdown",a))))}))}function o(r){return this.each(function(){var e=t(this),o=e.data("bs.dropdown");o||e.data("bs.dropdown",o=new i(this)),"string"==typeof r&&o[r].call(e)})}var n=".dropdown-backdrop",a='[data-toggle="dropdown"]',i=function(r){t(r).on("click.bs.dropdown",this.toggle)};i.VERSION="3.3.5",i.prototype.toggle=function(o){var n=t(this);if(!n.is(".disabled, :disabled")){var a=r(n),i=a.hasClass("open");if(e(),!i){"ontouchstart"in document.documentElement&&!a.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",e);var d={relatedTarget:this};if(a.trigger(o=t.Event("show.bs.dropdown",d)),o.isDefaultPrevented())return;n.trigger("focus").attr("aria-expanded","true"),a.toggleClass("open").trigger("shown.bs.dropdown",d)}return!1}},i.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var o=t(this);if(e.preventDefault(),e.stopPropagation(),!o.is(".disabled, :disabled")){var n=r(o),i=n.hasClass("open");if(!i&&27!=e.which||i&&27==e.which)return 27==e.which&&n.find(a).trigger("focus"),o.trigger("click");var d=" li:not(.disabled):visible a",s=n.find(".dropdown-menu"+d);if(s.length){var p=s.index(e.target);38==e.which&&p>0&&p--,40==e.which&&p<s.length-1&&p++,~p||(p=0),s.eq(p).trigger("focus")}}}};var d=t.fn.dropdown;t.fn.dropdown=o,t.fn.dropdown.Constructor=i,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=d,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",a,i.prototype.toggle).on("keydown.bs.dropdown.data-api",a,i.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",i.prototype.keydown)}(jQuery);

