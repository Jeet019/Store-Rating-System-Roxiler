    import React, { useState } from 'react';
    import api from '../utils/api';
    import { useNavigate } from 'react-router-dom';
    import { Mail, Lock, User, MapPin } from 'lucide-react';

    const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // await api.post('/auth/register', { ...form });
        await api.post('/auth/signup', { ...form });

        alert('Registration successful! You can now login.');
        navigate('/login');
        // } catch (err) {
        // alert(err.response?.data?.message || 'Registration failed');
         } 
        catch (err) {
            if (err.response?.status === 409) {
              alert("This email is already registered.");
            } else {
              alert(err.response?.data?.msg || "Registration failed");
            }
          }
          
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#6a11cb] to-[#2575fc] flex items-center justify-center p-6">
        <div className="flex w-full max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Left Panel */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-10">
            <h1 className="text-4xl font-extrabold mb-4">Join StoreRating.io 🚀</h1>
            <p className="text-lg font-light text-center">
                Submit ratings, explore top stores, and manage your account in one place!
            </p>
            </div>

            {/* Right Panel */}
            <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-semibold text-center text-white mb-6">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <User className="text-white mr-2" />
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={5}
                />
                </div>

                <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <Mail className="text-white mr-2" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <MapPin className="text-white mr-2" />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="flex items-center bg-white bg-opacity-30 rounded-xl px-4 py-2">
                <Lock className="text-white mr-2" />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-transparent w-full text-white placeholder-white focus:outline-none"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                />
                </div>

                <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition duration-300"
                >
                Register
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-white">
                Already have an account?
                <span className="ml-1 underline font-semibold cursor-pointer text-indigo-200 hover:text-indigo-100" onClick={() => navigate('/login')}>
                Login
                </span>
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default Register;
