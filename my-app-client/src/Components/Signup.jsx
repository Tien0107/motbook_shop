import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProider';
import axios from 'axios';
import googleLogo from '../assets/google-logo.svg';

const SignUp = () => {
  const { loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        name,
        email,
        password,
      });

      if (response.status !== 201 && response.status !== 200) {
        throw new Error('Registration failed');
      }

      // Optional: store token if server returns it
      // localStorage.setItem('token', response.data.token);

      // Navigate to login after successful signup
      navigate('/login');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/'); // Or navigate somewhere else after Google sign-up
    } catch (error) {
      setError(error.message || 'Google sign-up failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <form
              onSubmit={handleSubmit}
              className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div className="relative">
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
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
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-green-600"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <p>
                Already have an account?
                <Link to="/login" className="text-green-600 underline hover:text-black ml-1">
                  Log in
                </Link>
              </p>
              <div className="relative">
                <button
                  type="submit"
                  className="bg-green-500 text-white rounded-md px-6 py-2 hover:bg-black"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <hr />
            <div className="flex w-full items-center flex-col mt-5 gap-3">
              <button
                onClick={handleGoogleSignup}
                className="flex items-center gap-2 text-gray-700 hover:text-green-600"
              >
                <img src={googleLogo} alt="Google logo" className="w-8 h-8" />
                <span>Sign up with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
