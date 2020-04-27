import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme'
import Registration from './components/registration'
import Login from './components/login'
import ForgotPassword from './components/forgotPassword'
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('add',() => {
  expect(true).toBe(true)
})

test('Registration Tets',() => {
  
  const { getByText } = render(<Registration />);
  expect(getByText(/Submit/i)).toBeInTheDocument();
})

test('Login Tets',() => {
  const { getByText } = render(<Login />);
  expect(getByText(/login page/i)).toBeInTheDocument();
})

test('Forgot password Tets',() => {
  const { getByText } = render(<ForgotPassword />);
  expect(getByText(/Forgotpassword/i)).toBeInTheDocument();
})