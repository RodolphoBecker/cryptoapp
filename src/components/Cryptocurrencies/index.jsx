import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import millify from "millify";
import { Loading } from "..";

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
				<Row gutter={[32, 32]} className="search-crypto" style={{ marginBottom: "30px" }}>
					<Col xs={24} sm={12} lg={6}>
						<Input
							placeholder="Search Cryptocurrency"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Col>
				</Row>
			)}
			<div className="cointainer">
				<Row gutter={[32, 32]} className="crypto-card-container default-container">
					{cryptos?.map((currency) => (
						<Col
							xs={24}
							sm={12}
							lg={6}
							className="crypto-card"
							key={currency.id}
						>
							<Link to={`/crypto/${currency.id}`}>
								<Card
									title={`${currency.rank}. ${currency.name}`}
									extra={
										<img
											className="crypto-image"
											style={{ maxHeight: "25px" }}
											src={currency.iconUrl}
											alt="cryptoImage"
										/>
									}
									hoverable
								>
									<p>Price: ${millify(currency.price)}</p>
									<p>Market Cap: ${millify(currency.marketCap)}</p>
									<p>Daily Change: {millify(currency.change)}%</p>
								</Card>
							</Link>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default Cryptocurrencies;
