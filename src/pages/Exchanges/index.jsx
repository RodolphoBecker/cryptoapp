import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { Loading } from "../../components";
import { Row, Typography, Avatar, Table } from "antd";
import { useGetExchangesQuery } from "../../services/cryptoAPI";

const { Title } = Typography;

const Exchanges = () => {
	const { data, isFetching } = useGetExchangesQuery();
	const exchangesList = data?.data?.exchanges;

	if (isFetching) {
		return <Loading />;

	} else {
		const columns = [
			{
				title: "Exchanges",
				dataIndex: "exchange",
			},
			{
				title: "24h Trade Volume",
				dataIndex: "tradeVolume",
			},
			{
				title: "Markets",
				dataIndex: "market",
			},
			{
				title: "Change",
				dataIndex: "change",
			},
		];

		const TableData = exchangesList.map((exchange, i) => {
			return {
				key: i,
				exchange: (
					<Row>
						<Avatar
							className="exchange-image"
							src={exchange.iconUrl}
							size={25}
						/>
						<a href={exchange.websiteUrl} rel="noreferrer" target="_blank">{exchange.name}</a>
					</Row>
				),
				tradeVolume: millify(exchange.volume),
				market: millify(exchange.numberOfMarkets),
				change: millify(exchange.marketShare) + "%",
				description: HTMLReactParser(exchange.description || ""),
			};
		});

		function onChange(pagination, filters, sorter, extra) {
			console.log("params", pagination, filters, sorter, extra);
		}
		
		return (
			<>
				<Row style={{ marginBottom: "30px" }}>
					<Title level={2} className="heading section-title">
						Exchanges
					</Title>
				</Row>
				<Table
					pagination={{ pageSize: 8 }}
					columns={columns}
					dataSource={TableData}
					expandable={{
						expandedRowRender: (record) => (
							<p style={{ margin: 0 }}>{record.description}</p>
						),
						rowExpandable: (record) => record.name !== "Not Expandable",
					}}
					onChange={onChange}
				/>
			</>
		);
	}
};

export default Exchanges;
