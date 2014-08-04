var View = require('ampersand-view');
var multiline = require('multiline');
var config = require('../config.js');
var data = require('../fakedata.js');
var Projects = require('../models/projects.js');
var ProjectView = require('./project.js');
var MarkerView = require('./marker.js');

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
        <div role="projects"></div>
      </div>
      <div id="map"></div>
    </body>
  */}),

  initialize: function() {
    this.collection = new Projects(data);
  },

  render: function() {
    this.renderWithTemplate(this);

    window.L.mapInstance = window.L.mapbox.map('map', config.mapbox.mapId, {
      accessToken: config.mapbox.accessToken,
      boxZoom: false,
      attributionControl: false, 
      infoControl: true,
    }).setView(config.map.center, config.map.zoomLevel);

    this.renderCollection(this.collection, ProjectView, this.getByRole('projects'));
    this.renderCollection(this.collection, MarkerView, undefined);

    return this;
  }
});
