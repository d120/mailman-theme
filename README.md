Mailman-Theme für D120.de
--------------------------

Zur Installation auf einem Debian 7 diesen Ordner als /etc/mailman/de klonen und eine Apache-Alias auf ./styles anlegen.

    cd /etc/mailman
    mv de de_old
    git clone https://github.com/d120/mailman-theme.git de

In der VirtualHost-config, die auch /mailman einrichtet:

    Alias /assets/mailman      /etc/mailman/de/styles

Screenshot
----------

![Screenshot](https://chat2.teamwiki.de/ec1e4ea075ca6413168e.jpg)


