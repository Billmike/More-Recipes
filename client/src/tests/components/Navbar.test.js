import React from 'react';
import Navbar from '../../components/Navbar';
import { shallow } from 'enzyme';

test('Should render the Navbar component', () => {
	const wrapper = shallow(<Navbar />);
	expect(wrapper).toMatchSnapshot();
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Navbar />);
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
});
