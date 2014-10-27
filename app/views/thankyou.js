var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <h1>Thank You!</h1>
        <p class="thankyou">Thank you for your participation! Thousands of people visited and left over 400 comments.</p>
        <p>Thanks so far, we’re looking at these now, but keep the comments coming! You can also email us at <a class="linklike" href="mailto:infrastructure@atlantaga.gov">infrastructure@atlantaga.gov</a>. Stay tuned for more on the proposed infrastructure bond!</p>
        <p class="thankyou"><span class="linklike">Continue to the site</span> to see all the proposed projects.</p>
      </div>
    </div>
  `,

  events: {
    'click .linklike': 'remove',
    'click .commentView': 'remove',
  },

  ignoreClick: function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  },
});
