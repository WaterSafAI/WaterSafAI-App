import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../screens/Login';

// Mock the useAuth hook
const mockLogin = jest.fn();
jest.mock("../services/AuthProvider", () => ({
  useAuth: () => ({
    actions: {
      login: mockLogin,
      // ... other actions
    },
    loading: false,
  }),
}));

describe('Login Component', () => {
  const mockNavigation = { push: jest.fn() };

  it('renders correctly', () => {
    const tree = render(<Login navigation={mockNavigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('allows entering email and password', () => {
    const { getByPlaceholderText } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    
    // Additional expectations can be added here if needed
  });

  it('navigates to Register screen on button press', () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);
    
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigation.push).toHaveBeenCalledWith("Register");
  });

  it('calls the forgot password function on button press', () => {
    const { getByText } = render(<Login navigation={mockNavigation} />);
    fireEvent.press(getByText('Forgot Password?'));
    // Expect some action to be called, like a console.log or navigation
  });

  it('calls the login function with correct credentials on button press', () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('LOG IN');

    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    fireEvent.changeText(emailInput, testEmail);
    fireEvent.changeText(passwordInput, testPassword);
    fireEvent.press(loginButton);

    // Expect the mockLogin function to have been called with correct credentials
    expect(mockLogin).toHaveBeenCalledWith(testEmail, testPassword);
  });
});
