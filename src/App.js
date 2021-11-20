import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import {
	Navbar,
	Exchanges,
	HomePage,
	Cryptocurrencies,
	News,
	CryptoDetails,
} from "./components";
import "./App.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};

	render() {
		return (
			<Layout style={{ minHeight: "100vh" }}>
				<Navbar />
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }} />
					<Content style={{ margin: "0 16px", padding: "30px" }}>
						<Routes>
							<Route exact path="/" element={<HomePage />} />
							<Route exact path="/exchanges" element={<Exchanges />} />
							<Route
								exact
								path="/cryptocurrencies"
								element={<Cryptocurrencies />}
							/>
							<Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
							<Route exact path="/news" element={<News />} />
						</Routes>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Made by Rodolpho Becker
					</Footer>
				</Layout>
			</Layout>
		);
	}
}
export default App;
