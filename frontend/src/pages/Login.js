import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [responseData, setResponseData] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    if(responseData !== null){
      if(responseData.data.title == "success"){
        return history('/');
      }
    }
  }, [responseData])

  const handleChange = (e) => {
    const {name,value} = e.target

    setUser({
      ...user,
      [name]:value
      })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    
    const {email, password} = user;

    if(password && email){
      await axios.post('http://localhost:8000/login', user)
        .then((res) => setResponseData(res))
    }

    setUser({
      email: '',
      password: '',
    })
  }

  return(
    <>
      {responseData ? 
        <div className="flex justify-center">{responseData.data.title || responseData.data.err}</div> 
      : null }
      <div className="p-20">
        <h1 className="text-5xl py-5">Login form</h1>
        <form action="http://localhost:8000/login" method="POST">
          <input type="text" value={user.email} onChange={handleChange} placeholder="Enter your email" name="email" className="w-64 border-b-2 block mt-4 mb-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
          <input type="password" value={user.password} onChange={handleChange} placeholder="Enter your password" name="password" className="w-64 border-b-2 block mt-4 mb-6 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
          <button type="submit" onClick={loginUser} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
        </form>
        <div className="mt-3 w-64">
          <a href='/register' className="border-b-2 hover:border-gray-300 transition-colors focus:border-blue-300">If you do not have an account, click here</a>
        </div>
      </div>
    </>
  )
}