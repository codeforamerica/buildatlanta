var View = require('ampersand-view');
var ProjectView = require('./projectaddition');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <strong>Additional Programs</strong>
        <p>A portion of funding will be spent strategically on various programs across the city. These programs range from ADA compliance to complete street renovations. These stand-alone programs are detailed below.</p>
        <div role="additionalProjects"></div>
      </div>
    </div>
  `,

  bindings: {
    'model.name': '[role=name]',
    'model.description': '[role=description]',
  },

  events: {
    'click .comments': 'ignoreClick',
    'click .commentView': 'remove',
  },

  render: function() {
    this.renderWithTemplate(this);
    this.renderCollection(this.collection, ProjectView, this.getByRole('additionalProjects'));
    return this;
  },

  ignoreClick: function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  },
});
