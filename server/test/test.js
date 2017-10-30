process.env.NODE_ENV = 'test';

import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const expect = chai.expect;
const request = supertest(app);
let user = {};

describe('API Endpoints testing', () => {
  describe('Create a new User.', () => {
    beforeEach(() => {
      user = {
        username: 'fidelis',
        email: 'abc@gmail.com',
        password: 'password12345',
      };
    });
    it('Should return 201 for successfull user creation.', () => {
      request.post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
  });
});
