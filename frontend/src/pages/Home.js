import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Banner } from '../components/Banner';
import { LatestPosts } from '../components/LatestPosts';

export const Home = ({responseData, latestPosts, responseDataFunc}) => {

  const setData = async () => {
    await axios.get('http://localhost:8000/')
      .then((res) => responseDataFunc(res.data))
  }

  useEffect(() => {
    setData();
  })

  return(
    <>
      {responseData ?
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">
          <Navbar responseData={responseData} />
          <Banner responseData={responseData} />
          <LatestPosts latestPosts={latestPosts} />
        </div>
      : 
        <div>Loading</div>
      }
    </>
  )
}