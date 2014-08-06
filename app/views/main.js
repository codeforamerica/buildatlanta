var View = require('ampersand-view');
var multiline = require('multiline');
var config = require('../config.js');
var Projects = require('../models/projects.js');
var ProjectView = require('./project.js');
var MarkerView = require('./marker.js');
var data = require('../data.csv');
var SubCollection = require('ampersand-subcollection');
var _ = require('underscore');

// Automatically attached to window.L
require('mapbox.js');

module.exports = View.extend({
  template: multiline(function(){/*
    <body>
      <div class="content">
        <header>
          <h1>Build Atlanta</h1>
          <p>We're spending $250 million dollars on improving the city.</p>
        </header>
        <nav>
          <input type="text" role="searchbox">
          <a href="sdfd">Bridges</a> <a href="roads">Roads</a> <a href="roads">Traffic</a>
        </nav>
        <div role="projects"></div>
      </div>
      <div id="map"></div>
    </body>
  */}),

  initialize: function() {
    this.collection = new Projects(data, { parse: true });
    this.filtered = new SubCollection(this.collection, {
      filter: _.bind(this.filter, this),
      limit: 50
    });
  },

  events: {
    'keyup [role="searchbox"]': 'updateFilter'
  },

  render: function() {
    this.renderWithTemplate(this);

    window.L.mapInstance = window.L.mapbox.map('map', config.mapbox.mapId, {
      accessToken: config.mapbox.accessToken,
      boxZoom: false,
      attributionControl: false, 
      infoControl: true,
      scrollWheelZoom: false,
    }).setView(config.map.center, config.map.zoomLevel);

    this.renderCollection(this.filtered, ProjectView, this.getByRole('projects'));
    this.renderCollection(this.filtered, MarkerView);

    return this;
  },

  filterText: '',

  filter: function(item) {
    if (this.filterText === '') return true;

    var name = item.get('name').toLowerCase();
    var filterText = this.filterText.toLowerCase();

    return name.indexOf(filterText) > -1;
  },

  updateFilter: function() {
    this.filterText = this.getByRole('searchbox').value;
    this.filtered._runFilters();
  },

});
