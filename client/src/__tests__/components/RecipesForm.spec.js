import React from 'react';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DropZone from 'react-dropzone';
import RecipesForm from '../../components/RecipesForm';
import recipes from '../fixtures/recipes';

describe('<RecipesForm/>', () => {
  it('Should render the recipe form correctly', () => {
    const wrapper = shallow(<RecipesForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render the RecipesForm with recipes', () => {
    const wrapper = shallow(<RecipesForm recipe={recipes[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should set name on input change', () => {
    const value = 'Fried Rice';
    const wrapper = shallow(<RecipesForm />);
    wrapper.find('input').at(0).simulate('change', {
      target: { name: 'name', value }
    });
    expect(wrapper.state('name')).toBe(value);
  });
  it('Should render error for an invalid form submission', () => {
    const wrapper = shallow(<RecipesForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state('errors')).toBeTruthy();
  });
  it('Should set ingredient on input change', () => {
    const value = 'Best beef in the world';
    const wrapper = shallow(<RecipesForm />);
    wrapper.find('textarea').at(0).simulate('change', {
      target: { name: 'description', value }
    });
    expect(wrapper.state('description')).toBe(value);
  });
  it('Should submit the form when' +
    ' button is clicked and all fields filled', () => {
      const wrapper = shallow(<RecipesForm

      />);
      const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      wrapper.find('form').simulate('submit', {
        preventDefault: jest.fn()
      });
      expect(onSubmitSpy).toBeTruthy();
    });
  it('Should handle uploads to cloudinary', () => {
    moxios
      .stubRequest('https://api.cloudinary.com/v1_1/andela-nigeria/image/upload', {
        status: 200,
        response: {
          imageUrl: 'https://someamazingimagehere.png'
        }
      });
    const wrapper = shallow(<RecipesForm />);
    wrapper.instance().setState(recipes[3]);
    wrapper.update();
    expect(wrapper.instance().state).toEqual(recipes[3]);
  });
  it('Should set the image to be uploaded to state', () => {
    const files = [
      {
        name: 'image file',
        url: 'link'
      }
    ];
    const wrapper = shallow(<RecipesForm />);
    wrapper.instance().handleDrop(files);
    expect(wrapper.instance().state.imageUrl).toEqual({
      name: 'image file',
      url: 'link'
    });
  });
  it('Should handle onDrop method', () => {
    const handleDrop = jest.fn();
    const wrapper = shallow(<RecipesForm>
      <DropZone
        onDrop={handleDrop}
      />
    </RecipesForm>);
  });
});
