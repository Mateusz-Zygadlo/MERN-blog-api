import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LatestPosts } from '../components/LatestPosts';

export const AllPosts = ({ responseData }) => {
  const [posts, setPosts] = useState(null);

  const allPostsFunc = async () => {
    if( responseData && !responseData.error && responseData.user && responseData.user.isAdmin){
      return await axios.get('http://localhost:8000/allPosts')
        .then((res) => setPosts(res.data))
    }

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
          <LatestPosts latestPosts={posts} allPosts='true' responseData={responseData} allPostsFunc={allPostsFunc} />
        </div>
      }
    </>
  )
};