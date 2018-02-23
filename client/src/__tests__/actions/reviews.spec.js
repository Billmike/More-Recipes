import configureStore from 'redux-mock-store';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { startAddReview } from '../../actions/recipes';
import reviewResponse from '../__mocks__/actions/reviews';
import { ADD_REVIEW } from '../../actions/types';

const mockStore = configureStore([thunk]);

describe('ADD REVIEW actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('Should add review to a recipe and dispatch ADD_REVIEW action', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: reviewResponse
      });
    });
    const returnedAction = [
      {
        type: ADD_REVIEW,
        review: reviewResponse
      }
    ];
    const store = mockStore({});
    await store.dispatch(startAddReview({}));
    expect(store.getActions()).toEqual(returnedAction);
    done();
  });
});
