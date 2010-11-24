(function($) {
  $.plugin = function(name, prototype) {
    $.fn[name] = function(options) {
      var result,
        method = typeof options === "string" ? options : "",
        args = Array.prototype.slice.call(arguments, method ? 1 : 0);

      this.each(function() {
        var instance = $.data(this, name);

        if (!instance) {
          var init = $.plugin.defacto.constructor;

          $.data(this, name, instance = $.extend(true, {}, prototype));

          if ($.isFunction(instance[init])) {
            instance[init].apply(instance, args);
          }
        }

        if (method && method.charAt(0) !== "_" && $.isFunction(instance[method])) {
          return (result = instance[method].apply(instance, args)) !== undefined;
        }
      });

      return result !== undefined ? result : this;
    };
  };

  $.plugin.defacto = {
    constructor: "_init"
  };
})(jQuery);
