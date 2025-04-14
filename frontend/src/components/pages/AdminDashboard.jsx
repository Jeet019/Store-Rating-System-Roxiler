    import React, { useEffect, useState } from 'react';
    import api from '../utils/api';
    import { Users, Store, Star } from 'lucide-react';

    const AdminDashboard = () => {
    const [summary, setSummary] = useState({});

    useEffect(() => {
        api.get('/admin/summary').then(res => setSummary(res.data));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-10 w-full max-w-3xl text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard title="Total Users" value={summary.total_users} icon={<Users />} />
            <StatCard title="Total Stores" value={summary.total_stores} icon={<Store />} />
            <StatCard title="Total Ratings" value={summary.total_ratings} icon={<Star />} />
            </div>
        </div>
        </div>
    );
    };

    const StatCard = ({ title, value, icon }) => (
    <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg text-center">
        <div className="text-4xl mb-2 flex justify-center">{icon}</div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-2xl font-bold mt-1">{value ?? 0}</div>
    </div>
    );

    export default AdminDashboard;