import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock ,User} from 'lucide-react'; // icon library

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]= useState('')
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post('/auth/login', { email, password });
        login(res.data);
        const role = res.data.user.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'owner') navigate('/owner');
        else navigate('/user');
        } catch (err) {
        alert(err.response?.data?.message || 'Login failed');
    }
    };

    return (
    <div className="min-h-screen bg-gradient-to-tr from-[#667eea] to-[#764ba2] flex items-center justify-center p-6">
        <div className="flex w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-10">
            <h1 className="text-4xl font-extrabold mb-4">StoreRating.io</h1>
            <p className="text-lg font-light text-center">
            Rate your favorite stores and see what others are saying! Join the community.
            </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <Mail className="text-white mr-2" />
                <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <Lock className="text-white mr-2" />
                <input
                type="password"
                placeholder="Password"
                className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <User  className="text-white mr-2"/>
                <input
                type="role"
                placeholder="Role"
                className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition duration-300"
            >
                Sign In
            </button>
            </form>

            <p className="mt-6 text-center text-sm text-white">
            Don’t have an account?
            <span className="ml-1 underline font-semibold cursor-pointer text-indigo-200 hover:text-indigo-100" onClick={() => navigate('/register')}>
                Register
            </span>
            </p>  
            </div>
        </div>
        </div>
    );
};

export default Login;
