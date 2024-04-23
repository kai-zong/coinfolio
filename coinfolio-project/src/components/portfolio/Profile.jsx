import React, { useState, useEffect } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';

const GET_USER_PROFILE_URL = 'http://localhost:3001/profile';

function Profile() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { accessToken } = useUserAndPriceTable();

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${GET_USER_PROFILE_URL}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setName(data.nickName);
                setLoading(false);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (err) {
            setError(`Failed to fetch data: ${err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!accessToken) return; // Don't fetch if no access token
        fetchUserData();
    }, []);

    useEffect(() => {
        if (!accessToken) return; // Don't fetch if no access token
        fetchUserData();
    }, [accessToken]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const saveName = async () => {
        try {
            const response = await fetch("http://localhost:3001/profile/1", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Name updated successfully!');
        } catch (err) {
            setError(`Failed to update name: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-5 flex-row">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold mb-2">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button onClick={saveName} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
        </div>
    );
}

export default Profile;
