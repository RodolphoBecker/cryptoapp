// import React from "react";
// import { Link } from "react-router-dom";

// import { Button, Menu, Typography, Avatar } from "antd";
// import {
// 	HomeOutlined,
// 	MoneyCollectOutlined,
// 	BulbOutlined,
// 	FundOutlined,
// 	MenuOutlined,
// } from "@ant-design/icons";

// import icon from "../../images/cryptocurrency.png";

// const Navbar = () => {
// 	return (
// 		<div className="nav-container">
// 			<div className="logo-container">
// 				<Avatar src={icon} size="large" />
// 				<Typography.Title level={2} className="logo">
// 					<Link to="/">CryptoRods</Link>
// 				</Typography.Title>
// 				{/* <Button className="menu-control-container"/> */}
// 			</div>
// 			<Menu theme="dark">
// <Menu.Item icon={<HomeOutlined />}>
// 	<Link to="/">Home</Link>
// </Menu.Item>
// <Menu.Item icon={<FundOutlined />}>
// 	<Link to="/cryptocurrencies">Cryptocurrencies</Link>
// </Menu.Item>
// <Menu.Item icon={<MoneyCollectOutlined />}>
// 	<Link to="/exchanges">Exchanges</Link>
// </Menu.Item>
// <Menu.Item icon={<BulbOutlined />}>
// 	<Link to="/news">News</Link>
// </Menu.Item>
// 			</Menu>
// 		</div>
// 	);
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
	FundOutlined,
} from "@ant-design/icons";
import icon from "../../images/cryptocurrency.png";

const { Sider } = Layout;

class Navbar extends React.Component {
	state = {
		collapsed: true,
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	render() {
		const { collapsed } = this.state;
		return (
			<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
				<div style={{ textAlign: 'center', margin: '10px 0 10px 0' }}>
					<Avatar src={icon} size="large" />
				</div>
				<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
					<Menu.Item key="1" icon={<HomeOutlined />}>
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2" icon={<FundOutlined />}>
						<Link to="/cryptocurrencies">Cryptocurrencies</Link>
					</Menu.Item>
					<Menu.Item key="3" icon={<MoneyCollectOutlined />}>
						<Link to="/exchanges">Exchanges</Link>
					</Menu.Item>
					<Menu.Item key="4" icon={<BulbOutlined />}>
						<Link to="/news">News</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default Navbar;
