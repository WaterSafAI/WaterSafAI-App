import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Register from '../screens/Register';
import { useAuth } from "../services/AuthProvider";

// Mock the useAuth hook
jest.mock("../services/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

describe('Register Component', () => {
  const mockNavigation = { push: jest.fn() };
  const mockRegister = jest.fn();
  beforeEach(() => {
    // Setup mock implementation
    useAuth.mockImplementation(() => ({
      actions: {
        register: mockRegister,
      },
      loading: false,
    }));
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    expect(getByText('Create Account')).toBeTruthy();
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    const tree = render(<Register navigation={mockNavigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the register function with correct credentials on button press', () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const createButton = getByText('CREATE');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'john@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(createButton);

    expect(mockRegister).toHaveBeenCalledWith('John Doe', 'john@example.com', 'password123', 'personal');
  });

  // New Test for Plan Button Press
  it('changes plan state on pressing plan buttons', () => {
    const { getByText } = render(<Register />);
    const personalPlanButton = getByText('Personal');
    const professionalPlanButton = getByText('Professional');

    // Simulate pressing the professional plan button
    fireEvent.press(professionalPlanButton);

    // Check if the register function is called with the 'professional' plan
    const createButton = getByText('CREATE');
    fireEvent.press(createButton);
    expect(mockRegister).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(String), 'professional');
  });
});
