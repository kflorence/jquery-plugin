describe("jQuery.plugin", function() {
  $.plugin("pluginName", {
    options: {
      value: 0
    },
    option: function(key, value) {
      if (value) {
        this.options[key] = value;
        return this;
      }

      return this.options[key];
    }
  });

  it("should have a property 'value' which equals 1", function() {
    setFixtures(sandbox({ id: "element1" }));

    $("#element1").pluginName({ value: 1 });

    expect($("#element1").pluginName("option", "value")).toEqual(1);
  });
});
