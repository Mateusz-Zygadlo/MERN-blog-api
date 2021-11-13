import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const Logout = ({ responseDataFunc }) => {
  const [responseData, setResponseData] = useState(null);
  const history = useNavigate();

  const getUser = async () => {
    await axios.get('http://localhost:8000/logout').then((res) => {
      setResponseData(res.data);

      if(responseData){
        responseDataFunc(responseData);

        return history('/');
      }
    })
  }

  useEffect(() => {
    getUser();
  })

  return(
    <div className="p-40">
      <h1 className="text-4xl">Logout</h1>
    </div>
  )
}