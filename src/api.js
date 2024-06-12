import { io } from 'socket.io-client';

const API_URL = 'https://api.teacherop.com'; // Change to your backend URL

let socket;

const initializeSocket = (socketUrl, userId) => {
  if (socket) {
    socket.disconnect();
  }
  socket = io(socketUrl, {
    query: { userId },
  });
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Clear the socket instance after disconnecting
  }
};

export const signupOrLogin = async (data) => {
  const response = await fetch(`${API_URL}/auth/signup-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const createCourse = async (query, onQuestionReceived, onSummaryReceived) => {
  try {
    const response = await fetch(`${API_URL}/courses/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Unknown error occurred');
    }

    const { socketUrl, userId } = await response.json();
    initializeSocket(socketUrl, userId);

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
  } catch (error) {
    console.error('Error creating course:', error.message);
    throw error; // Rethrow or handle as needed
  }
};

export const answerQuestion = async (answer) => {
  if (socket) {
    socket.emit('answerQuestion', { answer });
  }
};