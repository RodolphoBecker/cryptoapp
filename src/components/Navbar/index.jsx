import React, { useState, useEffect } from "react";
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

const Navbar = () => {
	const [menuCollapse, setMenuCollapse] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if(scrollPosition >= 150){
			setMenuCollapse(true)
		}

		if(scrollPosition === 0){
			setMenuCollapse(false)
		}
	},[scrollPosition])

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	const onCollapse = () => {
		if (menuCollapse === true) {
			setMenuCollapse(false);
		} else {
			setMenuCollapse(true);
		}
	};

	return (
		<Sider collapsible collapsed={menuCollapse} onCollapse={onCollapse}>
			<div style={{ textAlign: "center", margin: "10px 0 10px 0" }}>
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
};

export default Navbar;
