(function($) {
  $.plugin = function(name, base, prototype) {
    if (!prototype) {
      prototype = base;
      base = function(element, options) {
        if (arguments.length) {
          $.data(element, name, this);
          // ugly workaround for unique option instances -- fixme
          this.options = $.extend(true, {}, this.options, options);
          this._init();
        }
      };

      base.prototype = {
          _init: function() {}
      };
    }

    $.extend(true, base.prototype, prototype);

    $.fn[name] = function(options) {
      var result,
        method = typeof options === "string" ? options : "_init",
        args = Array.prototype.slice.call(arguments, 1);

      this.each(function() {
        var instance = $.data(this, name) || new base(this, options);

        if (method.charAt(0) !== "_" && $.isFunction(instance[method])) {
          result = instance[method].apply(instance, args);
        }

        return result !== undefined;
      });

      return result !== undefined ? result : this;
    };
  };
})(jQuery);
