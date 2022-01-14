import React, { useState } from "react";

import { Select, Typography, Row, Col } from "antd";
import { useGetCryptosNewsQuery } from "../../services/cryptoNewsAPI";
import { useGetCryptosQuery } from "../../services/cryptoAPI";
import { CardNews, Loading } from "../../components";

const { Title } = Typography;
const { Option } = Select;

const demoImage =
	"http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data: cryptoNews } = useGetCryptosNewsQuery({
		newsCategory,
		count: simplified ? 5 : 12,
	});
	const { data } = useGetCryptosQuery(100);

	if (!cryptoNews?.value) return <Loading />;

	return (
		<>
			{!simplified && (
				<>
					<Row style={{ marginBottom: "30px" }}>
						<Title level={2} className="heading section-title">
							News
						</Title>
					</Row>
					<Row gutter={[24, 24]} style={{ marginBottom: "30px" }}>
						<Col xs={24} sm={12} lg={8}>
							<Select
								showSearch
								className="select-news"
								placeholder="Select a Crypto"
								optionFilterProp="children"
								onChange={(value) => setNewsCategory(value)}
								filterOption={(input, option) =>
									option.children
										.toLowerCase()
										.indexOf(input.toLocaleLowerCase()) >= 0
								}
								style={{ width: "100%" }}
							>
								<Option value="Cryptocurrency">Cryptocurrency</Option>
								{data?.data?.coins.map((coin) => (
									<Option value={coin.name}>{coin.name}</Option>
								))}
							</Select>
						</Col>
					</Row>
				</>
			)}
			<Row
				gutter={[12, 50]}
				justify="space-between"
				className="default-container"
			>
				{cryptoNews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={4} key={i}>
						<CardNews
							url={news.url}
							title={news.name}
							image={news?.image?.thumbnail?.contentUrl || demoImage}
							description={news.description}
							publisher={
								news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
							}
							provider={news.provider[0]?.name}
							date={news.datePublished}
						/>
					</Col>
				))}
			</Row>
		</>
	);
};

export default News;
