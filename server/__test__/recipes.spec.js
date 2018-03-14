import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import reviews from './seed/reviewSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';

describe('Recipes Endpoint Tests', () => {
  describe('Test Recipe Creation', () => {
    it(
      'Should return an error message when a user' +
      'tries to create a recipe without being logged in',
      (done) => {
        request.post(recipesApi)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(recipes[0])
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            done();
          });
      }
    );
    it('Should successfully create a recipe as a logged in user', (done) => {
      const testUser = { ...users[0] };
      request.post(`${recipesApi}?token=${testUser.tokens}`)
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
      'Should return an error message if no name' +
      'is provided for recipe.',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.name;
        request.post(`${recipesApi}?token=${testUser.tokens}`)
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
      'Should return an error message if no description' +
      'is provided for recipe.',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.description;
        request.post(`${recipesApi}?token=${testUser.tokens}`)
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
      'Should return an error message if no category is' +
      'provided for recipe.',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.category;
        request.post(`${recipesApi}?token=${testUser.tokens}`)
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
      'Should return an error message if no ingredient' +
      'is provided for recipe.',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.ingredients;
        request.post(`${recipesApi}?token=${testUser.tokens}`)
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
      'Should return an error message if no instruction' +
      'is provided for recipe.',
      (done) => {
        const testUser = { ...users[0] };
        const testRecipe = { ...recipes[0] };
        delete testRecipe.instructions;
        request.post(`${recipesApi}?token=${testUser.tokens}`)
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

    describe('Test Modify recipe', () => {
      it(
        'Should return an error if a user tries to' +
        'edit a recipe without being logged in',
        (done) => {
          const testRecipe = { ...recipes[0] };
          const recipeId = recipes[0].id;
          testRecipe.name = 'New Rice meal';
          request.put(`${recipesApi}/${recipeId}`)
            .set('Connection', 'keep alive')
            .set('Content-Type', 'application/json')
            .type('form')
            .send(testRecipe)
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body.message)
                .to.equal('You need to be logged in to perform this action.');
              done();
            });
        }
      );
      it(
        'Should return an error message if the' +
        'recipe to be edited is not found',
        (done) => {
          const testUser = { ...users[0] };
          const testRecipe = { ...recipes[0] };
          request
            .put(`${recipesApi}/100?token=${testUser.tokens}`)
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
      describe('Delete Recipe Endpoint', () => {
        it(
          'Should prevent an unauthenticated user from deleting a recipe',
          (done) => {
            request.delete(`/api/v1/recipe/${recipes[0].id}`)
              .set('Connection', 'keep alive')
              .set('Content-Type', 'application/json')
              .type('form')
              .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).to
                  .equal('You need to be logged in to perform this action.');
                done();
              });
          }
        );
        it(
          'Should prevent a user from deleting a recipe they do not own',
          (done) => {
            const testUser = { ...users[0] };
            request.delete(`/api/v1/recipe/${recipes[0]
              .id}?token=${testUser.tokens}`)
              .set('Connection', 'keep alive')
              .set('Content-Type', 'application/json')
              .type('form')
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body.message).to
                  .equal('You cannot delete this recipe' +
                    ' as it does not belong to you.');
                done();
              });
          }
        );
        it(
          'Should return an error message if the recipe' +
          'to be deleted does not exist',
          (done) => {
            const testUser = { ...users[0] };
            request.delete(`${recipesApi}/${recipes[1]
              .id}?token=${testUser.tokens}`)
              .set('Connection', 'keep alive')
              .set('Content-Type', 'application/json')
              .type('form')
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
          }
        );
        describe('Review Endpoint Test', () => {
          it(
            'Should prevent a non-logged in user' +
            'from posting a review on a recipe',
            (done) => {
              request.post(`${recipesApi}/${recipes[0].id}/reviews`)
                .set('Connection', 'keep alive')
                .set('Content-Type', 'application/json')
                .type('form')
                .send(reviews)
                .end((err, res) => {
                  expect(res.status).to.equal(401);
                  expect(res.body.message)
                    .to.equal('You need to be logged in to perform this action.');
                  done();
                });
            }
          );
          it('Should prevent a user from posting an empty review', (done) => {
            const testReview = { ...reviews };
            delete testReview.content;
            request
              .post(`${recipesApi}/${recipes[0]
                .id}/reviews?token=${users[0].tokens}`)
              .set('Connection', 'keep alive')
              .set('Content-Type', 'application/json')
              .type('form')
              .send(testReview)
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body.message).to
                  .equal('You can\'t post an empty review.' +
                    'Please, enter a happy review for this recipe.');
                expect(res.body.status).to.equal('Denied.');
                done();
              });
          });
          it(
            'Should return an error when a user tries' +
            'to access a recipe that does not exist',
            (done) => {
              request
                .post(`${recipesApi}/100/reviews?token=${users[0]
                  .tokens}`)
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
          it('Should add a review by a logged-in user', (done) => {
            request
              .post(`${recipesApi}/${recipes[0]
                .id}/reviews?token=${users[0].tokens}`)
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
          describe('Get Recipe Endpoint', () => {
            it('Should fetch a single recipe from the application', (done) => {
              request.get(`${recipesApi}/${recipes[0].id}`)
                .set('Connection', 'keep alive')
                .set('Content-Type', 'application/json')
                .type('form')
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.recipeData).to.be.an('array');
                  done();
                });
            });
            it('Should fetch all the recipes in the application', (done) => {
              request.get(`${recipesApi}/1`)
                .set('Connection', 'keep alive')
                .set('Content-Type', 'application/json')
                .type('form')
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.recipeData).to.be.an('array');
                  done();
                });
            });
            it('Should fetch all the user\'s recipe in the application', (done) => {
              const testUser = { ...users[0] };
              request.get(`/api/v1/users/recipes?token=${testUser.tokens}`)
                .set('Connection', 'keep alive')
                .set('Content-Type', 'application/json')
                .type('form')
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.message)
                    .to.equal(`You currently have ${res
                      .body.recipeData.length} recipe(s)`);
                  expect(res.body.recipeData).to.be.an('array');
                  done();
                });
            });
            it(
              'Should return an error if an unauthenticated user attempts fo fetch recipes',
              (done) => {
                request.get('/api/v1/users/recipes')
                  .set('Connection', 'keep alive')
                  .set('Content-Type', 'application/json')
                  .type('form')
                  .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.message)
                      .to.equal('You need to be logged in to perform this action.');
                    done();
                  });
              }
            );
            describe('Search Recipes Endpoint', () => {
              it('Should return the results of a search', (done) => {
                request.get(`${recipesApi}/search?search=Totally random name here&page=1`)
                  .set('Connection', 'keep alive')
                  .set('Content-Type', 'application/json')
                  .type('form')
                  .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                  });
              });
              it('Should return an error for a wrong search query passed', (done) => {
                request.get(`${recipesApi}/search?ingredients=Array`)
                  .set('Connection', 'keep alive')
                  .set('Content-Type', 'application/json')
                  .type('form')
                  .end((err, res) => {
                    expect(res.status).to.equal(500);
                    expect(res.body.message).to
                      .equal('Oops.. Something went wrong. Why not try again later?');
                    done();
                  });
              });
              it(
                'Should return an error if no' +
                'parameter is passed in the search',
                (done) => {
                  request.get(`${recipesApi}/search?name=`)
                    .set('Connection', 'keep alive')
                    .set('Content-Type', 'application/json')
                    .type('form')
                    .end((err, res) => {
                      expect(res.status).to.equal(500);
                      expect(res.body.message).to
                        .equal('Oops.. Something went wrong. Why not try again later?');
                      done();
                    });
                }
              );
            });
          });
        });
      });
    });
  });
});
