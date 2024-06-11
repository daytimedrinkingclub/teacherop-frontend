import { io } from 'socket.io-client';

const API_URL = 'https://api.teacherop.com'; // Change to your backend URL

let socket;

const initializeSocket = (socketUrl = API_URL) => {
  if (socket) {
    socket.disconnect();
  }
  socket = io(socketUrl);
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Clear the socket instance after disconnecting
  }
};

export const signup = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const signupWithOAuth = async (idToken, provider) => {
  const response = await fetch(`${API_URL}/auth/signup-oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken, provider }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const login = async (idToken) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const createCourse = async (query, onQuestionReceived, onSummaryReceived) => {
  const response = await fetch(`${API_URL}/courses/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const { socketUrl } = await response.json();
  initializeSocket(socketUrl);

  socket.on('questionReceived', (data) => {
    onQuestionReceived(data);
  });

  socket.on('summaryReceived', (data) => {
    onSummaryReceived(data);
    disconnectSocket();
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
    disconnectSocket();
  });
};

export const answerQuestion = async (answer) => {
  if (socket) {
    socket.emit('answerQuestion', { answer });
  }
};
