
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersList from './Component/UsersList';
import { Provider } from 'react-redux';
import userStore from './Redux/Store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={userStore}>
    <BrowserRouter>

      <Routes>
       <Route path='/' element={<UsersList />}></Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer position='top-right'></ToastContainer>
    </Provider>
  );
}

export default App;
