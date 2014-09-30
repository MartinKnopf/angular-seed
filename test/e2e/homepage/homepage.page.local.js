'use strict';
/* global protractor, element, by */

function Homepage() {
}

module.exports = Homepage;

Homepage.prototype.get = function() {
  var ptor = protractor.getInstance();
  ptor.get(ptor.baseUrl);
};

Homepage.prototype.containsHeader = function() {
  return element(by.css('.header')).isPresent();
};
