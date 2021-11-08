export const Register = () => {
  return(
    <div className="p-20">
      <h1 className="text-5xl py-5">Register form</h1>
      <form action="/register" method="post">
        <input type="text" placeholder="Enter your email" name="email" class="w-64 border-b-2 block mt-4 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <input type="password" placeholder="Enter your password" name="password" class="w-64 border-b-2 block mt-2 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <input type="password" placeholder="Re-enter the password" name="passwordTwo" class="w-64 border-b-2 block mt-2 mb-6 outline-none focus:border-blue-300 hover:border-gray-300 cursor-pointer transition-colors" />
        <button type="submit" className="px-5 py-1 border-2 hover:border-gray-300 transition-colors focus:border-blue-300">Submit</button>
      </form>
      <div className="mt-3 w-64">
        <a href='/login' className="border-b-2 hover:border-gray-300 transition-colors focus:border-blue-300">If you have an account, please click here</a>
      </div>
    </div>
  )
}