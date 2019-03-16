const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const { Users } = require('../users/models');
const { app, runServer, closeServer } = require('../app');
const { TEST_DATABASE_URL } = require('../config/config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {
    it('should list users on GET', function(done) {
      chai.request(app)
        .get('/api/users')
        .then(function(res) { 
          console.log(res.body)
          expect(res).to.have.status(200);
           return done();

               });
      });
  });

  // it('should list ALL blobs on /blobs GET', function (done) {
  //   let res;
  //   return chai.request(app)
  //     .get('/api/users')
  //     .then(function (_res) {
  //       res = _res;
  //       expect(res).to.have.status(200);
  //       expect(res.body.users).to.have.lengthOf.at.least(1);
  //       return Users.count();
  //       done();
  //     })
  //     .then(function (count) {
  //       expect(res.body.users).to.have.lengthOf(count);
  //       done();
  //     });
  // });

