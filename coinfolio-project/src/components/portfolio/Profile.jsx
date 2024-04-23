import React, { useState, useEffect } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';

const GET_USER_PROFILE_URL = 'http://localhost:3001/profile';
const PUT_USER_PROFILE_URL = 'http://localhost:3001/profile';

function Profile() {
    const [nickName, setNickName] = useState('');
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
                console.log('User data:', data)
                setNickName(data.nickName);
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
        setNickName(event.target.value);
    };

    const saveNickName = async () => {
        try {
            const response = await fetch(`${PUT_USER_PROFILE_URL}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ nickName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('nickName updated successfully!');
        } catch (err) {
            setError(`Failed to update name: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-5 flex-row">
            {/* <h1 className="text-2xl font-bold mb-6">Profile</h1> */}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">Name:</label>
                <p ></p>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">Nick Name:</label>
                <input
                    type="text"
                    id="name"
                    value={nickName}
                    onChange={handleNameChange}
                    className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button onClick={saveNickName} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
            </button>
        </div>
    );
}

export default Profile;
