import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Banner } from '../components/Banner';

axios.defaults.withCredentials = true;

export const Home = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if(document.cookies){
      return;
    }
    const getUser = async () => {
      await axios.get('http://localhost:8000/').then((res) => setResponseData(res.data))
    } 
    return getUser();
  }, [])

  return(
    <>
      {responseData ?
        <div className="w-11/12 mx-auto max-w-screen-2">
          <Navbar responseData={responseData.user} />
          <Banner />
        </div>
      : 
        <div>Loading</div>
      }
    </>
  )
}