import { PostAbbreviation } from './PostAbbreviation';

export const LatestPosts = ({latestPosts, allPosts, myPosts}) => {
  return(
    <>
      {latestPosts && latestPosts.posts.length > 0 ?
        <>
          {myPosts ? 
            <div className="flex justify-between items-center">
              <h1 className={`my-10 text-4xl`}>My posts [{latestPosts.posts.length}]</h1>
            </div>
          :
            <h1 className={`my-10 ${allPosts ? null : 'border-t-2'} text-4xl`}>{allPosts ? 'All posts' : 'Latest post'} [{latestPosts.posts.length}]</h1>
          }
          <div className="grid grid-cols-1 gap-4 grid-rows-6 xl w-full h-auto md:grid-cols-2 md:grid-rows-3 mb-10 lg:grid-cols-3 lg:grid-rows-2">
            {latestPosts && latestPosts.posts.map((item) => (
              <PostAbbreviation
                key={item.title}
                title={item.title}
                postAbbreviation={item.postAbbreviation}
                author={item.authorEmail}
                date={item.date}
              />
            ))}
          </div>
        </>
      :
        <>
          <h1 className="my-10 border-t-2 text-4xl">{allPosts ? 'All posts' : 'Latest post'} [0]</h1>
          <div className="text-2xl">No posts</div>
        </>
      }
    </>
  )
}