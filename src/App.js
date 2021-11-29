import React from "react";
import { Layout, Avatar } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import {
	Navbar,
	Exchanges,
	HomePage,
	Cryptocurrencies,
	News,
	CryptoDetails,
} from "./components";
import "./App.css";

import icon from "../src/images/cryptocurrency.png";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
	render() {
		return (
			<Layout style={{ minHeight: "100vh" }}>
				<Layout className="site-layout">
					<Header
						className="site-layout-background"
						style={{ padding: 0, position: "fixed", zIndex: 2, width: "100%" }}
					>
						<div style={{ textAlign: "center" }}>
							<Link to="/">
								<Avatar src={icon} size="large" />
							</Link>
						</div>
					</Header>
					<Layout>
						<Navbar />
						<Content
							style={{ margin: "0 16px", padding: "30px", marginTop: "100px" }}
						>
							<Routes>
								<Route exact path="/" element={<HomePage />} />
								<Route exact path="/exchanges" element={<Exchanges />} />
								<Route
									exact
									path="/cryptocurrencies"
									element={<Cryptocurrencies />}
								/>
								<Route
									exact
									path="/crypto/:coinId"
									element={<CryptoDetails />}
								/>
								<Route exact path="/news" element={<News />} />
							</Routes>
						</Content>
					</Layout>
					<Footer style={{ textAlign: "center", backgroundColor: '#001529', color: 'white', padding: "13px 50px" }}>
						Made by Rodolpho Becker
					</Footer>
				</Layout>
			</Layout>
		);
	}
}
export default App;
