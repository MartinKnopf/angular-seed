var Homepage = require('./homepage');

describe('[homepage.test.js] Homepage', function() {

  var homepage = new Homepage();

  beforeEach(function() {
    homepage.get();
  });

  it('should contain .header', function() {
    expect(homepage.containsHeader()).toBe(true);
  });

});
