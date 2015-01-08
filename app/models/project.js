var Model = require('ampersand-model');
var config = require('../config.js');
var accounting = require('accounting');

module.exports = Model.extend({
  props: {
    id: 'any',
    order: ['number', true, 0],
		name: ['string', true, ''],
    description: ['string', true, ''],
    cost: ['number', true, 0],
    priority: ['string', true, ''],
    category: ['string', true, ''],
    npus: ['array', true, undefined],
    neighborhoods: ['array', true, undefined],
    latlng: ['array', false, undefined],
    image: ['string', false, ''],
  },

  derived: {
    readableCost: {
      deps: ['cost'],
      fn: function() {
        return accounting.formatMoney(this.cost, { precision: 0 });
      }
    }
  },

  parse: function(resp) {
    var npus = [];
    var neighborhoods = [];

    for (var i = 1; i <= 1; i++) {
      if (resp['NPU ' + i]) npus.push(resp['NPU ' + i]);
      if (resp['Neighborhood ' + i]) neighborhoods.push(resp['Neighborhood ' + i]);
    }

    var latlng;
    if (resp['LATITUDE']) latlng = [resp['LATITUDE'], resp['LONGITUDE']];

    return {
      id: resp.id,
      order: accounting.unformat(resp['order']),
			name: resp['Project Name'],
      description: resp['Project Description'],
      cost: accounting.unformat(resp['Funding Needed']),
      priority: resp['Project Priority'],
      category: resp['Subcategory'],
      npus: npus,
      neighborhoods: neighborhoods,
      latlng: latlng,
    };
  }
});
