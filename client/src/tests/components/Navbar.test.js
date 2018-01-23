import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/Navbar';

test('Should render the Navbar component', () => {
	const wrapper = shallow(<Navbar />);
	expect(wrapper).toMatchSnapshot();
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Navbar />);
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
});
