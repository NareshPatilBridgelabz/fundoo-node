import React from 'react';
import {shallow} from 'enzyme'
import Login from '../components/login'

describe('Login Component', () =>{
    it('should render without throwing an error', () => {
        expect(shallow(<Login />).exists()).toBe(true)
    })
    describe('Validate Input Fields. ', () => {
        it('Should Repond to change event and change the Email state.', () => {
            const wrapper = shallow(<Login />);
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
    
    describe('Validate Input Fields. ', () => {
        it('Should Respond to change event and change the Password state.', () => {
            const wrapper = shallow(<Login />);
            wrapper.find('#password')
            .simulate('change' , {
                target:{
                    name:'Password',
                    value:'1234567'
                }
            })
            expect(wrapper.state('Password')).toEqual('1234567');
        })
    })
})