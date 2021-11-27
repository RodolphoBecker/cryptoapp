import React from "react";
import { Link } from "react-router-dom";

import { Typography, Row, Col, Statistic, Button } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import { Cryptocurrencies, News, Loading } from "../";

import millify from "millify";
import ButtonLink from "../Buttons/ButtonLink";

const { Title } = Typography;

const HomePage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const globalStats = data?.data?.stats;

	if (isFetching) return <Loading />;

	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic title="Total Cryptocurrencies" value={globalStats.total} />
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={millify(globalStats.totalExchanges)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market Cap"
						value={millify(globalStats.totalMarketCap)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24h Volume"
						value={millify(globalStats.total24hVolume)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Markets"
						value={millify(globalStats.totalMarkets)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 Cryptocurrencies in the World
				</Title>
				<ButtonLink path="/cryptocurrencies" text="SHOW MORE" />
			</div>
			<Cryptocurrencies simplified />
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest Crypto News
				</Title>
				<ButtonLink path="/news" text="SHOW MORE" />
			</div>
			<News simplified />
		</>
	);
};

export default HomePage;
