import { Navbar } from '../components/Navbar';
import { Banner } from '../components/Banner';
import { LatestPosts } from '../components/LatestPosts';

export const Home = ({responseData, latestPosts}) => {

  return(
    <>
      {responseData ?
        <div className="w-11/12 mx-auto max-w-screen-2xl 2xl:mx-auto">
          <Navbar responseData={responseData} />
          <Banner responseData={responseData} />
          <LatestPosts latestPosts={latestPosts} />
        </div>
      : 
        <div>Loading</div>
      }
    </>
  )
}