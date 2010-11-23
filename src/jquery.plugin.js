(function($) {
  $.plugin = function(name, base, prototype) {
    if (!prototype) {
      prototype = base;
      base = $.plugin.base;
    }

    $.extend(true, base.prototype, prototype);

    $.fn[name] = function(options) {
      var result,
        method = typeof options === "string" ? options : "",
        args = Array.prototype.slice.call(arguments, method ? 1 : 0);

      this.each(function() {
        var instance = $.data(this, name) || new base(name, this, args);

        if (method && method.charAt(0) !== "_" && $.isFunction(instance[method])) {
          result = instance[method].apply(instance, args);
        }

        return result !== undefined;
      });

      return result !== undefined ? result : this;
    };
  };

  $.plugin.base = function(name, element, args) {
    if (arguments.length) {
      $.data(element, name, this);
      this._init.apply(this, args);
    }
  };

  $.plugin.base.prototype = {
    _init: function() {}
  };
})(jQuery);
