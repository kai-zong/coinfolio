import React from 'react';
import { useState } from 'react';

function Summary() {
    return (
        <div className="summary-container p-4">
            <p className="font-sans text-lg font-semibold text-gray-400">Sean's Portfolio</p>
            <p className="font-sans text-3xl">$140,230.80</p>
            <p>+ $3268.33 &uarr; 2.68% (24h)</p>
            <div className="summary-detail mt-4">
                {/* Content of the first div with border and spacing */}
                <div className="detail-1 p-4 mb-4 border rounded-lg">
                    <h2>Detail 1</h2>
                    <p>This is the first detailed part of your summary.</p>
                </div>
                {/* Content of the second div with border and spacing */}
                <div className="detail-2 p-4 border rounded-lg">
                    <h2>Detail 2</h2>
                    <p>This is the second detailed part of your summary.</p>
                </div>
            </div>
        </div>
    );
}

export default Summary;