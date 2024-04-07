import React, { useState, useEffect } from "react";
import "./App.css";
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import Site from "./site";
import Video from "./video";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { sortData } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
	const [country, setInputCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [mapCountries, setMapCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	const [mapCenter, setMapCenter] = useState({ lat: 37, lng: 127.5 });
	const [mapZoom, setMapZoom] = useState(5);

	useEffect(() => {
		fetch("https://corona.lmao.ninja/v2/countries/KR")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			fetch("https://corona.lmao.ninja/v2/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					let sortedData = sortData(data);
					setCountries(countries);
					setMapCountries(data);
					setTableData(sortedData);
				});
		};

		getCountriesData();
	}, []);

	console.log(casesType);

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;

		const url =
			countryCode === "worldwide"
				? "https://corona.lmao.ninja/v2/countries/KR"
				: `https://corona.lmao.ninja/v2/countries/KR`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setInputCountry(countryCode);
				setCountryInfo(data);
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			});
	};

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<div className="app__bar"></div>
					<Router>
						<Navbar style="position: relative; z-index: 100000000000000000 !important;" />
						<Route path="/site" component={Site} />
					</Router>
					<h1 id="logotext">
						CORONA<span id="Real__app">REAL</span>
					</h1>
					<FormControl className="app__dropdown">
						<Select
							id="dropdown__text"
							variant="outlined"
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value="worldwide">대한민국</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox
						onClick={(e) => setCasesType("cases")}
						title="확진자"
						isRed
						active={casesType === "cases"}
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						onClick={(e) => setCasesType("recovered")}
						title="격리해제"
						active={casesType === "recovered"}
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						onClick={(e) => setCasesType("deaths")}
						title="사망자"
						isRed
						active={casesType === "deaths"}
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				<Map
					countries={mapCountries}
					casesType={casesType}
					center={mapCenter}
					zoom={mapZoom}
				/>
				<Card className="line__design">
					<CardContent>
						<h3 className="graph__text" id="graph__title">
							코로나19 그래프
							<span id="video-description"> (전세계를 포함합니다)</span>
						</h3>
						<LineGraph className="lineGraph__css" casesType={casesType} />
					</CardContent>
				</Card>
				<Card className="app__bottom">
					<CardContent>
						<div className="app__video">
							<h3 id="video__text">
								실시간 유튜브 뉴스 특보
								<span id="video-description"> (컴퓨터 전용)</span>
							</h3>
							<Video id="video-width" />
						</div>
						<h3 id="error-message">
							오류가 있습니다. 전체화면 후 오른쪽 패널이 안보일경우 새로고침을
							해주시기 바랍니다
						</h3>
					</CardContent>
				</Card>
			</div>
			<Card className="app__right">
				<CardContent>
					<div className="app__information">
						<h3 id="table-text">전세계 현황</h3>
						<Table countries={tableData} />
					</div>
				</CardContent>
			</Card>
			<Router>
				<Switch>
					<Route path="/site" exact compnent={Site} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
