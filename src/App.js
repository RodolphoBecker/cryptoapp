// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import { Layout, Typography, Space } from "antd";

// import {
// 	Navbar,
// 	Exchanges,
// 	HomePage,
// 	Cryptocurrencies,
// 	News,
// 	CryptoDetails,
// } from "./components";

// import "./App.css";

// const App = () => {
// 	return (
// 		<>
// 			<div className="app">
// 				<div className="navbar">
// 					<Navbar />
// 				</div>
// 				<div className="main">
// 					<Layout>
// 						<div className="routes container">
// 							<Routes>
// 								<Route exact path="/" element={<HomePage />} />
// 								<Route exact path="/exchanges" element={<Exchanges />} />
// 								<Route
// 									exact
// 									path="/cryptocurrencies"
// 									element={<Cryptocurrencies />}
// 								/>
// 								<Route
// 									exact
// 									path="/crypto/:coinId"
// 									element={<CryptoDetails />}
// 								/>
// 								<Route exact path="/news" element={<News />} />
// 							</Routes>
// 						</div>
// 					</Layout>
// 				</div>
// 			</div>
// 			<div className="footer">
// 				<Typography.Title
// 					level={5}
// 					style={{ color: "white", textAlign: "center" }}
// 				>
// 					CryptoRods <br />
// 					Made by Rodolpho Becker
// 				</Typography.Title>
// 				<Space>
// 					<Link to="/">Home</Link>
// 					<Link to="/exchanges">Exchanges</Link>
// 					<Link to="/news">News</Link>
// 				</Space>
// 			</div>
// 		</>
// 	);
// };

// export default App;

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
