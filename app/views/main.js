var View = require('ampersand-view');
var multiline = require('multiline');
var config = require('../config.js');

// Automatically attached to window.L
require('mapbox.js');

module.exports = View.extend({
  template: multiline(function(){/*
    <body>
      <div class="content">
        <header>
          <h1>Build Atlanta</h1>
          <p>Help the City of Atlanta spend $250 million improving infrastructure.</p>
        </header>
        <div role="projects"><em>projects go here...</em></div>
      </div>
      <div id="map"></div>
    </body>
  */}),

  render: function() {
    this.renderWithTemplate(this);

    window.L.mapbox.map('map', config.mapbox.mapId, {
      accessToken: config.mapbox.accessToken,
      boxZoom: false,
      tileLayer: { detectRetina: true },
      attributionControl: false, 
      infoControl: true,
    }).setView(config.map.center, config.map.zoomLevel);

    return this;
  }
});
