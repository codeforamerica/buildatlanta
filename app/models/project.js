var Model = require('ampersand-model');

module.exports = Model.extend({
  props: {
    id: 'any',
    name: ['string', true, ''],
    description: ['string', true, ''],
    category: ['string', true, ''],
    npus: ['array', true, undefined],
    neighborhoods: ['array', true, undefined],
    latlng: ['array', true, undefined],
  },

  parse: function(resp) {
    var npus = [];
    var neighborhoods = [];

    for (var i = 1; i <= 5; i++) {
      if (resp['NPU ' + i]) npus.push(resp['NPU ' + i]);
      if (resp['Neighborhood ' + i]) neighborhoods.push(resp['Neighborhood ' + i]);
    }

    return {
      name: resp['Project Name'],
      description: resp['Project Description'],
      category: resp['Category'],
      npus: npus,
      neighborhoods: neighborhoods,
      latlng: [33.848481 + (Math.random() - 1) * 0.1, -84.388375 + (Math.random() - 1) * 0.1],
    };
  }
});
