// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import  googleIcon  from '../assets/icons/googlecolor.svg';
import githubIcon from '../assets/icons/githubcolor.svg';
import { signup, signupWithOAuth } from '../api';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(email, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Failed to create an account. Please try again.');
    }
  };

  const handleOAuthSignUp = async (provider, providerName) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const data = await signupWithOAuth(idToken, providerName);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('OAuth sign up error:', error);
      setError('Failed to sign up with OAuth provider. Please try again.');
    }
  };

  const handleGoogleSignUp = () => handleOAuthSignUp(new GoogleAuthProvider(), 'google');
  const handleGitHubSignUp = () => handleOAuthSignUp(new GithubAuthProvider(), 'github');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-primary">
          TeacherOP
        </h1>
          {error && <div className="bg-red-200 text-red-800 px-4 py-2 rounded mb-4">{error}</div>}
          <button
            onClick={handleGoogleSignUp}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-4 flex items-center justify-center"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Sign up with Google
          </button>
          <button
            onClick={handleGitHubSignUp}
            className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 w-full mb-6 flex items-center justify-center"
          >
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 mr-2" />
            Sign up with GitHub
          </button>
          <div className="text-center mb-6">OR</div>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-accent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {password && (
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-accent"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded hover:bg-primary-light w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-8 text-center">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-accent underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
