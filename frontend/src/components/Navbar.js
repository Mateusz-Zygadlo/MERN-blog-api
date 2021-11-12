import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const Navbar = ({ responseData }) => {
  const [close, setClose] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(1000);

  useEffect(() => {
    const resizeFunc = () => {
        if(window.innerWidth){
          setMobileWidth(window.innerWidth);
        }
    }

    window.addEventListener('resize', resizeFunc);

    return () => {
        window.removeEventListener('resize', resizeFunc);
    }
  });


  return(
    <div className="w-full h-20 border-b-2 flex justify-between items-center">
      <Link to='/'><h1 className="text-4xl">Blog name</h1></Link>
        {!(mobileWidth < 870) ? 
          <ul className="flex pt-3">
            {responseData.user ? 
              <>
                <li className="navLink"><Link to='/posts'>All posts</Link></li>
                <li className="navLink"><Link to="/">My posts</Link></li>
                <li className="navLink"><Link to="/">Created post</Link></li>
                <li className="navLink"><Link to="/logout">Logout</Link></li>
              </>
            : 
              <>
                <li className="navLink"><Link to="/posts">All posts</Link></li>
                <li className="navLink"><Link to="/login">Login</Link></li>
                <li className="navLink"><Link to="/register">Register</Link></li>
              </>
            }
            
          </ul>  
        : 
          <>
            {!close ? 
              <span className="material-icons mr-5 mt-2 cursor-pointer" onClick={()=>{setClose(true)}}>
                menu
              </span>
            : 
              <div className="fixed top-0 right-0 w-96 h-screen bg-blue-300">
                <span className="material-icons w-full p-5 cursor-pointer flex justify-end" onClick={()=>{setClose(false)}}>
                  close
                </span>
                <ul className="pt-3 flex justify-center flex-col">
                  {responseData.user ? 
                    <>
                      <li className="mobileNavLink"><Link to='/posts'>All posts</Link></li>
                      <li className="mobileNavLink"><Link to="/">My posts</Link></li>
                      <li className="mobileNavLink"><Link to="/">Created post</Link></li>
                      <li className="mobileNavLink"><Link to="/logout">Logout</Link></li>
                    </>
                  : 
                    <>
                      <li className="mobileNavLink"><Link to="/posts">All posts</Link></li>
                      <li className="mobileNavLink"><Link to="/login">Login</Link></li>
                      <li className="mobileNavLink"><Link to="/register">Register</Link></li>
                    </>
                  }
                  
                </ul>  
              </div>
            }
          </>
        }
    </div> 
  )
}