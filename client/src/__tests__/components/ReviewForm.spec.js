import React from 'react';
import { shallow } from 'enzyme';
import ReviewForm from '../../components/ReviewForm';
import Loader from '../../components/Loader';
import { recipesLoading } from '../fixtures/recipes';

describe('<ReviewForm />', () => {
  it('Should render the review form correctly', () => {
    const wrapper = shallow(<ReviewForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the loader props', () => {
    const wrapper = shallow(<ReviewForm isLoading={recipesLoading}>
      <Loader />
    </ReviewForm>);
  });
});
