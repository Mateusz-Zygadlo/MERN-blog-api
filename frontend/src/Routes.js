import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
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
        </Routes>
    </BrowserRouter>
  )
}