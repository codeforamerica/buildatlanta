var View = require('ampersand-view');
var multiline = require('multiline');

module.exports = View.extend({
  template: multiline(function(){/*
    <div class="commentView">
      <div class="comments">
        <div class="commentThread" role="name"></div>
        <div id="disqus_thread"></div>
      </div>
    </div>
  */}),

  bindings: {
    'model.name': '[role=name]',
  },

  events: {
    'click .comments': 'ignoreClick',
    'click .commentView': 'remove',
  },

  ignoreClick: function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  },

  loadDisqus: function(id) {
    window.DISQUS.reset({
      reload: true,
      config: function () {  
        this.page.identifier = id;  
        this.page.url = 'http://infrastructuremap.org/#!' + id;
      }
    });
  },

  render: function() {
    this.renderWithTemplate(this);

    var id = this.model.id;
    var loadDisqus = this.loadDisqus;

    setTimeout(function() { loadDisqus(id); }, 0);

    return this;
  }
});
