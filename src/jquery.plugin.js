/**
 * @fileOverview jQuery.plugin
 * A lightweight jQuery plugin factory.
 *
 * @author Kyle Florence
 * @website http://github.com/kflorence/jquery-plugin/
 * @version 0.2.2
 *
 * Based on jQuery.ui.widget - http://jqueryui.com
 *
 * Copyright (c) 2011 Kyle Florence
 * Dual licensed under the MIT and GPL Licenses.
 **/

;(function( $, undefined ) {
  var aps = Array.prototype.slice;

  /**
   * The jQuery.plugin plugin (has a nice ring to it doesn't it?)
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
     * Create our plugin in the jQuery.fn namespace.
     *
     * @param {String|Object} [options]
     *    The name of a public method within the plugin, or, on the first
     *    call to this function, a hash of options that will be passed to
     *    the init function.
     *
     * Any additional arguments will be passed directly to the method.
     **/
    $.fn[ name ] = function ( options ) {
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
    }

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
    }

    /**
     * Our instance creation function. Putting it here makes initialization a
     * little slower, but subsequent method calls inside of the plugin faster.
     *
     * @param {Element} element
     *    The element we are attaching the instance to.
     * @param {Array} args
     *    The arguments to pass to the initialization function.
     **/
    function create( element, elements, args ) {
      var instance;

      // Object cloning is definitely slower than prototypical inheritance,
      // but it lets us have unique instances within our objects.
      $.data( element, name, instance = $.extend({
        name: name,
        element: element,
        elements: elements,
        // Override default Object.prototype.constructor with undefined
        // if the plugin is not a function, otherwise use plugin function
        constructor: pluginIsFunc ? plugin : undefined
      }, plugin, {
        options: $.extend( true, {}, $.fn[ name ].options, args[ 0 ] )
      }));

      // Private initialization function will be invoked here if it exists
      if ( instance._initialize && $.isFunction( instance._initialize ) ) {
        instance._initialize.apply( instance, args );
      }

      return instance;
    }
  }
})( jQuery );
