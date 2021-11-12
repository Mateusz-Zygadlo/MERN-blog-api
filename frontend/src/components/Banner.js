export const Banner = ({ responseData }) => {
  return(
    <>
      {responseData.user ? 
        <div className="w-full h-56 bg-blue-300 flex justify-center items-center mt-5 text-center break-words">
          <h1 className="text-4xl">Welcome [{responseData.user.email}] to platform for bloggers and readers</h1>
        </div>
      :
        <div className="w-full h-56 bg-blue-300 flex justify-center items-center mt-5 text-center break-words">
          <h1 className="text-4xl">Welcome to platform for bloggers and readers</h1>
        </div>
      }
    </>
  )
}