var Model = require('ampersand-model');
var config = require('../config.js');
var accounting = require('accounting');

var polygons = require('../npupolygons');
var inside = require('point-in-polygon');


module.exports = Model.extend({
  props: {
    id: 'any',
    name: ['string', true, ''],
    description: ['string', true, ''],
    cost: ['number', true, 0],
    priority: ['string', true, ''],
    category: ['string', true, ''],
    npus: ['array', true, undefined],
    neighborhoods: ['array', true, undefined],
    latlng: ['array', true, undefined],
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

    for (var i = 1; i <= 5; i++) {
      if (resp['NPU ' + i]) npus.push(resp['NPU ' + i]);
      if (resp['Neighborhood ' + i]) neighborhoods.push(resp['Neighborhood ' + i]);
    }

    // Generate up to 100 points to get it inside the correct NPU polygon
    // Just for demo purposes until we get the real data.
    // TODO: REMOVE THIS WHEN REAL DATA IS PROVIDED
    var lat, lng, mainNPU = polygons[resp['NPU 1']];

    if (mainNPU) {
      for (var j = 0; j < 1000; j++) {
        lat = mainNPU[0][1] + (Math.random() - 0.5) * 0.1;
        lng = mainNPU[0][0] + (Math.random() - 0.5) * 0.1;
        if (inside([lng, lat], mainNPU)) break;
      }
    } else {
      lat = config.map.center[0];
      lng = config.map.center[1];
    }


    return {
      name: resp['Project Name'],
      description: resp['Project Description'],
      cost: accounting.unformat(resp['Project Cost Estimate']),
      priority: resp['Project Priority'],
      category: resp['Category'],
      npus: npus,
      neighborhoods: neighborhoods,
      latlng: [lat, lng],
    };
  }
});
