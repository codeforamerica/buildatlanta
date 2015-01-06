var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <div class="commentThread" role="name"></div>
        <div role="description" class="description"></div>
        <div id="disqus_thread"></div>
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

  ignoreClick: function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  },

  loadDisqus: function(id, name) {
    window.DISQUS.reset({
      reload: true,
      config: function () {  
        this.page.identifier = id;
        this.page.title = name;
        this.page.url = 'http://infrastructuremap.org/#!' + id;
      }
    });
  },

  render: function() {
    this.renderWithTemplate(this);

    var id = this.model.id;
    var name = this.model.name;
    var loadDisqus = this.loadDisqus;

    setTimeout(function() { loadDisqus(id, name); }, 0);

    return this;
  },
});
