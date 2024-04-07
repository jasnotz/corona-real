import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as SiIcons from "react-icons/si";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar">
					<Link to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
				</div>
				<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<Link id="exit" to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						<ul id="covid-book">
							<div id="IoMdBook">
								<IoIcons.IoMdBook />
							</div>
							<a
								href="http://ncov.mohw.go.kr/baroView.do?brdId=4&brdGubun=41"
								target="_blank"
							>
								코로나19에 대해
							</a>
						</ul>
						<ul id="covid-box">
							<div id="BiBox">
								<BiIcons.BiBox />
							</div>
							<a
								href="https://www.mohw.go.kr/react/popup_200128.html"
								target="_blank"
							>
								동네 선별진료소
							</a>
						</ul>
						<ul id="covid-store">
							<div id="Fastore">
								<FaIcons.FaStore />
							</div>
							<a
								id="mask__text"
								href="https://smartstore.naver.com/korea-mask/products/4825762296"
								target="_blank"
							>
								좋은 마스크구매
							</a>
						</ul>
						<ul id="covid-site">
							<div id="Faglasses">
								<FaIcons.FaGlasses />
							</div>
							<a
								id="mask__text"
								href="http://ncov.mohw.go.kr/index.jsp"
								target="_black"
							>
								질병 관련사이트
							</a>
						</ul>
						<ul id="covid-discord">
							<div id="RiDiscordLine">
								<SiIcons.SiDiscord />
							</div>
							<a
								id="mask__discord"
								href="https://discord.gg/7Qtk7U4"
								target="_black"
							>
								개발자의 서버
							</a>
						</ul>
						<ul id="covid-develop">
							<div id="Fisettings">
								<FiIcons.FiSettings />
							</div>
							<a id="mask__develop" href="public/develop.html">
								사이트 제작자
							</a>
						</ul>
						);
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}
export default Navbar;
