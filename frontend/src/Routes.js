import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import { Login } from './pages/Login';

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route 
          exact 
          path='/login' 
          element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}