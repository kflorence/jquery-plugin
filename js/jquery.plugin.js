(function($) {
    $.plugin = function(name, base, prototype) {
        if (!prototype) {
            prototype = base;
            base = function(options, element) {
                if (arguments.length) {
                    $.data(element, name, this);
                    this.element = $(element);
                    this._init(options);
                }
            };

            base.prototype = {
                _init: function() {}
            };
        }

        $.extend(true, base.prototype, prototype);
        $.fn[name] = function(options) {
            var isMethodCall = (typeof options === "string"),
                args = Array.prototype.slice.call(arguments, 1),
                returnValue = this; // Chain by default

            if (isMethodCall) {
                if (options.charAt(0) === "_") { // Psuedo-private
                    return returnValue;
                }

                this.each(function() {
                    var instance = $.data(this, name) || new base({}, this);

                    if (instance && $.isFunction(instance[options])) {
                        var methodValue = instance[options].apply(instance, args);
                        if (methodValue !== undefined) {
                            returnValue = methodValue;
                            return false;
                        }
                    }
                });
            } else {
                this.each(function() {
                    var instance = $.data(this, name);

                    if (instance) {
                        instance._init(options);
                    } else {
                        new base(options, this);
                    }
                });
            }

            return returnValue;
        };
    };
})(jQuery);
