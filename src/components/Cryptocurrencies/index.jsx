import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Row, Col, Input, Popover, Typography } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import millify from "millify";
import { Loading } from "..";

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
		);

		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return <Loading />;

	return (
		<>
			{simplified ? (
				<></>
			) : (
				<>
					<Row style={{ marginBottom: "30px" }}>
						<Title level={2} className="heading section-title">
							Cryptocurrencies
						</Title>
					</Row>
					<Row
						gutter={[32, 32]}
						className="search-crypto"
						style={{ marginBottom: "30px" }}
					>
						<Col xs={24} sm={12} lg={6}>
							<Input
								placeholder="Search Cryptocurrency"
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</Col>
					</Row>
				</>
			)}
			<div className="cointainer">
				<Row
					gutter={[32, 32]}
					className="crypto-card-container default-container"
				>
					{cryptos?.map((currency) => (
						<Col
							xs={24}
							sm={12}
							lg={4}
							className="crypto-card"
							style={{ textAlign: "center" }}
							key={currency.id}
						>
							<Link to={`/crypto/${currency.id}`}>
								<Popover
									content={
										<div>
											<p>Price: ${millify(currency.price)}</p>
											<p>Market Cap: ${millify(currency.marketCap)}</p>
											<p>Daily Change: {millify(currency.change)}%</p>
										</div>
									}
									title={`${currency.rank}. ${currency.name}`}
								>
									<img
										className="crypto-image"
										src={currency.iconUrl}
										alt="cryptoImage"
									/>
								</Popover>
								<p className="card-title">{`${currency.rank}. ${currency.name}`}</p>
							</Link>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default Cryptocurrencies;
