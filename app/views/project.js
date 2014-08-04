var View = require('ampersand-view');
var multiline = require('multiline');

module.exports = View.extend({
  template: multiline(function(){/*
    <div class="projectView">
      <div role="name"></div>
      <div role="description"></div>
      <div role="stars"></div>
      <div role="myStar">star</div>
    </div>
  */}),
  
  bindings: {
    'model.name': '[role=name]',
    'model.description': '[role=description]',
    'model.stars': '[role=stars]',
    'model.isStarred': {
      type: 'booleanClass',
      role: 'myStar',
      name: 'isStarred',
    }
  },

  events: {
    'click': 'focusProject',
    'click [role=myStar]': 'addStar',
  },

  focusProject: function() {
    this.model.trigger('focus');
  },

  addStar: function() {
    this.model.star();
  }
});
