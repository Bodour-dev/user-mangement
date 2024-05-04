import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UsersList from '../Component/UsersList';

// Mock the required dependencies
jest.mock('../Redux/ActionCreater', () => ({
  GetAllUsers: jest.fn(),
}));

jest.mock('../Component/TableComponent', () => () => <div>Table Component</div>);
jest.mock('../Component/DialogComponent', () => () => <div>Dialog Component</div>);

describe('UsersList', () => {
  const mockStore = configureStore();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the loading spinner when isLoading is true', () => {
    const initialState = { user: { isLoading: true } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the error message when errorMessage is present', () => {
    const initialState = { user: { errorMessage: 'An error occurred' } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('An error occurred');
  });

  it('should render the TableComponent and DialogComponent when data is loaded', async () => {
    const initialState = {
      user: {
        usersList: [{ id: 1, name: 'John Doe' }],
        userObj: { id: 2, name: 'Jane Smith' },
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Table Component')).toBeInTheDocument();
      expect(screen.getByText('Dialog Component')).toBeInTheDocument();
    });
  });

  it('should dispatch the GetAllUsers action when the component mounts', () => {
    const initialState = { user: {} };
    const store = mockStore(initialState);
    const { GetAllUsers } = require('../Redux/ActionCreater');

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    expect(GetAllUsers).toHaveBeenCalled();
  });
});