describe("jQuery.plugin", function() {
  $.plugin("pluginName", {
    options: {
      foobar: "foobar"
    },
    _init: function(options) {
      $.extend(this.options, options);
    },
    option: function(key, value) {
      if (key) {
        if (!value) {
          return this.options[key];
        }

        this.options[key] = value;
      }

      return this;
    }
  });

  it("should set this.options.foobar to 'foo.'", function() {
    setFixtures(sandbox({ id: "element1" }));

    // Set this.options.foobar = "foo"
    $("#element1").pluginName({ foobar: "foo" });

    expect($("#element1").pluginName("option", "foobar")).toEqual("foo");
  });
});
