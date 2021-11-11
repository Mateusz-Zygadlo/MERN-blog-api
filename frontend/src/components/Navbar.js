import { Link } from "react-router-dom";

export const Navbar = ({ responseData }) => {
  return(
    <div className="w-full h-20 border-b-2 flex justify-between items-center">
      <h1 className="text-4xl">Blog name</h1>
      <ul className="flex pt-3">
        {responseData.isAdmin || responseData.author ? 
          <>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to='/posts' className="">All posts</Link></li>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to="/">My posts</Link></li>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to="/logout">Logout</Link></li>
          </>
        :  
          <>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to="/posts">All posts</Link></li>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to="/login">Login</Link></li>
            <li className="mr-3 text-xl border-b-2 hover:border-gray-300 focus:border-blue-300 transition-colors"><Link to="/register">Register</Link></li>
          </>
        }
      </ul>
    </div> 
  )
}