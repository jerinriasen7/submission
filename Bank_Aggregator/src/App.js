import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import ManageUsers from './pages/ManageUsers';
import ManageBanks from './pages/ManageBanks';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children, role }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (role && !user.roles.includes(role)) return <Navigate to="/" />;
    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
                    <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
                    <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                    <Route path="/manage-users" element={<ProtectedRoute role="Admin"><ManageUsers /></ProtectedRoute>} />
                    <Route path="/manage-banks" element={<ProtectedRoute role="Admin"><ManageBanks /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}
