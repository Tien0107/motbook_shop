import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProider';
import axios from 'axios';
import googleLogo from '../assets/google-logo.svg';

// const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/api';

const Login = () => {
  const { loginWithGoogle, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Attempt API login
      // eslint-disable-next-line no-undef
      const response = await axios.post(`http://localhost:3000/api/auth/login`, {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      navigate('/', { replace: true });// Redirect to home page
    } catch (apiError) {
      // Fallback to Firebase auth
      try {
        await login(email, password);
        navigate(from, { replace: true });
      } catch (authError) {
        setError(authError.message || apiError.response?.data?.message || 'Login failed');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Log in</h1>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">
                    {error.includes('incorrect') ? 'Email or Password is incorrect' : error}
                  </p>
                )}
                <p>
                  {`Don't have an account?`}
                  <Link to="/sign-up" className="text-blue-600 underline hover:text-black">
                    Sign Up
                  </Link>
                </p>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-black"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
            <hr />
            <div className="flex w-full items-center flex-col mt-5 gap-3">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <img src={googleLogo} alt="Google logo" className="w-8 h-8" />
                <span>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;