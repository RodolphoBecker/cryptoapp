import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const ButtonLink = (props) => {
	const {path, text} = props

	return (
		<Button
			type="primary"
			shape="round"
			size="large"
			style={{
				backgroundColor: "#001529",
				borderColor: "#001529",
				color: "#ffff",
			}}
		>
			<Link to={path}>{text}</Link>
		</Button>
	);
};

export default ButtonLink;
