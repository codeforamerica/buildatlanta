var Collection = require('ampersand-collection');
var Project = require('./project');
var _ = require('underscore');

module.exports = Collection.extend({
  model: Project,
  comparator: 'order',

  summarize: function() {
    var npus = [];
    var neighborhoods = [];
    var categories = [];

    this.forEach(function(project) {
      npus = npus.concat(project.npus);
      neighborhoods = neighborhoods.concat(project.neighborhoods);
      if (project.category) categories.push(project.category);
    });

    npus.sort();
    neighborhoods.sort();
    categories.sort();

    return {
      npus: _.uniq(npus, true),
      neighborhoods: _.uniq(neighborhoods, true),
      categories: _.uniq(categories, true),
    };
  },
});
