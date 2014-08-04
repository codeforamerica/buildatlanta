var View = require('ampersand-view');
var multiline = require('multiline');

module.exports = View.extend({
  template: multiline(function(){/*
    <div class="projectView">
      <div role="name"></div>
      <div role="description"></div>
      <div role="votes"></div>
    </div>
  */}),

  bindings: {
    'model.name': '[role=name]',
    'model.description': '[role=description]',
    'model.votes': '[role=votes]',
  },

  events: {
    'click [role=votes]': 'addVote'
  },

  addVote: function() {
    this.model.votes++;
  }
});
