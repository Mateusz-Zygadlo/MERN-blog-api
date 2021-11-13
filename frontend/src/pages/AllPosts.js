import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { LatestPosts } from '../components/LatestPosts';

export const AllPosts = ({ responseData }) => {
  const [posts, setPosts] = useState(null);

  const allPostsFunc = async () => {
    await axios.get('http://localhost:8000/posts')
      .then((res) => setPosts(res.data))
  }

  useEffect(() => {
    allPostsFunc();
  }, [])

  return(
    <>
      {!posts ?
        <div>Loading</div>
      :
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">  
          <Navbar responseData={responseData} />
          <LatestPosts latestPosts={posts} allPosts='true' />
        </div>
      }
    </>
  )
};