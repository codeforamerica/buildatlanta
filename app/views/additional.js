var View = require('ampersand-view');

module.exports = View.extend({
  template: `
    <div class="commentView">
      <div class="comments">
        <strong>Additional Projects</strong>
        <p>A portion of funding will be spent strategically on various programs across the city. These programs range from ADA compliance to complete street renovations. These stand-alone programs are detailed below.</p>
        
        <div class="half">
          <img src="/images/oeam.jpg">
          <p><strong>OEAM-ADA</strong>: Department of Justice (DOJ)/ADA compliance & other repairs at City buildings.</p>
        </div>

        <div class="half">
          <img src="/images/curb.png">
          <p><strong>Curbing</strong>: Installation and repair of priority curbing.</p>
        </div>

        <div class="half">
          <img src="/images/sidewalk.jpg">
          <p><strong>Sidewalks</strong>: Sidewalk DOJ/ADA ramp repair compliance.</p>
        </div>

        <div class="half">
          <img src="/images/streetlight.jpg">
          <p><strong>Street Lights</strong>: High priority lighting repair and street light LED conversions</p>
        </div>

        <div class="half">
          <img src="/images/trafficsign.gif">
          <p><strong>Traffic Signs</strong>: Upgrade of MUTCD size and lettering requirements for street name signs.</p>
        </div>

        <div class="half">
          <img src="/images/art.jpg">
          <p><strong>Percent for Art</strong>: Per City Ordinance a minimum of 1.5% of project construction cost will be set aside for public art.</p>
        </div>
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
});
