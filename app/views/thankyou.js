var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <h1>Thank You!</h1>
        <p class="thankyou">Thank you for your participation! Thousands of people visited and left over 400 comments.</p>
        <p>We are in the process of compiling all of the feedback from thefrom the site. Please direct any additional comments for the City to <a class="linklike" href="mailto:infrastructure@atlantaga.gov">infrastructure@atlantaga.gov</a> in the interim and stay tuned for more on the proposed infrastructure bond!</p>
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
