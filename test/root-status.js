const chai = require('chai');
const chaiHttp = require('chai-http');

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {app, runServer, closeServer} = require('../app');

// declare a variable for expect from chai import
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function() {
  // before(function() {
  //   return runServer();
  // });

  // // Close server after these tests run in case
  // // we have other test modules that need to 
  // // call `runServer`. If server is already running,
  // // `runServer` will error out.
  // after(function() {
  //   return closeServer();
  // });
    it.only('should list users on GET', function(done) {
      chai.request(app)
        .get('/api/users')
        .then(function(res) {
          console.log(res)
          expect(res).to.have.status(200);
               });
          done();
      
    });
  });

  // it("should update blog posts on PUT", function() {
  //   return (
  //     chai
  //       .request(app)
  //       // first have to get
  //       // .get("/blog-posts")
  //       .then(function(res) {
  //         const updatedPost = Object.assign(res.body[0], {
  //           userTestimony: "connect the dots",
  //           userDisplayName: "la la la la la"
  //         });
  //         return chai
  //           .request(app)
  //           .put(`/blog-posts/${res.body[0].id}`)
  //           .send(updatedPost)

  //           .then(function(res) {
  //             expect(res).to.have.status(204);
  //           });
  //       })
  //   );
  // });

  // describe('Testimonies', function() {
  //   it('should list testimonies on GET', function(done) {
  //     chai.request(app)
  //       .get('/api/testimonies')
  //       .then(function(res) {
  //         expect(res).to.have.status(200);
  //              });
  //         done();
      
  //   });
  // });

  // describe('Testimonies', function() {
  //   it('should list testimonies on GET', function(done) {
  //     chai.request(app)
  //       .get('/api/testimonies/5c8610319dca2fd083b2eea3')
  //       .then(function(res) {
  //         expect(res).to.have.status(200);
  //              });
  //         done();
      
  //   });
  // });