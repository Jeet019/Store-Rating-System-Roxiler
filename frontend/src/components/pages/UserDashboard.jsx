    import React, { useEffect, useState } from 'react';
    import api from '../utils/api';

    const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        api.get('/user/stores').then(res => {
        setStores(res.data);
        const r = {};
        res.data.forEach(s => r[s.id] = s.user_rating || '');
        setRatings(r);
        });
    }, []);

    const handleRate = (storeId) => {
        const rating = ratings[storeId];
        if (rating < 1 || rating > 5) return alert('Rate between 1–5');
        api.post('/user/ratings', { store_id: storeId, rating }).then(() => {
        alert('Rating submitted');
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, User</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map(store => (
            <div key={store.id} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-1">{store.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{store.address}</p>
                <p className="text-sm">Average Rating: {store.average_rating?.toFixed(2) || 'N/A'}</p>
                <input
                type="number"
                placeholder="Rate (1-5)"
                value={ratings[store.id]}
                onChange={(e) => setRatings({ ...ratings, [store.id]: e.target.value })}
                className="w-full p-2 border rounded mt-2"
                />
                <button onClick={() => handleRate(store.id)} className="btn-indigo mt-2 w-full">Submit</button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default UserDashboard;
