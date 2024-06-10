// src/pages/LoginPage.js
import React, { useState } from 'react';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import  googleIcon  from '../assets/icons/googlecolor.svg';
import githubIcon from '../assets/icons/githubcolor.svg';
import { login } from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (idToken) => {
    try {
      const data = await login(idToken);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await handleLogin(idToken);
    } catch (error) {
      console.error('Google login error:', error);
      setError('Failed to login with Google. Please try again.');
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await handleLogin(idToken);
    } catch (error) {
      console.error('GitHub login error:', error);
      setError('Failed to login with GitHub. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await result.user.getIdToken();
      await handleLogin(idToken);
    } catch (error) {
      console.error('Email login error:', error);
      setError('Failed to login with email. Please try again.');
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
          <form onSubmit={handleEmailLogin}>
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
              Continue
            </button>
          </form>
          <div className="mt-4">
            <a href="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="mt-8 text-center">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-accent underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
