import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';

export const CreatePost = ({ responseData, setLatestPostsFunc }) => {
  const [newPost, setPost] = useState({
    title: '',
    description: '',
    postAbbreviation: '',
  })
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

  useEffect(() => {
    isLoginFunc();
  }, [])


  const handleChange = (e) => {
    const {name,value} = e.target;

    if(name == 'title' && newPost.title.length > 59 && !(value.length < newPost.title.length)){
      return;
    }else if(name == 'description' && newPost.description.length > 2499 && !(value.length < newPost.description.length)){
      return;
    }else if(name == 'postAbbreviation' && newPost.postAbbreviation.length > 119 && !(value.length < newPost.postAbbreviation.length)){
      return;
    }

    setPost({
      ...newPost,
      [name]:value
      })
  }

  const checkboxChange = (e) => {
    setPost({
      ...newPost,
      'isPublic': e.target.checked
    })
  }

  const getLatestPosts = async () => {
     return await axios.get('http://localhost:8000/latestPosts').then((res) => {
        if(res){
          return setLatestPostsFunc(res.data)
        }
    })
  }
  
  const submitPost = async (e) => {
    e.preventDefault();

    const {title, description, postAbbreviation} = newPost;

    if(title && description && postAbbreviation){
      await axios.post('http://localhost:8000/newPost', newPost)
        .then((res) => {
          if(res){
            if(res.data.title == 'success'){
              getLatestPosts();

              return history('/');
            }
          }
        })
    } 
  }

  return(
    <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">
      <Navbar responseData={responseData} />
      <div className="p-10">
        <h1 className="text-5xl py-5">Created Post</h1>
        <form action="http://localhost:8000/newPost" method="POST">
          <div className="flex">
            <input type="text" placeholder="Enter your title [max 60]" name="title" value={newPost.title} onChange={handleChange} className="w-96 border-b-2 block mt-4 mb-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
            <label className="flex justify-center items-center">[{newPost.title.length}/60]</label>
          </div>
          <div className="flex">
            <textarea type="text" placeholder="Enter your description [max 2500]" name="description" value={newPost.description} onChange={handleChange} className="w-96 border-b-2 block mt-4 mb-6 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
            <label className="flex justify-center items-center">[{newPost.description.length}/2500]</label>
          </div>
          <div className="flex">
            <textarea type="text" placeholder="Enter your post abbreviation [max 120]" name="postAbbreviation" value={newPost.postAbbreviation} onChange={handleChange} className="w-96 border-b-2 block mt-4 mb-6 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
            <label className="flex justify-center items-center">[{newPost.postAbbreviation.length}/120]</label>
          </div>
          <div className="flex items-center mb-5">
            <p className="w-64">do you want to public this post</p>
            <input type="checkbox" onClick={checkboxChange}  name="authorPermissions" placeholder="Enter" />
          </div>
          <button type="submit" onClick={submitPost} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
        </form>
      </div>
    </div>
  )
}