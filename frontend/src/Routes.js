import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import axios from 'axios';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { CreatedPost  } from './pages/CreatedPost';

axios.defaults.withCredentials = true;

export const Router = () => {
  const [responseData, setResponseData] = useState(null);
  const [latestPosts, setLatestPosts] = useState(null);

  useEffect(() => {
    if(document.cookies){
      return;
    }
    const getUser = async () => {
      await axios.get('http://localhost:8000/').then((res) => setResponseData(res.data))
      await axios.get('http://localhost:8000/latestPosts').then((res) => setLatestPosts(res.data))
    } 
    return getUser();
  }, [])

  const setLatestPostsFunc = (props) => {
    setLatestPosts(props);
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/' 
          element={<Home responseData={responseData} latestPosts={latestPosts} />}
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
        <Route 
          exact
          path='/newPost'
          element={<CreatedPost responseData={responseData} setLatestPostsFunc={setLatestPostsFunc} />}
        />
      </Routes>
    </BrowserRouter>
  )
}