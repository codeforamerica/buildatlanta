var Model = require('ampersand-model');

module.exports = Model.extend({
  props: {
    id: 'any',
    name: ['string', true, ''],
    description: ['string', true, ''],
    latlng: ['array', true, undefined],
  },

  parse: function(resp) {
    return {
      name: resp['Project Name'],
      description: resp['Project Description'],
      latlng: [33.848481 + (Math.random() - 1) * 0.1, -84.388375 + (Math.random() - 1) * 0.1],
    };
  }
});
