require('chai').should();
var httpMocks = require('node-mocks-http');
var people = require('./people');

describe('routes/people', function () {
  it('should have exactly 10 pages', function () {
    var req = httpMocks.createRequest();
    var res = httpMocks.createResponse();
    people.index(req, res);
    var data = JSON.parse(res._getData());
    data.res.totalPages.should.equal(10);
  });
});
