var domready = require('domready');
var MainView = require('./views/main.js');

domready(function() {
  new MainView({ el: document.body }).render();
});
