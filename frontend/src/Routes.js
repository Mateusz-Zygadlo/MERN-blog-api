import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import axios from 'axios';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { CreatePost  } from './pages/CreatePost';
import { AllPosts } from './pages/AllPosts';
import { MyPosts } from './pages/MyPosts';

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
  const responseDataFunc = (props) => {
    setResponseData(props);
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/' 
          element={<Home responseData={responseData} latestPosts={latestPosts} responseDataFunc={responseDataFunc} />}
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
          element={<Logout responseDataFunc={responseDataFunc} />}
        />
        <Route 
          exact
          path='/newPost'
          element={<CreatePost responseData={responseData} setLatestPostsFunc={setLatestPostsFunc} />}
        />
        <Route 
          exact
          path='/posts'
          element={<AllPosts responseData={responseData} />}
        />
        <Route 
          exact
          path='/myPosts'
          element={<MyPosts responseData={responseData} />}
        />
      </Routes>
    </BrowserRouter>
  )
}