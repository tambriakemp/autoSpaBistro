const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const { Users } = require("../users/models");
const { app, runServer, closeServer } = require("../app");
const { TEST_DATABASE_URL } = require("../config/config");

const expect = chai.expect;

chai.use(chaiHttp);

const should = chai.should();

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedUserData() {
  console.info("seeding user data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      user: {
        name: faker.name.name(),
        username: faker.internet.username(),
        password: faker.internet.password(),
        email: faker.internet.email()
      }
    });

    return Users.insertMany(seedData);
  }
}
describe("user API resource", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("should return all existing users", function() {
      let res;
      return chai
        .request(app)
        .get("/users")
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);

          return Users.count();
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it("should return users with right fields", function() {
      let resUser;
      return chai
        .request(app)
        .get("/users")
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function(user) {
            user.should.be.a("object");
            user.should.include.keys(
              "id",
              "name",
              "username",
              "password",
              "email"
            );
          });

          resUser = res.body[0];
          return Users.findById(resUser.id);
        })
        .then(user => {
          resUser.name.should.equal(users.name);
          resUser.username.should.equal(users.username);
          resUser.email.should.equal(users.email);
        });
    });
  });

  describe("POST endpoint", function() {
    it("should add a new user", function() {
      const newUser = {
        name: faker.name.name(),
        username: faker.internet.username(),
        password: faker.internet.password(),
        email: faker.internet.email()
      };

      return chai
        .request(app)
        .post("/users")
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.include.keys(
            "id",
            "name",
            "username",
            "password",
            "email"
          );
          res.body.name.should.equal(newUser.name);
          res.body.id.should.not.be.null;
          res.body.email.should.equal(newUser.email);
          return Users.findById(res.body.id);
        })
        .then(function(user) {
          user.name.should.equal(newUser.name);
          user.username.should.equal(newUser.username);
          user.password.should.equal(newUser.password);
          user.email.should.equal(newUser.email);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("should update fields you send over", function() {
      const updateData = {
        name: "bree",
        username: "bree",
        password: "breebree",
        email: "bree@bree.com"
      };

      return Users.findOne()
        .then(user => {
          updateData.id = user.id;

          return chai
            .request(app)
            .put(`/users/${id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return Users.findById(updateData.id);
        })
        .then(user => {
          user.name.should.equal(newUser.name);
          user.username.should.equal(newUser.username);
          user.password.should.equal(newUser.password);
          user.email.should.equal(newUser.email);
        });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete a user by id", function() {
      let user;

      return Users.findOne()
        .then(_user => {
          user = user;
          return chai.request(app).delete(`/users/${id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Users.findById(id);
        })
        .then(user => {
          should.not.exist(_user);
        });
    });
  });
});
