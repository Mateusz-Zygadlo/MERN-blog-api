import React, { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordTwo: ''
  })

  const handleChange = (e) => {
    const {name,value} = e.target

    setUser({
      ...user,
      [name]:value
      })
  }

  const createNewUser = async (e) => {
    e.preventDefault();

    const {email, password, passwordTwo} = user;

    if(password == passwordTwo && email){
      await axios.post('http://localhost:8000/register', user)
        .then((res) => console.log(res))
    }else{
      console.log('invalid input');
    }
  }

  return(
    <div className="p-20">
      <h1 className="text-5xl py-5">Register form</h1>
      <form action="http://localhost:8000/register" method="POST">
        <input name="email" value={user.email} onChange={(e)=>{handleChange(e)}} type="text" placeholder="Enter your email" className="w-64 border-b-2 block mt-4 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <input name="password" value={user.password} onChange={(e)=>{handleChange(e)}} type="password" placeholder="Enter your password" className="w-64 border-b-2 block mt-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <input name="passwordTwo" value={user.passwordTwo} onChange={(e)=>{handleChange(e)}} type="password" placeholder="Re-enter the password" className="w-64 border-b-2 block mt-2 mb-6 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <button type="submit" onClick={(e)=>{createNewUser(e)}} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
      </form>
      <div className="mt-3 w-64">
        <a href='/login' className="border-b-2 hover:border-gray-300 transition-colors focus:border-blue-300">If you have an account, please click here</a>
      </div>
    </div>
  )
}