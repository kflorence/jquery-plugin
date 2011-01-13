# The jQuery.plugin plugin

jQuery.plugin is a lightweight jQuery plugin factory based on jQuery.ui.widget.

## Okay, what does that mean?

Basically, **jQuery.plugin makes it easy to attach unique object instances to any jQuery element**. It is also built with the jQuery
plugin development pattern in mind, which, among other things, includes options inheritance (with the ability to override
within instances) and the ability to call methods on elements **without breaking the chain** (the exception being, of
course, that your method returns something).

## Why not use jQuery.ui.widget?

While much of this functionality can be found in the jQuery.ui.widget plugin, jQuery.ui.widget was obviously designed to 
integrate into the jQuery.ui library which brings with it unessesary functionality and overhead. With this in mind, the 
jQuery.plugin was built for both speed and flexibility and has been optimized for minimal file size and maximum efficiency.
**jQuery.plugin was also made with the jQuery plugin development pattern in mind, making it faster and easier to get
plugins up and running with common features already provided for you**.

## When not to use this plugin

This plugin is by no means a replacement for jQuery.ui.widget. If you are already planning on using the jQuery.ui
library for your plugin, there is really no need to use jQuery.plugin.

## Setting up your plugin

To define your plugin, simply pass a name and **object or function** to the jQuery.plugin method. This will become the
name of your plugin and will be stored in the jQuery.fn namespace. Optionally, you can pass a third argument
that contains the default options for your plugin (if your plugin is defined using an object, you can also
assign them there inside of a key called _options_). **Caution**: there are no checks in place to detect
pre-existing functions. For this reason, it is possible to override jQuery core functions, which may or may
not be what you intended. Always reference the jQuery API before settling on a plugin name.

    // Defining your plugin using an object
    $.plugin("name", {...});

    // Or, using a function
    $.plugin("name", function() {...}, { someOption: "someValue" });

You can define whatever you would like inside of the object (properties, methods... etc).

    $.plugin("pluginName", {
      // These are the default options for the plugin, they can be overriden on
      // initialization by passing in an object as the first argument
      options: {
        x: 0
      },
      // Private initialization function.
      _initialize: function() {
        // Anything in here will only be applied on initialization
        $(this.element).css("background-color", "#EEEEEE");
      },
      // Public constructor.
      constructor: function() {
        // Anything in here will be applied any time the public constructor is called
        // ...
      },
      someMethod: function(x) {
        return this.options.x + x;
      },
      someChainingMethod: function(x) {
        this.options.x + x;
      }
    });

Properties that are prefixed with an underscore will become psuedo-private and will only be accessible
from inside your plugin. If you define a function inside of your plugin called __initialize_ it will be invoked on
initialization with the arguments that were passed into the plugin on its first call.

If your plugin contains a function named _constructor_, it will be called anytime the plugin is invoked without
calling another method (in other words, any time the first parameter is not a string). **NOTE**: The public
constructor function is also called on initialization, right after the private initialization function and with
the same arguments. You can also call your public constructor function at any time by passing the string
"constructor", an empty string "", or passing non-string value as the first argument to the plugin.

### Plugin properties

Inside of your plugin, you may refer to the current object instance by using the keyword "this" -- just as you would in
any normal object/class environment. Upon initialization, several properties are automatically assigned to the instance:
_name_, which contains the name of the plugin, _element_ which contains the element the plugin is currently being
invoked on, _elements_ which contains all of the elements that were passed to the plugin on initialization, and
_options_, which contain all of the options for the plugin (including those merged in). These properties are available
to both object and function based plugins. **NOTE**: Unlike jQuery.ui.widget, the _element_ property contains a DOM
element, not a jQuery element.  However, the value of _elements_ **is** of type jQuery.

## Using your plugin

Now that you have defined your plugin, it is automatically available in the jQuery.fn namespace, meaning it can be
chained to a jQuery element. The options for your plugin are also automatically exposed publically as a property
of the plugin ($.fn.pluginName.options). While not required, it is probably wise to stick "plugin" in the filename
so people are aware that your plugin is dependent on jQuery.plugin (for example, _jQuery.plugin.myPlugin.js_). Make
sure you also bundle this plugin with yours, or at the very least link to its source.

Much like jQuery.ui.widget, jQuery.plugin allows method calls to your plugin by passing a string value as the
first parameter.  If the first parameter to the plugin is not a string value and the plugin has not been initialized,
the private initialization function __initialize_ will be invoked. If the plugin has already been initialized, the public
constructor function will be called. By passing an object as the first parameter to the plugin, you can extend the
default set of options with your own. This is done for you automatically on initialization, but on further calls to
your public constructor you will have to handle the behavior yourself.

Unlike jQuery.ui.widget, you can call a method on an element without initializing, using the default values given when
the plugin was defined. If this is not desirable, simply initialize your plugin beforehand.

    // Initialize before method call
    $("#someElement").pluginName({x: 1}); // starting value of x = 1, _init increments by 1
    $("#someElement").pluginName("someMethod", 1); // add 1 => 3

    // Method call without initialization (starting value of x = 0, _init is not called)
    $("#someOtherElement").pluginName("someMethod", 1); // add 1 => 1

Remember that in order to preserve chainability, your function should not have a return value.

    // Chainable method call (assuming x = 1)
    $("#someElement").pluginName("someChainingMethod", 3).somethingElse(); // this.options.x => 4

Keep in mind that like any jQuery function that returns a value, **method calls will return the value of the first
element in the set of matched elements**. This means that your method will only be invoked on that first element. This
does not apply, however, to methods that have no return value, as jQuery.plugin will internally loop through each
element and invoke your method on each one.

## Requirements

jQuery.plugin requires jQuery version 1.2.3 or higher.

## Compatibility

Verified to work on Internet Explorer 6.0+, Firefox 3.0+ and Chrome 7.0+
