import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const url = 'http://localhost:8000/posts';
    const fetchPosts = async () => {
      const fetchData = await axios.get(url).then((response) => console.log(response.data));

      return fetchData;
    };

    fetchPosts();
  }, [])

  return(
    <div>MERN blog api</div>
  )
}

export default App;