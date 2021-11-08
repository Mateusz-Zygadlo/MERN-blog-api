import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const url = 'http://localhost:8000/posts';
    const fetchPosts = async () => {
      const fetchData = await axios.get(url).then((response) => console.log(response.data));

      return fetchData;
    };

    fetchPosts();
  }, [])

  return(
    <div>
      {loading ? 
        <div>Loading</div>
      :
        <div>{result}</div>
      }
    </div>
  )
}

export default App;