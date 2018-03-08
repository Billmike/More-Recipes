import React from 'react';
import { shallow } from 'enzyme';
import { EditRecipe } from '../../components/EditRecipe';
import RecipesForm from '../../components/RecipesForm';
import recipes from '../fixtures/recipes';

describe('<EditRecipe />', () => {
  it('Should render EditRecipe component correctly', () => {
    const wrapper = shallow(<EditRecipe />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(1);
  });
  it('Should render the nested RecipesForm component', () => {
    const wrapper = shallow(<EditRecipe>
      <div>
        <h1 className="container add-h1"> Edit Recipe</h1>
        <RecipesForm />
      </div>
    </EditRecipe>);
  });
  it('Should handle onSubmit', (done) => {
    const EditRecipeAction = jest.fn();
    const history = { push: (() => { }) };
    const match = {
      params: {
        id: 1
      }
    };
    const wrapper = shallow(<EditRecipe
      EditRecipeAction={() => Promise.resolve()}
      history={history}
      match={match}
      recipe={recipes[0]}
    />);

    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(recipes[0]);
    expect(onSubmitSpy).toHaveBeenCalled();
    done();
  });
});
