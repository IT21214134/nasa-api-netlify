import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux'; // Import Provider
import store from '../slice/store'; // Import your Redux store

// Import the component to test
import Login from '../pages/Login';

// Mocking Firebase auth methods
jest.mock('../firebase/config.js', () => ({
    auth: {
      onAuthStateChanged: jest.fn(), // Mock onAuthStateChanged
    },
  }));

describe('Login component', () => {
    test('renders login form', () => {
        const { getByText, getByPlaceholderText } = render(
          <Provider store={store}> {/* Provide the Redux store */}
            <Login />
          </Provider>
        );
    
    // Check if the login form elements are rendered
    expect(getByText('Welcome to the NASA App')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Signup')).toBeInTheDocument();
  });

  test('allows user to login with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(
        <Provider store={store}> {/* Provide the Redux store */}
          <Login />
        </Provider>
      );

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Enter your password'), { target: { value: 'testpassword' } });

    // Trigger login action
    fireEvent.click(getByText('Login'));

    // You may need to wait for async actions to complete
    await waitFor(() => {
      // Check if the user is logged in after successful login
      expect(getByText('Logout')).toBeInTheDocument(); // Assuming there's a logout button displayed after login
    });
  });

  
});
