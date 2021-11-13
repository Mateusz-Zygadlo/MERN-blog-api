import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddComment = ({ id, getComments }) => {
  const [comment, setComment] = useState({
    commentContent: '',
    id: id,
  });

  const handleChange = (e) => {
    const {name,value} = e.target

    setComment({
      ...comment,
      [name]:value
    })
  }

  const sendComment = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8000/addComment', comment)
      .then((res) => {
        if(res && res.data && res.data.title == 'success'){
          getComments();
          
          setComment({
            commentContent: '',
            id: id,
          });
        }
      })
  }

  return(
    <div className="mt-5">
     <h1 className="text-4xl">Add Comment</h1>
     <form action="http://localhost:8000/addComment" method="POST" className="flex items-center">
        <input type="text" placeholder="Enter your content" name="commentContent" onChange={handleChange} value={comment.commentContent} className="w-64 border-b-2 block mt-4 mb-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
        <button type="submit" onClick={sendComment} className="w-20 h-8 border-2 ml-5 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
      </form>
    </div>
  )
}