// Looks for a /app/data.csv file in a specific format, geocodes any found
// addresses, inserts them into LATITUDE and LONGITUDE columns, and writes
// out to a new file at /app/data-geocoded.csv.

var _ = require('underscore');
var csv = require('ya-csv');
var fs = require('fs');
var geocoder = require('geocoder');
var limits = require('limits.js');
var path = require('path');

var inputFile = path.join(__dirname, '../app/data/projects.csv');
var outputFile = path.join(__dirname, '../app/data/projects-geocoded.csv');

var reader = csv.createCsvFileReader(inputFile, {
  columnsFromHeader: true,
  separator: ',',
  quote: '"',
  escape: '"',       
  comment: '',
});
var writer = new csv.CsvWriter(fs.createWriteStream(outputFile));
var queue = limits({ secondly: 5 });

var writeHeaders = _.once(function(record) {
  writer.writeRecord(_.keys(record));
});

reader.addListener('data', function(record) {
  writeHeaders(record);

  var address = record.address;

  // Special cases for excel sheet format
  if (address === '' && record['From']) {
    address = record['From'] + ', Atlanta, GA';
  }

  if (!address) {
    process.stdout.write('!');
    writer.writeRecord(_.values(record));
    return;
  }

  queue.push(function() {
    geocoder.geocode(address, function(err, data) {
      if (!data) {
        process.stdout.write('?');
        writer.writeRecord(_.values(record));
        return;
      }
			if (!data.results[0]) {
        process.stdout.write('?');
        writer.writeRecord(_.values(record));
        return;
      }
      process.stdout.write('.');
      var latlng = data.results[0].geometry.location;

      // Points that are at the exact center of the city didn't geocode correctly
      if (latlng.lat === 33.7489954 && latlng.lng === -84.3879824) {
        writer.writeRecord(_.values(record));
        return;
      }

      record.LATITUDE = latlng.lat;
      record.LONGITUDE = latlng.lng;
      writer.writeRecord(_.values(record));
    });
  });
});
