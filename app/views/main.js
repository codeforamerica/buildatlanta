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
          <select role="neighborhoods"></select>
          <select role="npus"></select>
          <select role="categories"></select>
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
    'keyup [role="searchbox"]': 'updateFilter',
    'change select': 'updateFilter'
  },

  render: function() {
    this.renderWithTemplate(this);

    var summary = this.collection.summarize();
    this.renderSelect('neighborhoods', summary.neighborhoods, 'Neighborhoods');
    this.renderSelect('npus', summary.npus, 'NPUs');
    this.renderSelect('categories', summary.categories, 'Categories');

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

  renderSelect: function(role, items, desc) {
    var options = items.map(function(item) {
      return '<option value="' + item + '">' + item + '</option>';
    });
    options.unshift('<option value="all">All ' + desc + '</option>');
    this.getByRole(role).innerHTML = options;
  },

  filters: {
    text: '',
    npu: false,
    neighborhood: false,
    category: false,
  },

  filter: function(item) {
    var queryMatch = true, npuMatch = true, categoryMatch = true, neighborhoodMatch = true;

    if (this.filters.text) {
      var name = item.get('name').toLowerCase();
      var description = item.get('description').toLowerCase();
      var query = this.filters.text.toLowerCase();
      queryMatch = name.indexOf(query) > -1 || description.indexOf(query) > -1;
    }

    if (this.filters.npu) npuMatch = _.contains(item.npus, this.filters.npu);
    if (this.filters.neighborhood) neighborhoodMatch = _.contains(item.neighborhoods, this.filters.neighborhood);
    if (this.filters.category) categoryMatch = item.category === this.filters.category;

    return queryMatch && npuMatch && categoryMatch && neighborhoodMatch;
  },

  updateFilter: function() {
    this.filters.text = this.getByRole('searchbox').value;

    // TODO: Refactor into select-view, or find an ampersand-select-view
    var npu = this.getByRole('npus').value;
    this.filters.npu = npu === 'all' ? false : npu;

    var neighborhood = this.getByRole('neighborhoods').value;
    this.filters.neighborhood = neighborhood === 'all' ? false : neighborhood;

    var category = this.getByRole('categories').value;
    this.filters.category = category === 'all' ? false : category;
    console.log(this.filters);

    this.filtered._runFilters();
  },

});
