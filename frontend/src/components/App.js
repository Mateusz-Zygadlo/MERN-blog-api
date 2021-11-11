import axios from 'axios';

axios.defaults.withCredentials = true;

export const App = () => {
  const createCookies = () => {
    axios.get('http://localhost:8000/').then((res) => {
      console.log(res.data);
    })
  }

  return(
    <>
      <div>MERN blog api</div>
      <div className="mt-10">
        <button className="px-2 py-1 border-2" onClick={createCookies}>Create cookie</button>
      </div>
    </>
  )
}