import React, { useState, useContext } from 'react';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';

function Profile() {
    const { nickName, setNickName, updateNickName } = useUserAndPriceTable();
    const [editNickName, setEditNickName] = useState(nickName);

    const handleNameChange = (event) => {
        setEditNickName(event.target.value);
    };

    const saveNickName = () => {
        updateNickName(editNickName);
    };

    return (
        <div className="p-5 flex-row">
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2 text-lg">Nick Name:</label>
                <input
                    type="text"
                    id="name"
                    value={editNickName}
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
