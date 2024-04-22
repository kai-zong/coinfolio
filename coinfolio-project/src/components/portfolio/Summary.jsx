import React from 'react';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut, Bar } from 'react-chartjs-2';
import PortfolioTable from './PortfolioTable';
import { useUserAndPriceTable } from '../../UserAndPriceTableContext';

function Summary() {

    // request API to get the transaction details of a user
    const [portfolio, setPortfolio] = useState([]);
    const [summaryMarket, setSummaryMarket] = useState(0);
    const [summaryCost, setSummaryCost] = useState(0);
    const userId = 1; // Replace with the actual user ID

    const { displayedCoins, updateCoins, updateTime } = useUserAndPriceTable();

    const formattedDate = updateTime ? new Date(updateTime).toLocaleDateString() : '';
    const formattedTime = updateTime ? new Date(updateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    const fetchPortfolio = () => {
        fetch(`http://localhost:3001/portfolio/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPortfolio(data);
                const fairValueTotal = data.reduce((acc, item) => acc + item.amount * item.coinDetails.marketPrice, 0);
                const costTotal = data.reduce((acc, item) => acc + item.amountInUSD, 0);
                setSummaryMarket(fairValueTotal);
                setSummaryCost(costTotal);

                console.log('Portfolio data:', data); // Log the retrieved data
            })
            .catch(error => {
                console.error('Failed to fetch transactions:', error);
            });
    };

    useEffect(() => {
        fetchPortfolio();
    }, [userId, displayedCoins]); // Add an empty array as the second argument to the useEffect hook

    // Define a fixed array of colors
    const colors = [
        'rgb(153, 102, 255)', // purple
        'rgb(255, 99, 132)', // red
        'rgb(255, 159, 64)',  // orange
        'rgb(255, 206, 86)', // yellow
        'rgb(75, 192, 192)', // green
        'rgb(40, 159, 64)',   // forest green
        'rgb(54, 162, 235)', // blue
        'rgb(199, 199, 199)', // grey
        'rgb(83, 102, 255)',  // indigo
        'rgb(255, 99, 255)',  // pink
    ];
    const grayColor = 'rgb(201, 203, 207)'; // light gray for additional coins

    const donutChartData = {
        labels: portfolio.map(item => item.coinDetails.symbol),
        datasets: [{
            label: 'Portfolio Distribution',
            data: portfolio.map(item => item.amount * item.coinDetails.marketPrice),
            backgroundColor: portfolio.map((_, index) =>
                index < colors.length ? colors[index] : grayColor
            ),
            hoverOffset: 4
        }]
    };

    const donutChartOptions = {
        plugins: {
            legend: {
                position: 'right', // Position the legend on the right
            }
        }
    };

    // Setup for the bar chart
    const barChartData = {
        labels: portfolio.map(item => item.coinDetails.symbol),
        datasets: [{
            label: 'Current Value',
            data: portfolio.map(item => item.amount * item.coinDetails.marketPrice),
            backgroundColor: portfolio.map((_, index) =>
                index < colors.length ? colors[index] : grayColor
            ),
        }]
    };

    const barChartOptions = {
        maintainAspectRatio: false, // Add this option to control the chart size
        scales: {
            y: {
                beginAtZero: true
            }

        },
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        }
    };

    function calculatePerformance(summaryMarket, summaryCost) {
        const diff = summaryMarket - summaryCost;
        const diffPercentage = (diff / summaryCost) * 100;
        const isPositive = diff > 0;

        const sign = isPositive ? '+' : '-';
        const arrow = isPositive ? '↑' : '↓';

        return `${sign} $${Math.abs(diff).toFixed(2)} ${arrow} ${Math.abs(diffPercentage).toFixed(2)}%`;
    }

    return (
        <div className="summary-container x-4 p-4">
            <div className="flex justify-between items-center px-1">
                <div>
                    <p className="font-sans text-lg font-semibold text-gray-400">Sean's Portfolio</p>
                    <p className="font-sans text-3xl">${summaryMarket.toFixed(2)}</p>
                    <p>{calculatePerformance(summaryMarket, summaryCost)}</p>
                </div>
                <div className="flex-col">
                    <div className='flex justify-end items-start px-2 pb-2'>
                        <svg className="h-8 w-8 cursor-pointer" onClick={updateCoins} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" />
                        </svg>
                    </div>
                    <div className='px-2'>
                        {formattedDate && formattedTime && <p className='text-sm italic text-gray-400'>UpdateAt: {formattedDate} {formattedTime}</p>}
                    </div>
                </div>
            </div>
            <div className="summary-detail mt-4">
                {/* Content of the first div with border and spacing */}
                <div className="detail-1 p-4 mb-4 border rounded-lg">
                    <div className="charts-container flex justify-between">
                        <div className="chart-container w-1/2 h-64"> {/* Adjust the height here */}
                            <Bar data={barChartData} options={barChartOptions} />
                        </div>
                        <div className="chart-container w-1/2">
                            <Doughnut data={donutChartData} options={donutChartOptions} />
                        </div>
                    </div>

                </div>
                {/* Content of the second div with border and spacing */}
                <div className="detail-2 p-4 border rounded-lg">
                    <PortfolioTable portfolio={portfolio} />
                </div>
            </div>
        </div>
    );
}

export default Summary;