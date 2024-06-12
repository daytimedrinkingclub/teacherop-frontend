import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/icons/googlecolor.svg';
import githubIcon from '../assets/icons/githubcolor.svg';
import { useAuth } from '../auth-provider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signupOrLogin } = useAuth();

  const handleOAuthSignupOrLogin = async (provider) => {
    try {
      await signupOrLogin({ provider });
      navigate('/dashboard');
    } catch (error) {
      console.error('OAuth signup/login error:', error);
      setError('Failed to signup/login with OAuth provider. Please try again.');
    }
  };

  const handleGoogleSignupOrLogin = () => handleOAuthSignupOrLogin('google');
  const handleGitHubSignupOrLogin = () => handleOAuthSignupOrLogin('github');

  const handleEmailSignupOrLogin = async (e) => {
    e.preventDefault();
    try {
      await signupOrLogin({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Email signup/login error:', error);
      setError('Failed to signup/login with email. Please try again.');
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
            onClick={handleGoogleSignupOrLogin}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-4 flex items-center justify-center"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Signup/Login with Google
          </button>
          <button
            onClick={handleGitHubSignupOrLogin}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-6 flex items-center justify-center"
          >
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 mr-2" />
            Signup/Login with GitHub
          </button>
          <div className="text-center mb-6">OR</div>
          <form onSubmit={handleEmailSignupOrLogin}>
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
              className="bg-accent text-white px-4 py-2 rounded hover:bg-primary-light w-full"
            >
              Signup/Login
            </button>
          </form>
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