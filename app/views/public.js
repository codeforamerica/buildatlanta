var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <strong>Public Meetings and Displays</strong>
        <p class="schedule_date"><span>January 13, 2015</span></p>

				<p>St. Mark United Methodist Church<br />
				781 Peachtree Street NE, Atlanta GA 30308</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Package- Meeting-1.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

		
				<p class="schedule_date"><span>January 15, 2015</span></p>

				<p>Adamsville Recreation Center<br />
				3201 Martin L. King, Jr., SW, Atlanta, GA 30311</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Poster-Board-Package-Meeting-2.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>January 20, 2015</span></p>

				<p>Atlanta City Hall<br />
				55 Trinity Avenue, SW, Atlanta, GA 30303</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-PDF-Package-Meeting-3.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>January 22, 2015</span></p>

				<p>Atlanta Metropolitan College<br />
				1630 Metropolitan Parkway, SW, Atlanta, GA 30310</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Poster-Board-Package-Meeting-4.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>January 29, 2015</span></p>

				<p>Atlanta Fire & Rescue Station 28<br />
				1925 Hollywood Road, NW, Atlanta, GA 30318</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-5.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 3, 2015</span></p>

				<p>Atlanta Speech School<br />
				3160 Northside Parkway, NW, Atlanta, GA 30310</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-6.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 5, 2015</span></p>

				<p>Georgia Hill Facility<br />
				250 Georgia Avenue, SE, Atlanta, GA 30312</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-7.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 12, 2015</span></p>

				<p>Ben Hill Recreation Center<br />
				2405 Fairburn Road, SW, Atlanta, GA 30331</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-8.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 17, 2015</span></p>

				<p>Piedmont Hospital - Shepard Center<br />
				Callaway Auditorium - 7th Floor<br />
				2020 Peachtree Road, NW, Atlanta, GA 30309</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-9.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 19, 2015</span></p>

				<p>Drew Charter School<br />
				301 East Lake Boulevard, SE, Atlanta, GA 30317</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-10.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 24, 2015</span></p>

				<p>John C. Birdine Recreation Center<br />
				215 Lakewood Way, SW, Atlanta, GA 30315</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete-Display-Board-Package-Meeting-11.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>

				<p class="schedule_date"><span>February 26, 2015</span></p>

				<p>Atlanta City Hall<br />
				55 Trinity Avenue, SW, Atlanta, GA 30303</p>

				<p class="schedule_time"><span>6:00 PM &ndash; 8:00 PM</span><span class="download-pdf"><a href="pdf/Complete Display Board PDF Package Meeting 12.pdf" target="_blank">Download Display Boards (Archive)</a></span></p>
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
