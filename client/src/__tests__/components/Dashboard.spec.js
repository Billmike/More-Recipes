import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Dashboard, mapStateToProps } from '../../components/Dashboard';
import { RecipeEdit } from '../../components/RecipeEdit';
import recipes from '../fixtures/recipes';
import auth from '../fixtures/authUser';
import state from '../fixtures/state';

describe('<Dashboard />', () => {
  const GetUserRecipesAction = jest.fn();
  const getUserinfo = jest.fn();
  it('Should render correctly', () => {
    const wrapper = shallow(<Dashboard
      getUserinfo={() => Promise.resolve()}
      GetUserRecipesAction={() => Promise.resolve()}
      recipes={recipes[0]}
      user={auth} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(3);
  });
  it('Should render the RecipeEdit component as a child element', () => {
    const wrapper = shallow(<Dashboard
      getUserinfo={() => Promise.resolve()}
      GetUserRecipesAction={() => Promise.resolve()}
      recipes={recipes[0]}
      user={auth}
    >
      <div>
        <div className="container">
          <h2 className="dashboard-h2">
            Welcome to your Dashboard
          </h2>
          <h4 className="dashboard-h4"> My Recipes</h4>
          <div className="row">
            <RecipeEdit />
          </div>
        </div>
      </div>
    </Dashboard>);
  });
  it('Should call mapStateToProps', (done) => {
    mapStateToProps(state);
    done();
  });
});
