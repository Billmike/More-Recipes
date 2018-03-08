import React from 'react';
import { shallow } from 'enzyme';
import mapDispatchToProps, { AddRecipe } from '../../components/AddRecipe';
import recipes from '../fixtures/recipes';
import RecipesForm from '../../components/RecipesForm';

describe('<AddRecipe />', () => {
  it('Should render correctly', () => {
    const wrapper = shallow(<AddRecipe />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render the RecipesForm nested inside it', () => {
    const wrapper = shallow(<AddRecipe>
      <div>
        <h1 className="container add-h1"> Add Recipe</h1>
        <RecipesForm />
      </div>
    </AddRecipe>);
  });
  it('Should handle onSubmit', (done) => {
    const history = { push: (() => { }) };
    const AddRecipeAction = jest.fn();
    const wrapper = shallow(<AddRecipe
      AddRecipeAction={() => Promise.resolve()}
      history={history}
    />);
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');

    wrapper.instance().onSubmit(recipes[0]);
    expect(onSubmitSpy).toHaveBeenCalled();
    done();
  });
});
