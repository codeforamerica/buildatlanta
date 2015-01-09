var View = require('ampersand-view');
var CommentView = require('./comment');

module.exports = View.extend({
  template: `
    <div class="projectView">
			<div role="sl" class="projectSerial"></div>
      <img role="image"></img>
      <div role="name" class="name"></div>
      <div class="details">
        <span role="cost" class="cost"></span>
        <div class="addComment" role="comment">Comment</div>
      </div>
      <div role="description" class="description"></div>
    </div>
  `,

  bindings: {
    'model.order': '[role=sl]',
    'model.name': '[role=name]',
    'model.description': '[role=description]',
    'model.image': [
      {
        type: 'toggle',
        role: 'image',
      },
      {
        type: 'attribute',
        name: 'src',
        role: 'image',
      }
    ],
    'model.cost': {
      type: 'toggle',
      role: 'cost',
    },
    'model.readableCost': '[role=cost]',
  },

  events: {
    'click': 'focusProject',
    'click [role=comment]': 'openComments',
  },

  openComments: function() {
    var commentView = new CommentView({ model: this.model });
    this.renderSubview(commentView, document.body);
  },

  focusProject: function() {
    this.model.trigger('focus');
  },
});
