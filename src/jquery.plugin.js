/**
 * @fileOverview jQuery.plugin
 * A lightweight jQuery plugin factory.
 *
 * @author Kyle Florence
 * @website http://github.com/kflorence/jquery-plugin/
 * @version 0.2.0
 *
 * Based on jQuery.ui.widget - http://jqueryui.com
 *
 * Copyright (c) 2010 Kyle Florence
 * Dual licensed under the MIT and GPL Licenses.
 */

;(function($) {
  var aps = Array.prototype.slice;

  /**
   * The jQuery.plugin plugin (has a nice ring to it doesn't it?)
   *
   * @param {String} name The name of the plugin to create.
   * @param {Mixed} plugin An object or function representing the plugin.
   * @param {Object} defaults (Optional) Default options for the plugin. If
   *     plugin is an object, these can be passed into the object instead.
   */
  $.plugin = function(name, plugin, defaults) {
    /**
     * Our instance creation function. Putting it here makes initialization a
     * little slower, but subsequent method calls inside of the plugin faster.
     *
     * @param {Element} element The element we are attaching the instance to.
     * @param {Array} args The arguments to pass to the initialization function.
     */
    function create(element, args) {
      var instance, options;

      // Object cloning is definitely slower than prototypical inheritance,
      // but it lets us have unique instances within our objects.
      $.data(element, name, instance = $.extend(true, {
        element: element,
        options: {}
      }, plugin));

      // Extend default options with those passed in
      if (typeof (options = args[0]) === 'object') {
        instance.options = $.extend(true, instance.options, $.fn[name].options, options);
      }

      // After the instance has been created, a private initialization function
      // may be called (if it exists) with the arguments that were passed into
      // the create function. This is the only time this function may be called.
      if ($.isFunction(instance._init)) {
        instance._init.apply(instance, args);
      }

      return instance;
    }

    /**
     * Create a custom selector for the plugin. This makes it easy to
     * check for elements of the plugin type within the DOM.
     *
     * @param element {jQuery} The jQuery element to test against.
     */
    $.expr[':'][name] = function(element) {
      return !!$.data(element, name);
    }

    /**
     * Create our plugin in the jQuery.fn namespace.
     *
     * @param {Mixed} options The name of a public method within the plugin,
     *     or, on the first call to this function, a hash of options that will
     *     be passed to the init function.
     *
     * Any additional arguments will be passed directly to the method.
     */
    $.fn[name] = function(options) {
      var result;

      // A plugin, in the simplest sense, could simply be a function.
      if ($.isFunction(plugin)) {
        var args = aps.call(arguments);

        // The result of the options merge will become the first argument
        // passed into the plugin function call.
        args.unshift($.extend(true, {}, $.fn[name].options, options));

        // Note that unlike with "complex" plugins, simple plugins are
        // called with "this" context equal to the element that invoked
        // the plugin.
        result = plugin.apply(this, args);
      }

      // If an object is passed, assume we are dealing with a psuedo-class
      // structure (an object with properties and methods). jQuery.isPlainObject
      // would be better here, but it restricts us to jQuery >= 1.4
      else if (typeof plugin === 'object') {
        var haveMethod = typeof options === 'string',
          method = haveMethod ? options : name,
          args = aps.call(arguments, haveMethod ? 1 : 0);

        this.each(function() {
          var instance = $.data(this, name) || create(this, args);

          // Maintain pseudo-private functions by denying access to any method
          // that starts with an underscore.
          if (method.charAt(0) !== '_' && $.isFunction(instance[method])) {
            return (result = instance[method].apply(instance, args)) !== undefined;
          }
        });
      }

      // In order to maintain chainability, we return a reference to the
      // current element unless the result of the method call returns a
      // non-undefined value.
      return result !== undefined ? result : this;
    }

    /**
     * Publicly expose the plugin's default options for global override
     */
    $.fn[name].options = 'options' in plugin && typeof plugin.options === 'object'
      ? plugin.options : (typeof defaults === 'object' ? defaults : {});
  }
})(jQuery);
