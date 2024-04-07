import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
	cases: {
		hex: "#CC1034",
		rgb: "rgb(204, 16, 52)",
		half_op: "rgba(204, 16, 52, 0.5)",
		multiplier: 800,
	},
	recovered: {
		hex: "#5673EB",
		rgb: "rgb(86, 115, 235)",
		half_op: "rgba(86, 115, 235, 1)",
		multiplier: 1200,
	},
	deaths: {
		hex: "#fb4443",
		rgb: "rgb(251, 68, 67)",
		half_op: "rgba(251, 68, 67, 0.5)",
		multiplier: 2000,
	},
};

export const sortData = (data) => {
	let sortedData = [...data];
	sortedData.sort((a, b) => {
		if (a.cases > b.cases) {
			return -1;
		} else {
			return 1;
		}
	});
	return sortedData;
};

export const prettyPrintStat = (stat) =>
	stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			fillOpacity={0.4}
			radius={
				Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className="info-container">
					<div
						className="info-flag"
						style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
					></div>
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">
						확진자: {numeral(country.cases).format("0,0")}
					</div>
					<div className="info-recovered">
						완치자: {numeral(country.recovered).format("0,0")}
					</div>
					<div className="info-deaths">
						사망자: {numeral(country.deaths).format("0,0")}
					</div>
				</div>
			</Popup>
		</Circle>
	));
