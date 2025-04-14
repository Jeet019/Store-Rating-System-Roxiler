    import React, { useEffect, useState } from 'react';
    import api from '../utils/api';

    const OwnerDashboard = () => {
    const [users, setUsers] = useState([]);
    const [average, setAverage] = useState(null);

    useEffect(() => {
        api.get('/owner/users').then(res => setUsers(res.data));
        api.get('/owner/average-rating').then(res => setAverage(res.data.average_rating?.toFixed(2)));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-purple-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Owner Dashboard</h2>

        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
            <h3 className="text-xl font-semibold">Average Rating:</h3>
            <p className="text-2xl font-bold text-yellow-500 mt-2">{average ?? 'N/A'}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="min-w-full text-sm text-left">
            <thead className="bg-purple-600 text-white">
                <tr>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Rating</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u, i) => (
                <tr key={i} className="odd:bg-gray-50 even:bg-white border-b">
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.email}</td>
                    <td className="py-2 px-4">{u.rating}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    };

    export default OwnerDashboard;
