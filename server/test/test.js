process.env.NODE_ENV = 'test';

import chai from 'chai';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../app';

const expect = chai.expect;
const request = supertest(app);
const userSignup = '/api/v1/users/signup';
const userSignin = '/api/v1/users/signin';
let user = {};
let data = {};
let userToken;

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
      request.post(userSignup)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('Should return 400 for an already existing email.', () => {
      const sameData = Object.assign({}, user);
      request.post(userSignup)
        .send(sameData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no email is passed.', () => {
      const noEmail = Object.assign({}, user);
      delete noEmail.email;
      request.post(userSignup)
        .send(noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no password is entered.', () => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      request.post(userSignup)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no username is provided.', () => {
      const noUsername = Object.assign({}, user);
      delete noUsername.username;
      request.post(userSignup)
        .send(noUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 for an existing username.', () => {
      const sameusername = Object.assign({}, user);
      request.post(userSignup)
        .send(sameusername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
  });
  describe('User sign in', () => {
    beforeEach(() => {
      user = {
        email: 'sudoku@gmail.com',
        password: '123456',
      };
    });
    it('Should return 201 for a successful login', () => {
      request.post(userSignin)
        .send(user)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(201);
        });
    });
    it('Should return 400 if no email is provided on sign in', () => {
      const noEmail = Object.assign({}, user);
      delete noEmail.email;
      request.post(userSignin)
        .send(noEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no password is provided on sign in', () => {
      const noPassword = Object.assign({}, user);
      delete noPassword.password;
      request.post(userSignin)
        .send(noPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 403 for a wrong password', () => {
      const wrongPassword = Object.assign({}, user);
      wrongPassword.password = 'veryWrongPassword';
      request.post(userSignin)
        .send(wrongPassword)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
    it('Should return 403 for an incorrect email address', () => {
      const wrongEmail = Object.assign({}, user);
      wrongEmail.email = 'verywrongemail@yahoo.com';
      request.post(userSignin)
        .send(wrongEmail)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
  });
  describe('Add Recipe', () => {
    beforeEach(() => {
      data = {
        name: 'Ghana Jollof',
        description: 'Best Jollof in the world',
        category: 'Lunch',
        ingredients: ['Rice', 'Tomatoes'],
        instructions: ['Cook this shii well'],
      };
    });
    it('Should return 403 if no token is supplied before adding a recipe', () => {
      request.post('/api/v1/recipes')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(403);
        });
    });
    it('Should return 400 if no recipe name is provided.', () => {
      const noName = Object.assign({}, data);
      delete noName.name;
      request.post('/api/v1/recipes')
        .send(noName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no description is provided', () => {
      const noDescription = Object.assign({}, data);
      delete noDescription.description;
      request.post('/api/v1/recipes')
        .send(noDescription)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no category is provided', () => {
      const noCategory = Object.assign({}, data);
      delete noCategory.category;
      request.post('/api/v1/recipes')
        .send(noCategory)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no Ingredient is provided', () => {
      const noIngredient = Object.assign({}, data);
      delete noIngredient.ingredients;
      request.post('/api/v1/recipes')
        .send(noIngredient)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
    it('Should return 400 if no Instruction is provided', () => {
      const noInstruction = Object.assign({}, data);
      delete noInstruction.instructions;
      request.post('/api/v1/recipes')
        .send(noInstruction)
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status).to.equal(400);
        });
    });
  });
});
