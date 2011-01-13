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

  $.plugin("getID", function() {
    return $(this.element).attr("id");
  });

  $.plugin("isValid", function() {
    return this.options.valid;
  }, { valid: true });

  it("should set this.options.foobar to 'foo.'", function() {
    setFixtures(sandbox({ id: "element1" }));

    $("#element1").pluginName({ foobar: "foo" });

    expect($("#element1").pluginName("option", "foobar")).toEqual("foo");
  });

  it("should return id 'element2'", function() {
    setFixtures(sandbox({ id: "element2" }));

    expect($("#element2").getID()).toEqual("element2");
  });

  it("should have default public options", function() {
    expect($.fn.isValid.options.valid).toEqual(true);
  });

  it("should return options.valid = 'true'", function() {
    setFixtures(sandbox({ id: "element3" }));

    expect($("#element3").isValid()).toEqual(true);
  });

  it("should return options.valid = 'false'", function() {
    setFixtures(sandbox({ id: "element4" }));

    $.fn.isValid.options.valid = false;

    expect($("#element4").isValid()).toEqual(false);
  });
});
