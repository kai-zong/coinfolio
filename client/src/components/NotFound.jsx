import React from 'react';
import pepecry from '../assets/pepecry.png';

export default function NotFound() {
    return (
        <div className='flex-col justify-center'>
            <h1 className='text-center'>404: Not Found</h1>
            {/* attach a image */}
            <div className='flex justify-center '>
                <img src={pepecry} alt="404" />
            </div>

        </div>
    );
}
