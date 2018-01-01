import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import users from './seed/userSeed';

const request = supertest(app);
const userSignup = '/api/v1/users/signup';
const userSignin = '/api/v1/users/signin';

describe('User API testing', () => {
  describe('#Handle User creation', () => {
    it('Should create a new user', (done) => {
      request.post(userSignup)
        .send(users[0])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should create another user', (done) => {
      request.post(userSignup)
        .send(users[1])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should return a 400 for a signup attempt without an email', (done) => {
      const testUser = Object.assign({}, users[0]);
      delete testUser.email;
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 for a signup attempt without a username', (done) => {
      const testUser = Object.assign({}, users[0]);
      delete testUser.username;
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 for a signup attempt without a password', (done) => {
      const testUser = Object.assign({}, users[0]);
      delete testUser.password;
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 for a password length shorter than 8 characters', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.password = 'test';
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 for an invalid email address', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.email = 'invalidemailid';
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 409 for an alread taken email address', (done) => {
      const testUser = Object.assign({}, users[0]);
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('Should return a 409 for an already taken username', (done) => {
      const testUser = Object.assign({}, users[0]);
      request.post(userSignup)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
  });
  describe('#Handle user sign in', () => {
    it('Should sign in a particular user', (done) => {
      request.post(userSignin)
        .send(users[0])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should return a 403 for an invalid password', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.password = 'anotherpassword';
      request.post(userSignin)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return 403 for an invalid email', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.email = 'anotheremail@email.com';
      request.post(userSignin)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return a 403 if email and password combination is wrong', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.email = 'somethingentirelydifferent@gmail.com';
      testUser.password = 'somethingentirelydifferent';
      request.post(userSignin)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return a 400 if no email is provided on signing in', (done) => {
      const testUser = Object.assign({}, users[0]);
      delete testUser.email;
      request.post(userSignin)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 if no password is provided on signing in', (done) => {
      const testUser = Object.assign({}, users[0]);
      delete testUser.password;
      request.post(userSignin)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('# Handle Editing user profile', () => {
    it('Should prevent a user that is not logged in from editing a profile', (done) => {
      const testUser = Object.assign({}, users[0]);
      request.post('/api/v1/users/profile')
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should modify the email of an authenticated user', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.email = 'anewemail@gmail.com';
      request.post(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should modify the password of an authenticated user', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.password = 'newpasswordforme';
      request.post(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('Should modify the username of an authenticated user', (done) => {
      const testUser = Object.assign({}, users[0]);
      testUser.username = 'newusernameformyfriend';
      request.post(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .send(testUser)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('# Handle the retrieval of user data from database', () => {
    it('Should prevent a user that is not logged in from getting details', (done) => {
      request.get('/api/v1/users/get_user')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should retrieve the details of a signed in user from the database', (done) => {
      request.get(`/api/v1/users/get_user?token=${users[0].tokens[0].token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

