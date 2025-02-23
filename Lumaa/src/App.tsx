// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/authh/Login';
import { Register } from './components/authh/Register';
import { TaskList } from './components/tasks/TaskList';
import { CreateTask } from './components/tasks/CreateTask';
import { Navigation } from './components/Navigation';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <>
                    <CreateTask />
                    <TaskList />
                  </>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/tasks" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App