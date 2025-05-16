import { Link } from 'react-router-dom'
import googleLogo from "../../assets/google-logo.svg"
import LoginForm from '../../features/auth/components/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Log in Form</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8">
                <LoginForm />
                <p className="mt-4">{`If you don't have an account. Please`} <Link to="/sign-up" className='text-blue-600 underline hover:text-black'>SignUp</Link> here</p>
              </div>
            </div>

            <hr />
            <div className='flex w-full items-center flex-col mt-5 gap-3'>
              <button className='flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors'>
                <img src={googleLogo} alt="" className='w-6 h-6'/>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage