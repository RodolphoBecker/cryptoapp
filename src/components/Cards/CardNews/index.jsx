import React from "react";
import { Image, Typography, Avatar, Row } from "antd";

import moment from "moment";

import "../CardNews/CardNews.css";

const CardNews = (props) => {
	const { url, title, image, description, publisher, provider, date } = props;
	const { Title, Text } = Typography;

	return (
		<a href={url} target="_blank" rel="noreferrer" className="cardNews-body">
			<Image width="100%" preview={false} className="cardNews-image" src={image} />
			<div className="cardNews-description">
				<Title level={4}>
					{title}
				</Title>
				<Text>
					{description > 100
						? `${description.substring(0, 100)}...`
						: description}
				</Text>
				<Row justify="space-between" align="middle" className="cardNews-publisher">
					<div>
						<Avatar size="large" src={publisher} alt="news" />
						{/* <Text className="cardNews-publisher-text">{provider}</Text> */}
					</div>
					<Text className="cardNews-publisher-text">{moment(date).startOf("ss").fromNow()}</Text>
				</Row>
			</div>
		</a>
	);
};

export default CardNews;
