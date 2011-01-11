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

To define your plugin, simply pass a name and object (or function) to the jQuery.plugin method. This will become the
name of your plugin and will be stored in the jQuery.fn namespace. Optionally, you can pass a third argument
that contains the default options for your plugin (if your plugin is defined using an object, you can also
assign them there inside of a key called "options"). __Caution__: there are no checks in place to detect
pre-existing functions. For this reason, it is possible to override jQuery core functions, which may or may
not be what you intended. Always reference the jQuery API before settling on a plugin name.

    // Defining your plugin using an object
    $.plugin("name", {...});

    // Or, using a function
    $.plugin("name", function() {...}, { someOption: "someValue" });

You can define whatever you would like inside of the object (properties, methods... etc).

    $.plugin("pluginName", {
      options: {
        x: 0
      },
      _init: function() {
        this.options.x++;
      },
      // public constructor function
      pluginName: function() {},
      someMethod: function(x) {
        return this.options.x + x;
      },
      someChainingMethod: function(x) {
        this.options.x + x;
      }
    });

Properties that are prefixed with an underscore ("_") will become psuedo-private and will only be accessible
from inside your plugin. If you define a function inside of your plugin called "_init" it will be invoked on
initialization, right after the default options are merged with those that are passed in. This function will
be given any arguments that are passed into the plugin on initialization, including any options that were
passed in.

If your plugin contains a function with the same name as the plugin, it will be treated as a public
constructor function. This function will be called anytime the plugin is invoked without calling another
method (in other words, any time the first parameter is not a string). The public constructor function is also
called on initialization, right after the private initialization function ("_init") and with the same
arguments. You can also call your public constructor function at any time like you would any other function.

### Using your plugin

Now that you have defined your plugin, it is automatically available in the jQuery.fn namespace, meaning it can be
chained to a jQuery element. The options for your plugin are also automatically exposed publically as a property
of the plugin ($.fn.pluginName.options).

Much like jQuery.ui.widget, jQuery.plugin allows method calls to your plugin by passing a string value as the
first parameter.  If the first parameter to the plugin is not a string value and the plugin has not been initialized,
the private initialization function ("_init") will be invoked. If the plugin has already been initialized, the public
constructor function will be called. By passing an object as the first parameter to the plugin, you can extend the
default set of options with your own. This is done for you automatically on initialization, but on further calls to
your public constructor you will have to handle the behavior yourself.

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
