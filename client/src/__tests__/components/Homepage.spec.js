import React from 'react';
import { shallow } from 'enzyme';
import { Homepage, mapStateToProps } from '../../components/Hompage';
import state from '../fixtures/state';

describe('<Homepage />', () => {
  it('Should render the homepage component correctly', () => {
    const GetAllRecipesAction = jest.fn();
    const GetPopularRecipes = jest.fn();
    const wrapper = shallow(<Homepage
      GetAllRecipesAction={() => Promise.resolve()}
      GetPopularRecipes={() => Promise.resolve()}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(13);
  });

  it('Should call mapStateToProps', (done) => {
    mapStateToProps(state);
    done();
  });
});
