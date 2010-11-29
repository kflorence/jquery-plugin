# The jQuery.plugin plugin

jQuery.plugin is a lightweight jQuery plugin factory based on jQuery.ui.widget.

## Okay, what does that mean?

Basically, jQuery.plugin makes it easy to attach unique object instances to any jQuery element. It is also built with the jQuery
plugin development pattern in mind, which, among other things, includes options inheritance (with the ability to override
within instances) and the ability to call methods on elements without breaking the chain (the exception being, of
course, that your method returns something).

## Why not use jQuery.ui.widget?

While much of this functionality can be found in the jQuery.ui.widget plugin, jQuery.ui.widget was obviously designed to 
integrate into the jQuery.ui library. This brings with it unessesary functionality and overhead, not to mention the requirement
of including the jQuery.ui library itself. With this in mind, jQuery.plugin was built for speed and flexibility and has
been optimized for both minimal file size and maximum efficiency.

## When not to use this plugin

This plugin is by no means a replacement for jQuery.ui.widget, and if you are already planning on using the jQuery.ui
library, there is really no need to use this plugin.

## Requirements

jQuery.plugin requires jQuery version 1.2.3 or higher.

## Compatibility

Verified to work on Internet Explorer 6.0+, Firefox 3.0+ and Chrome 7.0+
