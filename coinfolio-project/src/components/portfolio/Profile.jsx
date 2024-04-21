import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Assuming the user's ID is available somehow, perhaps from context or props

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
    });

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const saveName = async () => {
        try {
            await axios.put("http://localhost:3001/profile/:userID", { name });
            alert('Name updated successfully!');
        } catch (err) {
            setError('Failed to update name');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Edit Profile</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <button onClick={saveName} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">
                Save
            </button>
        </div>
    );
}

export default Profile;