import React, { useState } from "react";

import { Typography, Row, Col } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import { Cryptocurrencies, News, Loading } from "../";

import ButtonLink from "../Buttons/ButtonLink";
import CardDefault from "../Cards/CardDefault";

const { Title } = Typography;

const HomePage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalStats = data?.data?.stats;

	if (isFetching) {
		return <Loading />

	} else {
		const globalStatsCard = [
			{
				title: "Total Cryptocurrencies",
				value: globalStats.total,
				background: "https://i.imgur.com/oYiTqum.jpg"
			},
			{
				title: "Total Exchanges",
				value: globalStats.totalExchanges,
				background: "https://i.imgur.com/oYiTqum.jpg"
			},
			{
				title: "Total Market Cap",
				value: globalStats.totalMarketCap,
				background: "https://i.imgur.com/oYiTqum.jpg"
			},
			{
				title: "Total 24h Volume",
				value: globalStats.total24hVolume,
				background: "https://i.imgur.com/oYiTqum.jpg"
			},
			{
				title: "Total Markets",
				value: globalStats.totalMarkets,
				background: "https://i.imgur.com/oYiTqum.jpg"
			},
		];

		return (
			<>
				<Title level={2} className="heading section-title">
					Global Crypto Stats
				</Title>
				<Row className="default-container" justify="space-between">
					{globalStatsCard.map((stat, i) => {
						return (
							<Col
								className="statsCard-container"
								xs={24}
								sm={12}
								lg={5}
								key={i}
							>
								<CardDefault title={stat.title} value={stat.value} background={stat.background} />
							</Col>
						);
					})}
				</Row>
				<div className="home-heading-container">
					<Title level={2} className="home-title section-title">
						Top 10 Cryptocurrencies in the World
					</Title>
					<ButtonLink path="/cryptocurrencies" text="SHOW MORE" />
				</div>
				<Cryptocurrencies simplified />
				<div className="home-heading-container">
					<Title level={2} className="home-title section-title">
						Latest Crypto News
					</Title>
					<ButtonLink path="/news" text="SHOW MORE" />
				</div>
				<News simplified />
			</>
		);
	}
};

export default HomePage;
