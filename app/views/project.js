var View = require('ampersand-view');
var multiline = require('multiline');

module.exports = View.extend({
  template: multiline(function(){/*
    <div class="projectView">
      <div role="name"></div>
      <div role="description"></div>
      <div class="details">
        <span role="cost" class="cost"></span>
        <span role="priority" class="priority"></span>
      </div>
    </div>
  */}),

  bindings: {
    'model.name': '[role=name]',
    'model.description': '[role=description]',
    'model.readableCost': '[role=cost]',
    'model.priority': '[role=priority]',
  },

  events: {
    'click': 'focusProject',
    'click [role=myStar]': 'addStar',
  },

  focusProject: function() {
    this.model.trigger('focus');
  },
});
