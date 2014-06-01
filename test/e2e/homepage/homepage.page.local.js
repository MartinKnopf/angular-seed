module.exports = Homepage;

function Homepage() {
}

Homepage.prototype.get = function() {
  var ptor = protractor.getInstance();
  ptor.get(ptor.baseUrl);
};

Homepage.prototype.containsHeader = function() {
  return element(by.css('.header')).isPresent();
};
