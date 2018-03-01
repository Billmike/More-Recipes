import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import users from './seed/userSeed';

const request = supertest(app);
const userSignup = '/api/v1/users/signup';
const userSignin = '/api/v1/users/signin';

let user;

describe('User API testing', () => {
  beforeEach(() => {
    user = {
      username: 'randomusername',
      email: 'randomd@gmail.com',
      password: 'qwertyuiop',
    };
  });
  describe('Handle User creation', () => {
    it('Should create a new user', (done) => {
      request.post(userSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Signup Successful.');
          expect(res.body.username).to.be.a('string');
          expect(res.body.email).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.body.username).to.equal('randomusername');
          expect(res.body.email).to.equal('randomd@gmail.com');
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it('Should create another user', (done) => {
      request.post(userSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(users[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Signup Successful.');
          expect(res.body.username).to.be.a('string');
          expect(res.body.email).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.body.username).to.equal('someusername');
          expect(res.body.email).to.equal('someemail@email.com');
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it('Should create another user', (done) => {
      request.post(userSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(users[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Signup Successful.');
          expect(res.body.username).to.be.a('string');
          expect(res.body.email).to.be.a('string');
          expect(res.body.token).to.be.a('string');
          expect(res.body).to.be.an('object');
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it(
      'Should return an error when a user tries to signup without an email',
      (done) => {
        const testUser = { ...user };
        delete testUser.email;
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.email).to.equal('Please provide a valid email address.');
            done();
          });
      }
    );
    it(
      'Should return an error when a user tries to signup without a name',
      (done) => {
        const testUser = { ...user[1] };
        delete testUser.username;
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.username).to.equal('Username is required.');
            done();
          });
      }
    );
    it(
      'Should return an error when a user attempts to signup without a password',
      (done) => {
        const testUser = { ...user };
        delete testUser.password;
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.password).to.equal('Please provide a password greater than 8 characters.');
            done();
          });
      }
    );
    it(
      'Should return an error when a user attempts to signup with a password less than 8 characters',
      (done) => {
        const testUser = { ...user };
        testUser.password = 'less';
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.password).to.equal('Please provide a password greater than 8 characters.');
            done();
          });
      }
    );
    it('Should return a 409 when a user tries to signup with an email that is taken', (done) => {
      request.post(userSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(users[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('Email must be unique.');
          done();
        });
    });
    it('Should return a 409 for a username that is already taken', (done) => {
      const testUser = { ...users[0] };
      testUser.email = 'osx@gmail.com';
      request.post(userSignup)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('Username must be unique.');
          done();
        });
    });
    it('Should sign in a user', (done) => {
      request.post(userSignin)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(users[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.equal('Sign in Successfull');
          expect(res.body).to.be.an('object');
          expect(res.body.username).to.be.a('string');
          expect(res.body.email).to.be.a('string');
          expect(res.body.email).to.equal('someemail@email.com');
          expect(res.body.username).to.equal('someusername');
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it(
      'Should return an error if a user tries to sign in without a email',
      (done) => {
        const testUser = { ...user };
        delete testUser.email;
        request.post(userSignin)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res
              .body.email).to.equal('Input an email address to sign-in.');
            done();
          });
      }
    );
    it(
      'Should return an error if a user tries to sign in without a password',
      (done) => {
        const testUser = { ...user };
        delete testUser.password;
        request.post(userSignin)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.password).to.equal('Input a password to sign-in.');
            done();
          });
      }
    );
    it(
      'Should return an error if a user tries to sign in with an invalid email or password',
      (done) => {
        const dummyUser = {
          email: 'somethinginvalid',
          password: 'nonexistent'
        };
        request.post(userSignin)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(dummyUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message).to.equal('Invalid email or password.');
            done();
          });
      }
    );
    it('Should get the details of a user that is already logged in', (done) => {
      const testUser = { ...users[0] };
      request.get(`/api/v1/users/get_user?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('Should return an error if an attempt is made to get user details without a token', (done) => {
      request.get('/api/v1/users/get_user')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('Should modify the email of a logged in user', (done) => {
      const testUser = { ...users[0] };
      testUser.email = 'newemail@gmail.com';
      request.put(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.body.userData).to.be.an('object');
          expect(res.body.userData).to.have.property('username');
          expect(res.body.userData).to.have.property('email');
          expect(res.body.userData).to.not.have.property('password');
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('Should modify the username of a logged in user', (done) => {
      const testUser = { ...users[0] };
      testUser.username = 'mynewusername';
      request.put(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.body.userData).to.be.an('object');
          expect(res.body.userData).to.have.property('username');
          expect(res.body.userData).to.have.property('email');
          expect(res.body.userData).to.not.have.property('password');
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('Should modify the password of a logged in user', (done) => {
      const testUser = { ...users[0] };
      testUser.password = 'mynewpassword';
      request.put(`/api/v1/users/profile?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.body.userData).to.be.an('object');
          expect(res.body.userData).to.have.property('username');
          expect(res.body.userData).to.have.property('email');
          expect(res.body.userData).to.not.have.property('password');
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('Should return a 403 if no token is provided when trying to modify a user detail',
      (done) => {
        const testUser = { ...users[0] };
        testUser.password = 'mynewpassword';
        request.put('/api/v1/users/profile')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
          });
      });
  });
});
