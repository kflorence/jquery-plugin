/**
 * @fileOverview jQuery.plugin
 * A lightweight jQuery plugin factory.
 *
 * @author Kyle Florence
 * @website http://github.com/kflorence/jquery-plugin/
 * @version 0.1.3
 *
 * Based on jQuery.ui.widget - http://jqueryui.com
 *
 * Copyright (c) 2010 Kyle Florence
 * Dual licensed under the MIT and GPL Licenses.
 */

;(function($) {
  /**
   * The jQuery.plugin plugin (has a nice ring to it doesn't it?)
   *
   * @param {String} name The name of the plugin to create.
   * @param {Object} plugin The properties to apply to that plugin.
   * @param {Object} options Used to override default options.
   */
  $.plugin = function(name, plugin) {
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
      $.data(element, name, instance = $.extend(true, {}, plugin));

      // Extend default options with those passed in
      if (typeof (options = args[0]) === "object") {
        instance.options = $.extend(true, instance.options, options);
      }

      // After the instance has been created, the initialization function
      // will be called with the arguments that were passed into the plugin.
      if ($.isFunction(instance._init)) {
        instance._init.apply(instance, args);
      }

      return instance;
    };

    /**
     * Create our plugin in the jQuery.fn namespace.
     *
     * @param {Mixed} options The name of a public method within the plugin,
     *    or, on the first call to this function, a hash of options that will
     *    be passed to the init function.
     *
     * Any additional arguments will be passed directly to the method.
     */
    $.fn[name] = function(options) {
      var result,
        method = typeof options === "string" ? options : "_",
        args = Array.prototype.slice.call(arguments, method === "_" ? 0 : 1);

      this.each(function() {
        var instance = $.data(this, name) || create(this, args);

        // Maintain pseudo-private functions by denying access to any method
        // that starts with an underscore.
        if (method.charAt(0) !== "_" && $.isFunction(instance[method])) {
          return (result = instance[method].apply(instance, args)) !== undefined;
        }
      });

      // In order to maintain chainability, we return a reference to the
      // current element unless the result of the method call returns a
      // non-undefined value.
      return result !== undefined ? result : this;
    };
  };
})(jQuery);
