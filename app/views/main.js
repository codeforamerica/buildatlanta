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
          <a href="http://www.atlantaga.gov/infrastructure" target="_blank">Read more</a> &bull; 
          <a class="linklike" role="showDisclaimer">Disclaimer & Policy</a> &bull; 
          <a class="linklike" role="showAdditional">Additional Programs</a> &bull; 
          <a class="linklike" role="showPublic">Public Meetings and Displays</a><br />
          <a class="linklike">DRAFT Project List (03/12/15)</a> &bull; 
          <a class="linklike" href="pdf/Districts-1-12-Public-Requested-Projects-v3.pdf" target="_blank">Projects by Council District</a>
        </div>
        <div class="summary">
					<table border="0" class="	estimated-costs">
						<tr>
							<th width="30%">&nbsp;</th>
							<th widht="21%">Citywide</th>
							<th widht="3%"></th>
							<th widht="21%">Local</th>
							<th widht="3%"></th>
							<th widht="21%">Total</th>
						</tr>
						<tr>
							<td><strong>Transportation Projects</strong></td>
							<td>$134,515,175</td>
							<td>+</td>
							<td>$51,941,543</td>
							<td>=</td>
							<td>$186,546,718</td>
						</tr>
						<tr>
							<td><strong>Municipal Facilities</strong></td>
							<td>$44,854,328</td>
							<td>+</td>
							<td>$18,688,954</td>
							<td>=</td>
							<td>$63,543,282</td>
						</tr>
						<tr class="total-est">
							<td><strong>Total</strong></td>
							<td>$179,369,503</td>
							<td>+</td>
							<td>$70,630,497</td>
							<td>=</td>
							<td>$250,000,000*</td>
						</tr>						
					</table>
					<p><small>* Note: (1) Amount is strictly project related costs and excludes $2M for bond financing costs.</small><br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>(2) City of Atlanta staff and Council Members are having ongoing discussions to finalize the local list of projects.</small></p>
        </div>
				<div class="summary">
					<table border="0" class="estimated-costs-full">
						<tr class="row-border-bottom">
							<th width="80%">Project Type</th>
							<th widht="20%" style="text-align: center">Amount</th>
						</tr>
						<tr>
							<th><em>Transportation Projects</em></th>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>Bridges</td>
							<td class="col-right">$27,809,249</td>
						</tr>
						<tr>
							<td>Complete Streets</td>
							<td class="col-right">$32,067,049</td>
						</tr>
						<tr>
							<td>Roadway Resurfacing</td>
							<td class="col-right">$23,853,552</td>
						</tr>
						<tr>
							<td>Sidewalks/ADA Ramps</td>
							<td class="col-right">$5,000,000</td>
						</tr>
						<tr>
							<td>School Zone Flashers</td>
							<td class="col-right">$482,040</td>
						</tr>
						<tr>
							<td>Traffic Signal</td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>Synchronization</td>
							<td class="col-right">$17,767,600</td>
						</tr>
						<tr class="row-border-bottom">
							<td>Traffic Signals</td>
							<td class="col-right">$20,671,790</td>
						</tr>
						<tr>
							<th class="col-right">Transportation Subtotal</th>
							<th class="col-right"><em>$127,651,280</em></th>
						</tr>	
						<tr>
							<th><em>Non-Transportation Projects</em></th>
							<td>&nbsp;</td>
						</tr>	
						<tr>
							<td>Facility Maintenance</td>
							<td class="col-right">$10,500,000</td>
						</tr>	
						<tr>
							<td>MLK Natatorium</td>
							<td class="col-right">$17,500,000</td>
						</tr>	
						<tr>
							<td>Public Art</td>
							<td class="col-right">$11,800,000</td>
						</tr>
						<tr class="row-border-bottom">
							<td>Public Safety</td>
							<td class="col-right">$3,000,000</td>
						</tr>
						<tr>
							<th class="col-right">Non-Transportation Subtotal</th>
							<th class="col-right"><em>$42,800,000</em></th>
						</tr>	
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>	
						<tr>
							<th class="col-right"><em>Total - Citywide Projects</em></th>
							<td class="col-right">$170,451,280</td>
						</tr>	
						<tr>
							<th class="col-right"><em>Total - Local Projects</em></th>
							<td class="col-right">$67,395,612</td>
						</tr>	
						<tr>
							<th class="col-right"><em>Total</em></th>
							<th class="col-right">$237,846,892</th>
						</tr>	
						<tr>
							<th class="col-right"><em>Program Management and Administration</em></th>
							<td class="col-right">$12,153,108</td>
						</tr>	
						<tr>
							<th class="col-right"><em>Grand Total</em></th>
							<th class="col-right">$250,000,000</th>
						</tr>						
					</table>
					<p><small>* Note: (1) Amount is strictly project related costs and excludes $2M for bond financing costs.</small><br />
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>(2) City of Atlanta staff and Council Members are having ongoing discussions to finalize the local list of projects.</small></p>
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
    //this.getByRole('cost').innerHTML = accounting.formatMoney(totalCost, { precision: 0 });
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
