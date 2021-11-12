import { PostAbbreviation } from './PostAbbreviation';

export const LatestPosts = () => {
  return(
    <>
      <h1 className="my-10 border-t-2 text-4xl">Latest post [6]</h1>
      <div className="grid grid-cols-1 gap-4 grid-rows-6 xl w-full h-auto md:grid-cols-2 md:grid-rows-3 mb-10 lg:grid-cols-3 lg:grid-rows-2">
        <PostAbbreviation />
        <PostAbbreviation />
        <PostAbbreviation />
        <PostAbbreviation />
        <PostAbbreviation />
        <PostAbbreviation />
      </div>
    </>
  )
}