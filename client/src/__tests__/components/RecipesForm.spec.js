import React from 'react';
import { shallow } from 'enzyme';
import RecipesForm from '../../components/RecipesForm';

describe('<RecipesForm/>', () => {
  it('Should render the recipe form correctly', () => {
    const wrapper = shallow(<RecipesForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
