import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import users from './seed/userSeed';

const request = supertest(app);
const userSignup = '/api/v1/users/signup';
const userSignin = '/api/v1/users/signin';

describe('Authentication Test', () => {
  describe('User Signup Endpoint', () => {
    it('Should create a new user when a user' +
      'provides valid credentials', (done) => {
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(users[0])
          .end((err, res) => {
            expect(res.statusCode).to
              .equal(201);
            expect(res.body.message).to.equal('Signup Successful.');
            expect(res.body.username).to.be.a('string');
            expect(res.body.email).to.be.a('string');
            expect(res.body.token).to.be.a('string');
            expect(res.body.username).to.equal('drakethegoat');
            expect(res.body.email).to.equal('drakethegoat@email.com');
            expect(res.body).to.be.an('object');
            expect(res.body).to.not.have.property('password');
            done();
          });
      });
    it(
      'Should return an error when a user tries to signup without an email',
      (done) => {
        const testUser = { ...users[0] };
        delete testUser.email;
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.email).to
              .equal('Please provide a valid email address.');
            done();
          });
      }
    );
    it(
      'Should return an error when a user tries to signup without a name',
      (done) => {
        const testUser = { ...users[0] };
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
      'Should return an error when a user' +
      'attempts to signup without a password',
      (done) => {
        const testUser = { ...users[0] };
        delete testUser.password;
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.password).to
              .equal('Please provide a password greater than 8 characters.');
            done();
          });
      }
    );
    it(
      'Should return an error when a user attempts to' +
      'signup with a password less than 8 characters',
      (done) => {
        const testUser = { ...users[0] };
        testUser.password = 'less';
        request.post(userSignup)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testUser)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.password).to
              .equal('Please provide a password greater than 8 characters.');
            done();
          });
      }
    );
    it('Should return a 409 when a user tries to' +
      'signup with an email that already exists', (done) => {
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
    it('Should return a 409 for a username that already exists', (done) => {
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
  });
  describe('User Signin Endpoint', () => {
    it('Should sign in a user after providing valid credentials', (done) => {
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
          expect(res.body.email).to.equal('drakethegoat@email.com');
          expect(res.body.username).to.equal('drakethegoat');
          expect(res.body).to.not.have.property('password');
          done();
        });
    });
    it(
      'Should return an error if a user tries to sign in without a email',
      (done) => {
        const testUser = { ...users[0] };
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
        const testUser = { ...users[0] };
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
      'Should return an error if a user tries to sign' +
      'in with an invalid email or password',
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
    describe('Fetch User details Endpoint', () => {
      it('Should get the details of a user' +
        'that is already logged in', (done) => {
          const testUser = { ...users[0] };
          request.get(`/api/v1/users/get_user?token=${testUser.tokens}`)
            .set('Connection', 'keep alive')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
      it('Should return an error if an attempt is' +
        'made to fetch a user detail without being signed in', (done) => {
          request.get('/api/v1/users/get_user')
            .set('Connection', 'keep alive')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              done();
            });
        });

      describe('Update user details Endpoint', () => {
        it('Should modify the email of a logged in user', (done) => {
          const testUser = { ...users[0] };
          testUser.email = 'newemail@gmail.com';
          request.put(`/api/v1/users/profile?token=${testUser.tokens}`)
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
          request.put(`/api/v1/users/profile?token=${testUser.tokens}`)
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
          request.put(`/api/v1/users/profile?token=${testUser.tokens}`)
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

        it(
          'Should return an error if no token is provided' +
          'when trying to modify a user detail',
          (done) => {
            const testUser = { ...users[0] };
            testUser.password = 'mynewpassword';
            request.put('/api/v1/users/profile')
              .set('Connection', 'keep alive')
              .set('Content-Type', 'application/json')
              .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
              });
          }
        );
      });
    });
  });
});
