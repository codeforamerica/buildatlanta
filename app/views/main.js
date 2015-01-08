var View = require('ampersand-view');
var config = require('../config.js');
var Projects = require('../models/projects.js');
var ProjectView = require('./project.js');
var MarkerView = require('./marker.js');
var AdditionalView = require('./additional.js');
var DisclaimerView = require('./disclaimer.js');
var PublicView = require('./public.js');
var ThankYouView = require('./thankyou.js');
var projectsData = require('../data/projects-geocoded.csv');
var additionalProjectsData = require('../data/additional-projects.csv');
var SubCollection = require('ampersand-subcollection');
var _ = require('underscore');
var accounting = require('accounting');
var npus = require('../npus.geojson');


// Automatically attached to window.L
require('mapbox.js');

module.exports = View.extend({
  template: `
    <body>
      <header>
        <h1>ATL Infrastructure Map</h1>
        <nav>
          <input type="text" role="searchbox" class="searchbox" placeholder="type to search">
          <select role="neighborhoods"></select>
          <select role="npus"></select>
          <select role="categories"></select>
        </nav>
      </header>

      <div class="content">
        <div class="context">The City of Atlanta is investing $250 million dollars to build a better city. Explore the map to see potential projects and share your thoughts.</div>
        <div class="links">
          <a href="http://www.atlantaga.gov/infrastructure" target="_blank">Read more</a> • 
          <a class="linklike" role="showDisclaimer">Disclaimer & Policy</a> • 
          <a class="linklike" role="showAdditional">Additional Programs</a> • 
          <a class="linklike" role="showPublic">Public Information Meeting Schedule</a>
        </div>
        <div class="summary">
          <div><span role="count"></span> proposed projects</div>
          <div>Estimated cost: <span role="cost"></span></div>
        </div>
        <div role="projects"></div>
      </div>
      <div class="love">This site made with &#9825; by <a href="http://www.codeforamerica.org/" target="_blank">Code for America</a> and <a href="https://github.com/codeforamerica/buildatlanta" target="_blank">released under the MIT license</a>.</div>

      <div id="map"></div>
    </body>
  `,
  
  initialize: function() {
    this.collection = new Projects(projectsData, { parse: true });
    this.additionalProjects = new Projects(additionalProjectsData);

    var boundFilter = _.bind(this.filter, this);
    this.filtered = new SubCollection(this.collection, { filter: boundFilter, limit: 300 });

    // Keep a seperate subcollection with no limit to enable cost summaries
    this.filteredAll = new SubCollection(this.collection, { filter: boundFilter });
  },

  events: {
    'keyup [role="searchbox"]': 'updateFilter',
    'change select': 'updateFilter',
    'click [role="showAdditional"]': 'showAdditional',
    'click [role="showDisclaimer"]': 'showDisclaimer',
		'click [role="showPublic"]': 'showPublic',
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

    this.renderOverlay();

    this.renderCollection(this.filtered, ProjectView, this.getByRole('projects'));
    this.renderCollection(this.filtered, MarkerView);

    this.updateFilter();

    // var thanksView = new ThankYouView();
    // this.renderSubview(thanksView, document.body);

    return this;
  },

  renderSelect: function(role, items, desc) {
    var options = items.map(function(item) {
      return '<option value="' + item + '">' + item + '</option>';
    });
    options.unshift('<option value="all">All ' + desc + '</option>');
    this.getByRole(role).innerHTML = options;
  },

  renderOverlay: function() {
    var style = {
      color: '#2780CA',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.1,
    };

    var filterTo = _.bind(function(npu) {
      this.getByRole('npus').value = npu;
      this.updateFilter();
    }, this);

    var onEachFeature = function(feature, layer) {
      layer.on('click', function() {
        filterTo(feature.properties.NPU);
      });
    };

    window.L.geoJson(npus, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(window.L.mapInstance);
  },

  filters: {
    text: '',
    npu: false,
    neighborhood: false,
    category: false,
  },

  filter: function(item) {
    var queryMatch = true;
    var npuMatch = true;
    var categoryMatch = true;
    var neighborhoodMatch = true;

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

    this.filtered._runFilters();
    this.filteredAll._runFilters();

    // Update the project count & filters
    var totalCost = this.filteredAll.reduce(function(prev, item) { return item.cost + prev; }, 0);
    this.getByRole('cost').innerHTML = accounting.formatMoney(totalCost, { precision: 0 });
    this.getByRole('count').innerHTML = this.filteredAll.length;
  },

  showAdditional: function() {
    var additionalView = new AdditionalView({ collection: this.additionalProjects });
    this.renderSubview(additionalView, document.body);
  },

  showDisclaimer: function() {
    var disclaimerView = new DisclaimerView();
    this.renderSubview(disclaimerView, document.body);
  },

	showPublic: function() {
    var publicView = new PublicView();
    this.renderSubview(publicView, document.body);
  },
});
