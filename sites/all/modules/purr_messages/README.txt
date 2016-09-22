// $Id:

This module hooks into the D7 theme registry to override the core message display.

The purr messages, in their default state, look similar to Growl messages
on OS X and float in their own jquery based windows. The module uses the name and
some of the functionality of the purr jquery function created by Net Perspective:
http://net-perspective.com/

------------------------------------------------------
Install:

Download the module and untar into your site's modules directory. Activate the module
from the Drupal modules page /admin/modules
------------------------------------------------------
Usage:

Simply install the module and the core message system will be overridden.
Note that only the superadmin will see the purr style messages unless the permission
has been set for other user roles.
If javascript is turned off the messages revert to the usual core ones.
There is an admin page at /admin/config/user-interface/purr which allows you to change
various settings. A default set has been included to give you a start.

You can decided to disable the display of purr style messages on admin pages.

You can also decide to only display purr style messages when explicitly called
using the status parameter of 'purr' in drupal_set_message(). For example, in your
custom code you could call:
drupal_set_message('my custom message content', 'purr');

or if you wanted a warning coloured message:
drupal_set_message('my custom message content', 'purr');

This setting is also useful in conjunction with the Rules action (see below).
------------------------------------------------------
Rules integration:

There is a custom rules action included which when used in with the purr admin
setting 'Only show purr message style if explicitly called' will allow you
to display a purr message given a specific condition. Note that you don't need to
have the 'explicitly called' setting turned on to display a purr message using
the rules feature.
------------------------------------------------------
Customisation:

To customise the display of the messages copy the folder called 'purrcss'
from the module's folder and place the copy in your theme folder.
You can then make adjustments to the copied purr.css and images as you see fit.
Note that if you are using an admin theme you'll also need to copy the purrcss
folder into the admin theme. This may or may not be an issue for future theme
updates so you may want to create an admin subtheme in this scenario.
------------------------------------------------------
Known issues:

IE6 & 7 aren't able to fade pngs with alpha so the code checks to see
whether IE is being used and also for the existence of the setting:

usingTransparentPNG:true.

In which case it simply shows and hides the messages rather than using
the gradual fade technique. Not as pretty but hey, its IE after all.
------------------------------------------------------

This module was written by Tanc. It uses code written by Net Perspective released
under the MIT licence which is compatible with Drupal's GPL v2.