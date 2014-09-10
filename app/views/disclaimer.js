var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <strong>Disclaimer</strong>
        <p class="disclaimer">Attached hereto is a DRAFT listing of potential bond projects which may be presented to voters for consideration at the [March] 2015 referendum election.  This list is preliminary and has been compiled from a master listing of all needed infrastructure improvement.  This preliminary listing is being presented in DRAFT form for discussion purposes only and not as an indication of intention that such list will be the final list within the meaning of O.C.G.A. 36-81-1(d).  The final projects for consideration at the referendum election will be advertised  prior to the election and will be described on the ballot question.</p>

        <p><strong>Commenting Policy</strong></p>
        <p>City of Atlanta departments share information, images and video with the public through external socialmedia websites. Comments made by the public to these sites are reviewed and, while comments will not be edited by City personnel, a comment may be deleted if it violates the comment policy described here.</p>
        <ul>
        <li>Comments should be related to the posted topic for the City's social media page or post. City of
        Atlanta department social media accounts are not meant for comments that do not directly relate to the purpose or topic of the social media website or for service requests.</li>
        <li>You are subject to the Terms of Service (TOS) of the host site. Information (photos, videos, etc.)
        you share with or post to official City of Atlanta department pages is also subject to the TOS of
        the host site and may be used by the owners of the host site for their own purposes. For more
        information, consult the host website's TOS.  </li>
        <li>City of Atlanta social media accounts are not open to comments promoting or opposing any person campaigning for election to a political office, or promotion or advertisement of a
        business or commercial transaction. </li>
        <li>The use of obscene, threatening or harassing language is prohibited.</li>
        <li>Personal attacks of any kind or offensive comments that target or disparage any ethnic, racial,
        age, or religious group, gender, sexual orientation or disability status are prohibited. </li>
        <li>Comments advocating illegal activity or posting of material that violates copyrights or
        trademarks of others are prohibited.</li.
        <li>This comment policy is subject to amendment or modification at any time.</li>
        </ul>
      </div>
    </div>
  `,

  events: {
    'click .comments': 'ignoreClick',
    'click .commentView': 'remove',
  },

  ignoreClick: function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
  },
});
