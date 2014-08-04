var View = require('ampersand-view');

module.exports = View.extend({
  insertSelf: true,
  
  render: function() {
    var marker = window.L.marker(this.model.latlng);
    marker.addTo(window.L.mapInstance);

    marker.on('click', function() {
      console.log(this.model.name);
    }, this);

    return this;
  },
});
