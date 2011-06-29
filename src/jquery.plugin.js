/**
 * @fileOverview jQuery.plugin
 * A lightweight jQuery plugin factory.
 *
 * @author Kyle Florence
 * @website http://github.com/kflorence/jquery-plugin/
 * @version 0.3.2
 *
 * Based on jQuery.ui.widget - http://jqueryui.com
 *
 * Copyright (c) 2011 Kyle Florence
 * Dual licensed under the MIT and GPL Licenses.
 **/
;(function( $, undefined ) {
  var aps = Array.prototype.slice;

  /**
   * Plugin definition function.
   *
   * @param {String} name
   *    The name of the plugin to create.
   * @param {Object|Function} plugin
   *    An object or function representing the plugin.
   * @param {Object} [defaults]
   *    Default options for the plugin. If plugin is an object, these
   *    can be passed into the object instead.
   **/
  $.plugin = function( name, plugin, defaults ) {
    var pluginIsFunc = $.isFunction( plugin );

    /**
     * Instance creation function.
     *
     * @param {Element} element
     *    The element we are attaching the instance to.
     * @param {Array} args
     *    The arguments to pass to the initialization function.
     **/
    function create( element, elements, args ) {
      var instance;

      // Object cloning is definitely slower than prototypical inheritance,
      // but it lets us have unique properties within our objects.
      $.data( element, name, instance = $.extend({

        // Override default Object.prototype.constructor with undefined
        // if the plugin is not a function, otherwise use plugin function
        constructor: pluginIsFunc ? plugin : undefined
      }, $.plugin.base, plugin, {
        name: name,
        element: element,
        elements: elements,

        // If arg[ 0 ] is object, merge it into default options
        options: $.extend( true, {}, $.fn[ name ].options,
            typeof args[ 0 ] === "object" ? args[ 0 ] : {} )
      }));

      instance._initialize.apply( instance, args );

      return instance;
    }

    /**
     * Create our plugin in the jQuery.fn namespace.
     *
     * @param {String|Object} [options]
     *    The name of a public method within the plugin, or, on the first
     *    call to this function, a hash of options that will be passed to
     *    the init function.
     *
     * Any additional arguments will be passed directly to the method.
     **/
    $.fn[ name ] = function( options ) {
      var result, elements = this,
        isMethodCall = typeof options === "string" && options.length,
        method = isMethodCall ? options : "constructor",
        args = aps.call( arguments, isMethodCall ? 1 : 0 );

      this.each(function() {
        var instance = $.data( this, name ) || create( this, elements, args );

        // Maintain pseudo-private functions by denying access to any method
        // that starts with an underscore.
        if ( method.charAt( 0 ) !== "_" && $.isFunction( instance[ method ] ) ) {
          // Break the loop if we have a return value
          return ( result = instance[ method ].apply( instance, args ) ) === undefined;
        }
      });

      // If there is no return value, return element set
      return result !== undefined ? result : this;
    };

    /**
     * Publicly expose the plugin's default options for global override
     **/
    $.fn[ name ].options = typeof plugin.options === "object" ? plugin.options
      : ( typeof defaults === "object" ? defaults : {} );

    /**
     * Create a custom selector for the plugin. This makes it easy to
     * check for elements of the plugin type within the DOM.
     *
     * @param {jQuery} element
     *    The jQuery element to test against.
     **/
    $.expr[ ":" ][ name ] = function( element ) {
      return !!$.data( element, name );
    };
  };

  /**
   * This is the public base prototype that all plugins inherit from.
   **/
  $.plugin.base = {
    _initialize: function() {}
  };
})( jQuery );
