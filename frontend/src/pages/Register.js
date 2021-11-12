import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordTwo: '',
    authorPermissions: false,
  })
  const [responseData, setResponseData] = useState(null);
  const [isLogin, setLogin] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await axios.get('http://localhost:8000/').then((res) => setLogin(res.data))
    }
    getUser();

    if(isLogin){
      if(isLogin.user){
        return history('/');
      }
    }
  })

  useEffect(() => {
    if(responseData !== null){
      if(responseData.data.title == "success created account"){
        return history('/login');
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

  const checkboxChange = (e) => {
    setUser({
      ...user,
      'authorPermissions': e.target.checked
    })
  }

  const createNewUser = async (e) => {
    e.preventDefault();
    
    const {email, password, passwordTwo} = user;

    if(password == passwordTwo && email){
      await axios.post('http://localhost:8000/register', user)
        .then((res) => setResponseData(res))
    }
  }

  return(
    <>
      {responseData ? 
        <div className="flex justify-center">{responseData.data.title || responseData.data.err}</div> 
      : null }
      <div className="p-20">
        <h1 className="text-5xl py-5">Register form</h1>
        <form action="http://localhost:8000/register" method="POST">
          <input name="email" value={user.email} onChange={handleChange} type="text" placeholder="Enter your email" className="w-64 border-b-2 block mt-4 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
          <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="Enter your password" className="w-64 border-b-2 block mt-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
          <input name="passwordTwo" value={user.passwordTwo} onChange={handleChange} type="password" placeholder="Re-enter the password" className="w-64 border-b-2 block mt-2 mb-3 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" required />
          <div className="flex items-center mb-5">
            <p className="w-64">do you want to create an account for the author</p>
            <input type="checkbox" onClick={checkboxChange}  name="authorPermissions" placeholder="Enter" />
          </div>
          <button type="submit" onClick={createNewUser} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
        </form>
        <div className="mt-3 w-64">
          <a href='/login' className="border-b-2 hover:border-gray-300 transition-colors focus:border-blue-300">If you have an account, please click here</a>
        </div>
      </div>
    </>
  )
}