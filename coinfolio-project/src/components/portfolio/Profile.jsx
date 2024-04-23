import React, { useState, useEffect } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';
import { useAuth0 } from '@auth0/auth0-react';

const GET_USER_PROFILE_URL = 'http://localhost:3001/profile';
const PUT_USER_PROFILE_URL = 'http://localhost:3001/profile';

function Profile() {
    const [localNickName, setLocalNickName] = useState('');  // Local editing state
    const [error, setError] = useState('');
    const { isAuthenticated, user } = useAuth0();

    const { accessToken, userData, updateNickName } = useUserAndPriceTable();

    useEffect(() => {
        setLocalNickName(userData.nickName || '');  // Initialize with context data
    }, [userData.nickName]);  // Dependency on userData.nickName to update local state when context changes

    const handleNameChange = (event) => {
        setLocalNickName(event.target.value);
    };

    const saveNickName = async () => {
        try {
            await updateNickName(localNickName);
            alert('Nickname updated successfully!');
        } catch (error) {
            alert(`Failed to update nickname: ${error.message}`);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!isAuthenticated) return <div>Please log in to view this page.</div>;

    return (
        <div className="p-5 flex-row">
            {/* <h1 className="text-2xl font-bold mb-6">Profile</h1> */}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">Name:</label>
                <p>{user.name}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2 text-lg">Email:</label>
                <p>{user.email}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">Nick Name:</label>
                <input
                    type="text"
                    id="name"
                    value={localNickName}
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
