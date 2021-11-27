import React from "react";
import millify from "millify";
import { Image } from "antd";

import "../CardDefault/CardDefault.css";

const CardDefault = (props) => {
	const { title, value, background } = props;

	return (
		<div class="card">
			<Image src={background} />
			<div class="card__overlay">
				<div class="card__header">
					<svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
						<path />
					</svg>
					<div class="card__header-text">
						<h3 class="card__title">{title}</h3>
					</div>
				</div>
				<p class="card__description">{millify(value)}</p>
			</div>
		</div>
	);
};

export default CardDefault;
