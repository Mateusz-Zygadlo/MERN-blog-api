import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PostAbbreviation = ({ title, isPublic, postAbbreviation, author, date, responseData, id, allPostsFunc, deleteButton, setData }) => { 
  const history = useNavigate(); 
  const deletePost = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:8000/deletePost/${id}`, e.target.name)
      .then((res) => {
         if(res){
          if(setData){
            return setData();
          }

          return allPostsFunc();
        }
    })
  }
  const viewPost = () => {
    return history(`/post/${id}`)
  }

  return(
    <div className='p-2 border-2 hover:border-gray-300 transition-colors flex flex-col justify-between'>
      <h1 onClick={viewPost} className='text-3xl break-words hover:border-gray-300 cursor-pointer pb-2 border-b-2'>{title}</h1>
      <p className='text-md break-words h-full'>{postAbbreviation}</p>
      <div className='flex justify-between px-10 mt-3 border-t-2'>
        <h2>{author}</h2>
        <h2>{date}</h2>
      </div>
      { (responseData && !responseData.error && responseData.user && responseData.user.isAdmin) ? 
        <form method="POST" action={`http://localhost:8000/deletePost/${id}`} className="flex justify-between px-5 mt-5">
          <button onClick={deletePost} type="submit" name="deleteButton" value={id} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Delete</button>
        </form>
      : deleteButton ? 
        <form method="POST" action={`http://localhost:8000/deletePost/${id}`} className="flex justify-between px-5 mt-5">
          <button onClick={deletePost} type="submit" name="deleteButton" value={id} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Delete</button>
          <button onClick={deletePost} type="submit" name="isPublicTest" value={id} className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">{isPublic ? 'Unpublish' : 'Publish'}</button>
        </form>
      :
        null
      }
    </div>
  )
}