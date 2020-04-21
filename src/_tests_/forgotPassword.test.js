import React from 'react';
import {shallow} from 'enzyme'
import ForgotPassword from '../components/forgotPassword'

describe('ForgotPassword Component', () =>{
    it('should render without throwing an error', () => {
        expect(shallow(<ForgotPassword />).exists()).toBe(true)
    })
    describe('Validete Email Fields. ', () => {
        it('Should Repond to change event and change the Email state.', () => {
            const wrapper = shallow(<ForgotPassword />);
            wrapper.find('#email')
            .simulate('change', {
                target:{
                    name:'Email',
                    value:'naresh@gmail.com'
                }
            })
            expect(wrapper.state('Email')).toEqual('naresh@gmail.com')
        })
    })
})