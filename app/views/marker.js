var View = require('ampersand-view');

module.exports = View.extend({
  insertSelf: true,

  initialize: function() {
    this.listenTo(this.model, 'focus', this.centerMarker);
  },
  
  render: function() {
    var marker = window.L.marker(this.model.latlng);
    // marker.addTo(window.L.mapInstance);

    marker.on('click', function() {
      this.model.trigger('focus');
    }, this);

    return this;
  },

  centerMarker: function() {
    window.L.mapInstance.panTo(this.model.latlng);
  },
});
