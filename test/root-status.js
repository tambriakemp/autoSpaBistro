const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require('../app');

// declare a variable for expect from chai import
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {
    it('should list users on GET', function(done) {
      chai.request(app)
        .get('/api/users')
        .then(function(res) {
          expect(res).to.have.status(200);
               });
          done();
      
    });
  });