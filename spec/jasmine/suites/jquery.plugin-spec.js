describe("jQuery.plugin", function() {
  $.plugin("pluginName", {
    options: {
      foobar: "foobar"
    },
    option: function(key, value) {
      if (key) {
        if (!value) {
          return this.options[key];
        }

        this.options[key] = value;
      }
    }
  });

  $.plugin("functionPlugin", function() {
    return $(this).attr("id");
  });

  $.plugin("withDefaultOptions", function(options) {
    return options.valid;
  }, { valid: true });

  it("should set this.options.foobar to 'foo.'", function() {
    setFixtures(sandbox({ id: "element1" }));

    // Set this.options.foobar = "foo"
    $("#element1").pluginName({ foobar: "foo" });

    expect($("#element1").pluginName("option", "foobar")).toEqual("foo");
  });

  it("should return id 'element2'", function() {
    setFixtures(sandbox({ id: "element2" }));

    expect($("#element2").functionPlugin()).toEqual("element2");
  });

  it("should have default public options", function() {
    expect($.fn.withDefaultOptions.options.valid).toEqual(true);
  });

  it("should return options.valid = 'true'", function() {
    setFixtures(sandbox({ id: "element3" }));

    expect($("#element3").withDefaultOptions()).toEqual(true);
  });

  it("should return options.valid = 'false'", function() {
    setFixtures(sandbox({ id: "element4" }));

    $.fn.withDefaultOptions.options.valid = false;

    expect($("#element4").withDefaultOptions()).toEqual(false);
  });
});
