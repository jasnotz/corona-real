import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
	return (
		<div className="table" id="table-color">
			{countries.map((country) => (
				<tr>
					<td>{country.country}</td>
					<td>
						<strong>{numeral(country.cases).format("0,0")}명</strong>
					</td>
				</tr>
			))}
		</div>
	);
}

export default Table;
