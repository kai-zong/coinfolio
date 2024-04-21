import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/profile/1");
                setName(response.data.name); // Make sure your API responds with the user data in this format
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []); // Added empty dependency array to prevent running on every render

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const saveName = async () => {
        try {
            await axios.put("http://localhost:3001/profile/1", { name }); // Corrected URL to match your API endpoint
            alert('Name updated successfully!');
        } catch (err) {
            setError('Failed to update name');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto mt-10 p-5 border rounded shadow-lg max-w-md">
            <h1 className="text-center text-2xl font-bold mb-6">Edit Profile</h1>
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="text-center">
                <button onClick={saveName} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save
                </button>
            </div>
        </div>
    );
}

export default Profile;