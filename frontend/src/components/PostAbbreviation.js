export const PostAbbreviation = () => {
  return(
    <div className='h-auto p-2 border-2 hover:border-gray-300 transition-colors cursor-pointer'>
      <h1 className='text-3xl break-words pb-2 border-b-2'>Post One</h1>
      <p className='text-md break-words'>Short descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort descriptionShort description</p>
      <div className='flex justify-between px-10 mt-3 border-t-2'>
        <h2>Author</h2>
        <h2>Date</h2>
      </div>
    </div>
  )
}