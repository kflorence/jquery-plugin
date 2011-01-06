# The jQuery.plugin plugin

jQuery.plugin is a lightweight jQuery plugin factory based on jQuery.ui.widget.

## Okay, what does that mean?

Basically, jQuery.plugin makes it easy to attach unique object instances to any jQuery element. It is also built with the jQuery
plugin development pattern in mind, which, among other things, includes options inheritance (with the ability to override
within instances) and the ability to call methods on elements without breaking the chain (the exception being, of
course, that your method returns something).

## Why not use jQuery.ui.widget?

While much of this functionality can be found in the jQuery.ui.widget plugin, jQuery.ui.widget was obviously designed to 
integrate into the jQuery.ui library which brings with it unessesary functionality and overhead. With this in mind, the 
jQuery.plugin was built for both speed and flexibility and has been optimized for minimal file size and maximum efficiency.

## When not to use this plugin

This plugin is by no means a replacement for jQuery.ui.widget, and if you are already planning on using the jQuery.ui
library, there is really no need to use this plugin.

## Examples

### Setting up your plugin

To define your plugin, simply pass a name and object to the jQuery.plugin method. This will become the name of your
plugin and will be stored in the jQuery.fn namespace. __Caution__: there are no checks in place to detect pre-existing
functions. For this reason, it is possible to override jQuery core functions, which may or may not be what you intended.
Always reference the jQuery API before settling on a plugin name.

    // Defining your plugin
    $.plugin("name", {...});

You can define whatever you would like inside of the object (properties, methods... etc).

    $.plugin("pluginName", {
      options: {
        x: 0
      },
      someMethod: function(x) {
        return this.options.x + x;
      },
      someChainingMethod: function(x) {
        this.options.x + x;
      }
    });

### Using your plugin

Now that you have defined your plugin, it is automatically available in the jQuery.fn namespace, meaning it can be
chained to a jQuery element. Much like jQuery.ui.widget, jQuery.plugin allows method calls to your plugin by passing a
string value as the first parameter.  If the first parameter to the plugin is not a string value, it is assumed that the
plugin is being initialized.  By passing an object as the first parameter to the plugin, you can extend the default set
of options with your own.

Unlike jQuery.ui.widget, you can call a method on an element without initializing, using the default values given when
the plugin was defined. If this is not desirable, simply initialize your plugin beforehand.

    // Initialize before method call
    $("#someElement").pluginName({x: 1}); // extend options, overwrites matching keys
    $("#someElement").pluginName("someMethod", 1); // => 2

    // Method call without initialization
    $("#someOtherElement").pluginName("someMethod", 1); // => 1

Remember that in order to preserve chainability, your function should not have a return value.

    // Chainable method call
    $("#someElement").pluginName("someChainableMethod", 3).somethingElse(); // this.options.x => 4

## Requirements

jQuery.plugin requires jQuery version 1.2.3 or higher.

## Compatibility

Verified to work on Internet Explorer 6.0+, Firefox 3.0+ and Chrome 7.0+
