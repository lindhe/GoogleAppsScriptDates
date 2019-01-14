// vim: syntax=javascript tabstop=2 shiftwidth=2
var assert = require('assert');

// I stole this horrible hack from https://stackoverflow.com/a/20473643/893211
// because I don't understand how to run this code with Node while still keeping
// it compliant with Google Apps Scripts.
var fs = require("fs");
function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}
include('dateHelpers.js')
// end of ugly hack

describe('getDateOfNextWN', function() {
  describe('#getDay()', function() {
    it('should return 0 when asking for a sunday', function() {
      today = new Date();
      thisYear = today.getFullYear();
      for (var year=thisYear; year < thisYear+2; year++) {
        for (var week=1; week<53; week++) {
          date = getDateOfNextWN(week, 0, year)
          assert.equal(date.getDay(), 0);
        }
      }
    });
  });
});

