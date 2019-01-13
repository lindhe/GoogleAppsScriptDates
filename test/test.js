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
      assert.equal(getDateOfNextWN(20, 0).getDay(), 0);
    });
  });
});

