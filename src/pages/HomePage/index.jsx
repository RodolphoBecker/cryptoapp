import React from "react";

import ButtonLink from "../../components/Buttons/ButtonLink";
import CardDefault from "../../components/Cards/CardDefault";
import ExchangesBackground from "../../images/background-exchanges.jpg";
import MarketCapBackground from "../../images/background-marketCap.jpg"
import VolumeBackground from "../../images/background-volume.jpg"
import MarketsBackground from "../../images/background-markets.jpg"

import { Typography, Row, Col } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import { Cryptocurrencies, Loading } from "../../components";
import { News } from '../'

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
				background: ExchangesBackground
			},
			{
				title: "Total Exchanges",
				value: globalStats.totalExchanges,
				background: ExchangesBackground
			},
			{
				title: "Total Market Cap",
				value: globalStats.totalMarketCap,
				background: MarketCapBackground
			},
			{
				title: "Total 24h Volume",
				value: globalStats.total24hVolume,
				background: VolumeBackground
			},
			{
				title: "Total Markets",
				value: globalStats.totalMarkets,
				background: MarketsBackground
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
								lg={4}
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
