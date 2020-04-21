import React from 'react';
import {shallow} from 'enzyme'
import Registration from '../components/registration'

describe('Registration Component', () =>{
    it('should render without throwing an error', () => {
        expect(shallow(<Registration />).exists()).toBe(true)
    })

    describe('Validate FirstName Fields. ', () => {
        it('Should Respond to change event and change the FirstName state.', () => {
            const wrapper = shallow(<Registration />);
            wrapper.find('#firstname')
            .simulate('change', {
                target:{
                    name:'FirstName',
                    value:'Khalander'
                }
            })
            expect(wrapper.state('Firstname')).toEqual('Khalander')
        })
    })

    describe('Validate Lastname Fields. ', () => {
        it('Should Respond to change event and change the LastName state', () => {
            const wrapper = shallow(<Registration />);
            wrapper.find('#lastname')
            .simulate('change', {
                target:{
                    name:'LastName',
                    value:'sheikh'
                }
            })
            expect(wrapper.state('Lastname')).toEqual('sheikh')
        })
    })

    
    describe('Validate Email Fields. ', () => {
        it('Should Respond to change event and change the Email state.', () => {
            const wrapper = shallow(<Registration />);
            wrapper.find('#email')
            .simulate('change' , {
                target:{
                    name:'Email',
                    value:'naresh@gmail.com'
                }
            })
            expect(wrapper.state('Email')).toEqual('naresh@gmail.com');
        })
    })

    
    describe('Validate Phone Fields. ', () => {
        it('Should Respond to change event and change the Phone state.', () => {
            const wrapper = shallow(<Registration />);
            wrapper.find('#phone')
            .simulate('change', {
                target:{
                    name:'Phone',
                    value:'9812345678'
                }
            })
            expect(wrapper.state('Phone')).toEqual('9812345678')
        })
    })
    
    describe('Validate Password Fields. ', () => {
        it('Should Respond to change event and change the Password state.', () => {
            const wrapper = shallow(<Registration />);
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