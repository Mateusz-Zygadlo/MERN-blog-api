import React, { useEffect } from 'react';
import axios from 'axios';
import { Banner } from '../components/Banner';
import { LatestPosts } from '../components/LatestPosts';

export const Home = ({responseData, latestPosts, responseDataFunc, setLatestPostsFunc}) => {
  const setData = async () => {
    await axios.get('http://localhost:8000/')
      .then((res) => responseDataFunc(res.data))
  }
  const getLatestPosts = async () => {
    await axios.get('http://localhost:8000/latestPosts').then((res) => setLatestPostsFunc(res.data))
  } 

  useEffect(() => {
    setData();
    getLatestPosts();
  }, [])

  return(
    <>
      {responseData ?
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">
          <Banner responseData={responseData} />
          <LatestPosts latestPosts={latestPosts} />
        </div>
      : 
        <div>Loading</div>
      }
    </>
  )
}