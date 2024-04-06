import React from 'react';
import { useState } from 'react';

function Summary() {
    return (
        <div className="summary-container p-4">
            <h1>Summary</h1>
            <p>Here is a summary of your portfolio</p>
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