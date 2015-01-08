var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <strong>Public Information Meeting Schedule</strong>
        <p>January 13, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Atlanta Botanical Gardens<br />
				1345 Piedmont Road, NE, Atlanta, GA 30309</p>
				
				<p>January 15, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Adamsville Recreation Center<br />
				3201 Martin L. King, Jr., SW, Atlanta, GA 30311</p>
				
				<p>January 20, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Atlanta City Hall - City Council Chambers<br />
				68 Mitchell Street, SW, Atlanta, GA 30303</p>
				
				<p>January 22, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Atlanta Metropolitan College<br />
				1630 Metropolitan Parkway, SW, Atlanta, GA 30310</p>
				
				<p>January 27, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Atlanta Speech School<br />
				3160 Northside Parkway, NW, Atlanta, GA 30310</p>
				
				<p>January 29, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Atlanta Fire & Rescue Station 28<br />
				1925 Hollywood Road, NW, Atlanta, GA 30318</p>
				
				<p>February 5, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Georgia Hill Facility<br />
				250 Georgia Avenue, SE, Atlanta, GA 30312</p>
				
				<p>February 12, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Ben Hill Recreation Center<br />
				2405 Fairburn Road, SW, Atlanta, GA 30331</p>
				
				<p>February 17, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Piedmont Hospital - Shepard Center<br />
				Callaway Auditorium - 7th Floor<br />
				2020 Peachtree Road, NW, Atlanta, GA 30309</p>
				
				<p>February 19, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>Drew Charter School<br />
				301 East Lake Boulevard, SE, Atlanta, GA 30317</p>
				
				<p>February 24, 2015<br />
				6:00 pm - 8:00 pm</p>
				<p>John C. Birdine Recreation Center<br />
				215 Lakewood Way, SW, Atlanta, GA 30315</p>
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
