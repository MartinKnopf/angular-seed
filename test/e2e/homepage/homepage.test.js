describe('[homepage.test.js] Homepage', function() {

  var Homepage = require('./homepage.page.' + protractor.getInstance().params.environment)
    , homepage = new Homepage();

  beforeEach(function() {
    homepage.get();
  });

  it('should contain .header', function() {
    expect(homepage.containsHeader()).toBe(true);
  });

});
