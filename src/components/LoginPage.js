import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/icons/googlecolor.svg';
import githubIcon from '../assets/icons/githubcolor.svg';
import { useAuth } from '../internalAuth'; // This import is correct as per the provided context from internalAuth.js

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [ signup, login, oauthLogin ] = useAuth(); // These function names are correctly imported from useAuth as per internalAuth.js

  const handleOAuthLogin = async (provider) => {
    try {
      await oauthLogin(provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('OAuth login error:', error);
      setError('Failed to login with OAuth provider. Please try again.');
    }
  };

  const handleGoogleLogin = () => handleOAuthLogin('google');
  const handleGitHubLogin = () => handleOAuthLogin('github');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(`${isSignup ? 'Signup' : 'Login'} error:`, error);
      setError(`Failed to ${isSignup ? 'signup' : 'login'}. Please try again.`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-primary">
            TeacherOP
          </h1>
          {error && <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">{error}</div>}
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-4 flex items-center justify-center"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Login with Google
          </button>
          <button
            onClick={handleGitHubLogin}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-6 flex items-center justify-center"
          >
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 mr-2" />
            Login with GitHub
          </button>
          <div className="text-center mb-6">OR</div>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:border-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded focus:outline-none focus:border-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded hover:bg-primary-light w-full mb-4"
            >
              {isSignup ? 'Signup' : 'Login'}
            </button>
          </form>
          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-accent hover:underline"
            >
              {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Signup'}
            </button>
          </div>
          <div className="mt-4">
            <a href="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;