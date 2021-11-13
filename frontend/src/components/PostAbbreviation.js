export const PostAbbreviation = ({ title, postAbbreviation, author, date }) => {
  return(
    <div className='p-2 border-2 hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-between'>
      <h1 className='text-3xl break-words pb-2 border-b-2'>{title}</h1>
      <p className='text-md break-words h-full'>{postAbbreviation}</p>
      <div className='flex justify-between px-10 mt-3 border-t-2'>
        <h2>{author}</h2>
        <h2>{date}</h2>
      </div>
    </div>
  )
}