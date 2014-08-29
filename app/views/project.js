var View = require('ampersand-view');
var CommentView = require('./comment');

module.exports = View.extend({
  template: `
    <div class="projectView">
      <div role="name" class="name"></div>
      <div class="details">
        <span role="cost" class="cost"></span> (<span role="priority" class="priority"></span>)
        <div class="addComment" role="comment">Comment</div>
      </div>
      <div role="description" class="description"></div>
    </div>
  `,

  bindings: {
    'model.name': '[role=name]',
    'model.description': '[role=description]',
    'model.readableCost': '[role=cost]',
    'model.priority': '[role=priority]',
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
