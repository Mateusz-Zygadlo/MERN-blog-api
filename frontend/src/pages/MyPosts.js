import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LatestPosts } from '../components/LatestPosts';

export const MyPosts = () => {
  const [posts, setPosts] = useState(null);
  const history = useNavigate();

  const isLoginFunc = async () => {
    await axios.get('http://localhost:8000/')
      .then((res) => {
        if(res.data){
          if(res.data.error || !res.data.user.author){
            return history('/');
          }
        }
      })
  }

  const setData = async () => {
    await axios.get('http://localhost:8000/myPosts')
      .then((res) => setPosts(res.data))
  }
  
  useEffect(() => {
    isLoginFunc();
    setData();
  }, [])
  
  return(
    <>
      {!posts ?
        <div>Loading</div>
      :
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">
          <LatestPosts latestPosts={posts} allPosts="true" myPosts="true" deleteButton="true" setData={setData} />
        </div>
      }
    </>
  )
}