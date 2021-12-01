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
	BankOutlined
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
			title: "Number Of Markets",
			value: cryptoDetails.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: "Number Of Exchanges",
			value: cryptoDetails.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: "Aprroved Supply",
			value: cryptoDetails.approvedSupply ? (
				<CheckOutlined />
			) : (
				<StopOutlined />
			),
			icon: <ExclamationCircleOutlined />,
		},
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

	console.log({ cryptoDetails });

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
				<Row justify="space-between coin-stats-general" style={{ width: "100%" }}>
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
			</Col>
			{time.map((period, i) => (
				<Button key={i} onClick={() => setTimePeriod(period)}>
					{period}
				</Button>
			))}
			<LineChart
				coinHistory={coinHistory}
				currentPrice={millify(cryptoDetails.price)}
				coinName={cryptoDetails.name}
			/>
			{/* <Col className="stats-container default-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							{cryptoDetails.name} Value Statistics
						</Title>
						<p>An overview showing the stats of {cryptoDetails.name}</p>
					</Col>
					{stats.map(({ icon, title, value, i }) => (
						<Col key={i} className="coin-stats">
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
				<Col className="other-stats-info">
					<Col className="coin-value-statistics-heading">
						<Title level={3} className="coin-details-heading">
							Other Coins Statistics
						</Title>
						<p>An overview showing the stats of all cryptocurrencies</p>
					</Col>
					{genericStats.map(({ icon, title, value, i }) => (
						<Col key={i} className="coin-stats">
							<Col className="coin-stats-name">
								<Text>{icon}</Text>
								<Text>{title}</Text>
							</Col>
							<Text className="stats">{value}</Text>
						</Col>
					))}
				</Col>
			</Col> */}
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Title level={3} className="coin-details-heading">
						What is {cryptoDetails.name}
						{HTMLReactParser(cryptoDetails.description)}
					</Title>
				</Row>
				<Col className="coin-links">
					<Title level={3} className="coin-details-heading">
						{cryptoDetails.name} Links
					</Title>
					{cryptoDetails.links.map((link, i) => (
						<Row key={i} className="coin-link" key={link.name}>
							<Title level={5} className="link-name">
								{link.type}
							</Title>
							<a href={link.url} target="_blank" rel="noreferrer">
								{link.name}
							</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
