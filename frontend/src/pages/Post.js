import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AddComment } from '../components/AddComment';
import { Comments } from '../components/Comments';

export const Post = ({ responseData }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();

  const getPost = async () => {
    await axios.get(`http://localhost:8000/post/${id}`)
      .then((res) => setPost(res.data))
  }
  const getComments = async () => {
    await axios.get(`http://localhost:8000/comments/${id}`)
      .then((res) => setComments(res.data))
  }

  useEffect(() => {
    getPost();
    getComments();
  }, [])


  return(
    <>
      {post && post.result ? 
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto mt-10">
          <h1 className="text-5xl">{post.result.title}</h1>
          <p>{post.result.date}</p>
          <h2 className="text-2xl mt-3">{post.result.authorEmail}</h2>
          <p className="mt-3">{post.result.description}</p>
          <h2 className="mt-3 text-2xl">post abbreviation</h2>
          <p className="mt-3">{post.result.postAbbreviation}</p>
          {responseData && !responseData.error && responseData.user ?
            <AddComment id={id} getComments={getComments} />
          :
            null
          }
          {comments && comments.comments ? 
            <Comments comments={comments} />
          :
            <div className="text-3xl mt-5">Comments [0]</div>
          }
        </div>
      : 
        <div>Loading</div>
      }
    </>
  )
}