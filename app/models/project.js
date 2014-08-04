var Model = require('ampersand-model');

module.exports = Model.extend({
  props: {
    id: 'any',
    name: ['string', true, ''],
    description: ['string', true, ''],
    latlng: ['array', true, undefined],
    votes: ['number', true, 0],
  }
});
