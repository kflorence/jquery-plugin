# jQuery.plugin

    $.plugin( "pluginName", { /* The plugin */ } );
    $.plugin( "pluginName", function() { /* The Plugin */ }, { /* Options */ } );

jQuery.plugin is a lightweight jQuery plugin factory based on jQuery.ui.widget.

## What Does It Do?

Basically, jQuery.plugin _makes it easy to attach unique object instances to
jQuery elements_. It is also built with jQuery plugin development patterns in
mind, which, among other things, includes options inheritance (with the ability
to override within instances) and the ability to call methods on elements
_without breaking the chain_ (the exception being, of course, that your
method returns something).

## How Does It Differ From jQuery.ui.widget?

While much of the same functionality exists in the official jQuery.UI.widget
plugin, jQuery.plugin has been stripped down to the bare essentials, offering
a much smaller fingerprint and optimizations for both speed and flexibility.
This allows you to get your plugin set up quickly with the most commonly used
functionalities already in place for you.

### Options

jQuery.plugin will automatically merge user options with the default ones on
initialization, but, unlike jQuery.ui.widget, it does not provide getter
or setter methods for the options (though you can easily add it yourself).

### Callbacks

jQuery.plugin does not provide any callback or event handling methods.

### Initialization

jQuery.plugin allows you to call methods on your plugin without
instantiating it. In this case, the default plugin options will be used.

### Plugin Prototype

jQuery.plugin allows you to define your plugin using a function instead
of an object. This is useful for simple plugins that don't have any public
methods and is very common in jQuery plugin development. In the case that a
function is used, options may be defined as the third argument.

### Unique Properties

jQuery.plugin clones prototype properties to allow unique properties on
instances. This differs from jQuery.ui.widget, which only clones the
`options` property.

## Defining Your Plugin

To define your plugin, simply pass a name and **object or function** to the
jQuery.plugin method. This will become the name of your plugin and will be
stored in the jQuery.fn namespace. Optionally, you can pass a third argument
that contains the default options for your plugin (if your plugin is defined
using an object, you can also assign them there inside of a key called
`options`).

**Caution**: there are no checks in place to detect pre-existing
functions. For this reason, it is possible to override jQuery core functions,
which may or may not be what you intended. Always reference the jQuery API
before settling on a plugin name.

    // Defining your plugin using an object
    $.plugin("name", {...});

    // Or, using a function
    $.plugin("name", function() {...}, { someOption: "someValue" });

You can define whatever you would like inside of the object (properties,
methods... etc).

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

Properties that are prefixed with an underscore will become psuedo-private and
will only be accessible from inside your plugin. If you define a function
inside of your plugin called `initialize()` it will be invoked on initialization
with the arguments that were passed into the plugin on its first call.

If your plugin contains a function named `constructor()`, it will be called
anytime the plugin is invoked without calling another method (in other words,
any time the first parameter is not a string).

**Note**: The public constructor function is also called on initialization,
right after the private initialization function and with the same arguments.
You can also call your public constructor function at any time by passing the
string "constructor", an empty string "", or passing any non-string value as
the first argument to the plugin.

### Plugin properties

Inside of your plugin, you may refer to the current object instance by using
the keyword `this` -- just as you would in any normal object/class environment.
Upon initialization, several properties are automatically assigned to the
instance for you.

*   **name**, _String_  
    The name of the plugin.

*   **element**, _Element_  
    The single DOMElement upon which the plugin was invoked.

*   **elements**, _jQuery_  
    All of the elements that were passed to the plugin on initialization.

*   **options**, _Object_  
    The options for the plugin instance which are a mixture of the default
    options and any the user may have passed in.

**Note**: Unlike jQuery.ui.widget, the `element` property contains a DOM
element, not a jQuery object. However, the value of the `elements` property
is a jQuery object.

## Using Your Plugin

Now that you have defined your plugin, it is automatically available in the
jQuery.fn namespace, meaning it can be chained to a jQuery element. The options
for your plugin are also automatically exposed publically as a property of the
plugin (`$.fn.pluginName.options`). While not required, it is probably wise to
stick "plugin" in the filename so people are aware that your plugin is dependent
on jQuery.plugin (for example, "jQuery.plugin.myPlugin.js"). Make sure to also
bundle this plugin with yours, or at the very least link to its source.

Much like jQuery.ui.widget, jQuery.plugin allows method calls to your plugin by
passing a string value as the first parameter. If the first parameter to the
plugin is not a string value and the plugin has not been initialized, the
private initialization function `initialize()` will be invoked. If the plugin
has already been initialized, the public constructor function will be called.
By passing an object as the first parameter to the plugin, you can extend the
default set of options with your own. This is done for you automatically on
initialization, but on further calls to your public constructor you will have
to handle the behavior yourself.

Unlike jQuery.ui.widget, you can call a method on an element without
initializing, using the default values given when the plugin was defined. If
this is not desirable, simply initialize your plugin beforehand.

    // Initialize before method call
    $("#someElement").pluginName({x: 1}); // starting value of x = 1
    $("#someElement").pluginName("someMethod", 1); // add 1 => 3

    // Method call without initialization, starting value of x = 0
    $("#someOtherElement").pluginName("someMethod", 1); // add 1 => 1

Remember that in order to preserve chainability, your function should not have
a return value.

    // Chainable method call, assuming x = 1
    $("#someElement").pluginName("someChainingMethod", 3).somethingElse();
    // this.options.x => 4

Keep in mind that like any jQuery function that returns a value, _method calls
will return the value of the first element in the set of matched elements_.
This means that your method will only be invoked on that first element. This
does not apply, however, to methods that have no return value, as jQuery.plugin
will internally loop through each element and invoke your method on each one.

## Requirements

*   **[jQuery](http://jquery.com/)**  
    Versions 1.2.3 or higher.

## Compatibility

This list is not exhaustive; these are simply browsers in which the script has
been verified to work. It may very well work fine in other browsers.

*   **[Internet Explorer](http://windows.microsoft.com/en-US/internet-explorer/products/ie/home)**  
    Versions 6.0 and higher.

*   **[Mozilla Firefox](http://www.mozilla.com/en-US/firefox/new/)**  
    Versions 3.0 and higher.

*   **[Google Chrome](http://www.google.com/chrome/)**  
    Versions 7.0 and higher.

## License

Copyright (c) 2011 Kyle Florence  
Dual licensed under the MIT and GPLv2 licenses.
