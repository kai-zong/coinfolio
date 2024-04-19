import React from 'react';
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

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
                    <div class="chart-container">
                        <Doughnut
                            data={{
                                labels: [
                                    'Red',
                                    'Blue',
                                    'Yellow'
                                ],
                                datasets: [{
                                    label: 'My First Dataset',
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    hoverOffset: 4
                                }]
                            }} />
                    </div>
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