describe('[homepage.js] Homepage', function() {

  beforeEach(function() {
    browser.get(protractor.getInstance().baseUrl);
  });

  it('should contain .header', function() {
    expect(element(by.css('.header')).isPresent()).toBe(true);
  });

});
