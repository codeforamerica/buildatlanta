var Model = require('ampersand-model');

module.exports = Model.extend({
  props: {
    id: 'any',
    name: ['string', true, ''],
    description: ['string', true, ''],
    latlng: ['array', true, undefined],
    stars: ['number', true, 0],
  },

  derived: {
    isStarred: {
      deps: ['stars'],
      fn: function() {
        return !!JSON.parse(localStorage.getItem(this.id));
      },
    }
  },

  parse: function(resp) {
    return {
      name: resp['Project Name'],
      description: resp['Project Description'],
      latlng: [33.848481, -84.388375],
    };
  },

  star: function() {
    if (this.isStarred) return;

    localStorage.setItem(this.id, JSON.stringify(true));
    this.stars++;
  }
});
