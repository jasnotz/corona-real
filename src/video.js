import React from "react";
import "./video.css";
import Iframe from "react-iframe";

function ad() {
	return (
		<div>
			<Iframe
				class="video__style"
				width="720"
				height="480"
				src="https://www.youtube.com/embed/U_sYIKWhJvk?autoplay=1&rel=0"
				frameBorder="0"
				allowFullScreen
				allowTransparency
			></Iframe>
		</div>
	);
}

export default ad;

//
