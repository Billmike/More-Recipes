import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import reviews from './seed/reviewSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';

describe('Recipes Endpoint', () => {
  describe('#Test Creating a new Recipe', () => {
    it(
      'Should return a 403 when a user tries to create a recipe without a token',
      (done) => {
        request.post(recipesApi)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(recipes[0])
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            done();
          });
      }
    );
    it('Should successfully create a recipe as a logged in user', (done) => {
      const testUser = { ...users[0] };
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(recipes[1])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Recipe created successfully');
          expect(res.body.recipeData.id).to.be.a('number');
          expect(res.body.recipeData.description).to.be.a('string');
          expect(res.body.recipeData.category).to.be.a('string');
          expect(res.body.recipeData.imageUrl).to.be.a('string');
          expect(res.body.recipeData.name).to.be.a('string');
          expect(res.body.recipeData.ingredients).to.be.a('string');
          expect(res.body.recipeData.instructions).to.be.a('string');
          done();
        });
    });
    it(
      'Should return a 400 if no name of recipe is provided on creation attempt',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.name;
        request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Name is required.');
            done();
          });
      }
    );
    it(
      'Should return a 400 if no description is provided on recipe creation attempt',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.description;
        request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Description field is required.');
            done();
          });
      }
    );
    it(
      'Should return a 400 if no category is provided on recipe creation attempt',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.category;
        request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Please pick a category.');
            done();
          });
      }
    );
    it(
      'Should return a 400 if no ingredients are provided on recipe creation',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.ingredients;
        request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message)
              .to.equal('Input the ingredients for your recipe.');
            expect(res.body.status).to.equal('Operation Failed.');
            done();
          });
      }
    );
    it(
      'Should return a 400 if no instructions are provided on recipe creation',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.instructions;
        request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Input a set of instructions.');
            expect(res.body.status).to.equal('Operation Failed.');
            done();
          });
      }
    );
    it(
      'Should return a 403 if a user tries to edit a recipe without a token',
      (done) => {
        const testRecipe = { ...recipes[0] };
        const recipeId = recipes[0].id;
        testRecipe.name = 'New Rice meal';
        request.put(`${recipesApi}/${recipeId}/modify`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('Denied');
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            done();
          });
      }
    );
    it(
      'Should return a 404 if the recipe to be edited is not found',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        request
          .put(`${recipesApi}/100/modify?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(testRecipe)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message)
              .to.equal('It seems this recipe does not exist.');
            done();
          });
      }
    );
    it('Should prevent an unauthenticated user from deleting a recipe', (done) => {
      request.delete(`${recipesApi}/${recipes[0].id}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You need to be logged in to perform this action.');
          done();
        });
    });
    it('Should prevent a user from deleting a recipe they do not own', (done) => {
      const testUser = { ...users[0] };
      request.delete(`${recipesApi}/${recipes[0].id}?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You do not have the priviledges to perform this action.');
          expect(res.body.status).to.equal('Forbidden.');
          done();
        });
    });
    it('Should return a 404 if the recipe to be deleted does not exist', (done) => {
      const testUser = { ...users[0] };
      request.delete(`${recipesApi}/${recipes[1].id}?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        })
    })
    it(
      'Should prevent a non-logged in user from posting a review on a recipe',
      (done) => {
        request.post(`${recipesApi}/${recipes[0].id}/reviews`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(reviews)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            expect(res.body.status).to.equal('Denied');
            done();
          });
      }
    );
    it('Should prevent a user from posting an empty review', (done) => {
      const testReview = { ...reviews };
      delete testReview.content;
      request
        .post(`${recipesApi}/${recipes[0]
          .id}/reviews?token=${users[0].tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(testReview)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You can\'t post an empty review. Please, enter a happy review for this recipe.');
          expect(res.body.status).to.equal('Denied.');
          done();
        });
    });
    it(
      'Should return a 404 when a user tries to access a recipe that does not exist',
      (done) => {
        request
          .post(`${recipesApi}/100/reviews?token=${users[0].tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(reviews)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Recipe not found.');
            done();
          });
      }
    );
    it('Should add a review by an authenticated user', (done) => {
      request
        .post(`${recipesApi}/${recipes[0]
          .id}/reviews?token=${users[0].tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(reviews)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.reviewData).to.be.an('object');
          expect(res.body.reviewData.content).to.be.a('string');
          expect(res.body.message).to.equal('Review successfully posted');
          done();
        });
    });
    it('Should fetch a single recipe from the application', (done) => {
      request.get(`${recipesApi}/${recipes[0].id}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipeData.reviews).to.be.an('array');
          expect(res.body.recipeData).to.be.an('object');
          done();
        });
    });
    it('Should return all the recipes in the application', (done) => {
      request.get(`${recipesApi}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.recipeData).to.be.an('array');
          done();
        });
    });
    it('Should return all the user\'s recipe in the application', (done) => {
      const testUser = { ...users[0] };
      request.get(`/api/v1/users/recipes?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).
            to.equal(`You currently have ${res
              .body.userRecipe.length} recipe(s)`);
          expect(res.body.userRecipe).to.be.an('array');
          done();
        });
    });
    it('Should return an error if an unauthenticated user attempts fo fetch recipes', (done) => {
      request.get('/api/v1/users/recipes')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message)
            .to.equal('You need to be logged in to perform this action.');
          done();
        });
    });
  });
});
