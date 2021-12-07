import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select, Button, Tag } from "antd";
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
	BankOutlined,
} from "@ant-design/icons";

import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from "../../services/cryptoAPI";
import { useGetCoinExchangeQuery } from "../../services/coinExchangeAPI";
import { LineChart, Loading } from "../";
import millify from "millify";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
	const { coinId } = useParams();
	const [timePeriod, setTimePeriod] = useState("7d");

	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod,
	});
	const { data: coinConversion } = useGetCoinExchangeQuery();

	const cryptoDetails = data?.data?.coin;

	const convertBRL = parseFloat(coinConversion?.USDBRL?.bid);

	if (isFetching) return <Loading />;

	const time = ["24h", "7d", "30d", "1y"];

	const stats = [
		{
			title: "24h Volume",
			value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: "Market Cap",
			value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All-time-high(daily avg.)",
			value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
			icon: <TrophyOutlined />,
		},
		{
			title: "Exchanges",
			value: `${cryptoDetails.numberOfExchanges}`,
			icon: <BankOutlined />,
		},
		{
			title: "Markets",
			value: `${millify(cryptoDetails.numberOfMarkets)}`,
			icon: <NumberOutlined />,
		},
	];

	const genericStats = [
		{
			title: "Total Supply",
			value: `$ ${millify(cryptoDetails.totalSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	return (
		<Col>
			<Col className="default-container" style={{ marginTop: "0" }}>
				<Tag>{`Rank #${cryptoDetails.rank}`}</Tag>
				<Row align="middle" style={{ marginTop: "15px" }}>
					<img
						src={cryptoDetails.iconUrl}
						alt="cryptoImage"
						style={{ width: "30px" }}
					/>
					<div>
						<Title level={3} style={{ marginBottom: "0", marginLeft: "10px" }}>
							{`${cryptoDetails.name} (${cryptoDetails.symbol.toLowerCase()})`}
						</Title>
					</div>
				</Row>
				<Row style={{ margin: "15px 0" }}>
					<Title level={2} style={{ marginBottom: "0" }}>
						{`US$ ${millify(cryptoDetails.price)}`}
					</Title>
				</Row>
				<div className="card-background">
					<Row
						justify="space-between coin-stats-general"
						style={{ width: "100%" }}
					>
						{stats.map(({ icon, title, value, i }) => (
							<Col key={i} className="coin-stats">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))}
					</Row>
					<Row
						justify="space-between"
						style={{ width: "100%" }}
					>
						{genericStats.map(({ icon, title, value, i }) => (
							<Col key={i} className="coin-stats coin-stats-generic">
								<Col className="coin-stats-name">
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className="stats">{value}</Text>
							</Col>
						))}
					</Row>
				</div>
			</Col>
			{time.map((period, i) => (
				<Button key={i} onClick={() => setTimePeriod(period)}>
					{period}
				</Button>
			))}
			<Row justify="space-between">
				<Col xs={24} sm={12} lg={17}>
					<LineChart coinHistory={coinHistory} coinName={cryptoDetails.name} />
				</Col>
				<Col xs={24} sm={12} lg={6} className="coin-links card-background">
					<Title level={3} className="coin-details-heading">
						{cryptoDetails.name} Links
					</Title>
					{cryptoDetails.links.map((link, i) => (
						<Row key={i} className="coin-link" key={link.name}>
							<Title level={5} className="link-name">
								{link.type}
							</Title>
							<Tag>
								<a href={link.url} target="_blank" rel="noreferrer">
									{link.name}
								</a>
							</Tag>
						</Row>
					))}
				</Col>
			</Row>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetails.name}
						{HTMLReactParser(cryptoDetails.description)}
					</Title>
				</Row>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
