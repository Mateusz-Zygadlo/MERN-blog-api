import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/' 
          element={<Home />}
        />
        <Route 
          exact 
          path='/login' 
          element={<Login />}
        />
        <Route
          exact 
          path='/register'
          element={<Register />}
        />
        <Route 
          exact
          path='/logout'
          element={<Logout />}
        />
      </Routes>
    </BrowserRouter>
  )
}