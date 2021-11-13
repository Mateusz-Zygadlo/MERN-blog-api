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
      <Link to='/'><h1 className="text-4xl">Platform name</h1></Link>
        {!(mobileWidth < 870) ? 
          <ul className="flex pt-3">
            {responseData && responseData.user && (responseData.user.isAdmin || responseData.user.author) ? 
              <>
                <li className="navLink"><Link to='/posts'>All posts</Link></li>
                <li className="navLink"><Link to="/">My posts</Link></li>
                <li className="navLink"><Link to="/newPost">Create post</Link></li>
                <li className="navLink"><Link to="/logout">Logout</Link></li>
              </>
            : responseData && responseData.user && responseData.user ? 
                <>
                  <li className="navLink"><Link to='/posts'>All posts</Link></li>
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
              <>
                <div className="fixed w-full h-full top-0 left-0 z-10 backdrop-filter backdrop-blur-sm"></div>
                <div className="fixed top-0 right-0 w-96 h-screen flex z-20 backdrop-filter backdrop-blur-lg border-l-2 border-black">
                    <span className="material-icons cursor-pointer absolute top-8 right-12" onClick={()=>{setClose(false)}}>
                      close
                    </span>
                    <ul className="pt-3 flex flex-col mt-20 mx-auto">
                      {responseData.user && (responseData.user.isAdmin || responseData.user.author) ? 
                        <>
                          <li className="mobileNavLink"><Link to='/posts'>All posts</Link></li>
                          <li className="mobileNavLink"><Link to="/">My posts</Link></li>
                          <li className="mobileNavLink"><Link to="/newPost">Create post</Link></li>
                          <li className="mobileNavLink"><Link to="/logout">Logout</Link></li>
                        </>
                      : responseData.user && responseData.user ? 
                          <>
                            <li className="mobileNavLink"><Link to='/posts'>All posts</Link></li>
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
              </>
            }
          </>
        }
    </div> 
  )
}