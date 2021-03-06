import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, coinName }) => {
	const coinPrice = [];
	const coinTimestamp = [];

	for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
		coinPrice.push(coinHistory.data.history[i].price);
		coinTimestamp.push(
			new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
		);
	}

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: "Price in USD",
				data: coinPrice,
				fill: false,
				backgroundColor: "#0071bd",
				borderColor: "#0071bd",
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZeto: true,
					},
				},
			],
		},
        drawTicks: false
	};

	return (
		<>
            <Line data={data} option={options}></Line>
		</>
	);
};

export default LineChart;
