var app = require('../index.js');
var supertest = require('supertest');

var request = supertest(app);
// add comment
describe('test/index.test.js', function() {
  it('should return 64 when n == 8', function(done) {
    request.get('/square').query({n: 8}).expect('64', done);
  });
});

