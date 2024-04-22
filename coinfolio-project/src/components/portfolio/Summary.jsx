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

    const formattedDate = new Date(updateTime).toLocaleDateString();
    const formattedTime = new Date(updateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
        <div className="summary-container x-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-sans text-lg font-semibold text-gray-400">Sean's Portfolio</p>
                    <p className="font-sans text-3xl">${summaryMarket.toFixed(2)}</p>
                    <p>{calculatePerformance(summaryMarket, summaryCost)}</p>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateCoins} >
                    <svg class="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -5v5h5" />  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 5v-5h-5" /></svg>
                    </button>
                    <p>Last Update: {formattedDate} {formattedTime}</p>
                </div>
            </div>
            <div className="summary-detail mt-4">
                {/* Content of the first div with border and spacing */}
                <div className="detail-1 p-4 mb-4 border rounded-lg">
                    <h2>Detail 1</h2>
                    <p>This is the first detailed part of your summary.</p>
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
                    <h2>Detail 2</h2>
                    <PortfolioTable portfolio={portfolio} />
                </div>
            </div>
        </div>
    );
}

export default Summary;