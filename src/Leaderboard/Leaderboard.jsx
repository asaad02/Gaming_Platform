import React from "react";
import { useEffect, useState } from "react";
import './style.css';

export function Leaderboard( {game} ) {
	const [leaderboard, setLeaderboard] = useState([]);
	const [sortType, setSortType] = useState("DESC"); // ASC or DESC
	const [sortColumn, setSortColumn] = useState("score"); // rank, username, score, date_time

	const [result, setResult] = useState("No data found.");

	useEffect(() => {
		// fetch the leaderboard data
		fetch('https://cis4250w24-03.socs.uoguelph.ca/api/leaderboard/get-scores-table.php', {
			method: 'POST', 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({game, sortType, sortColumn})
		})
			// convert the response to JSON if the response is OK
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			// set the leaderboard state 
			.then(data => {
				if (data) {
					if (data === "Select a game to view the scores.") {
						setResult(data);
					} else if (data === "Coming Soon...") {
						setResult(data);
						setLeaderboard([]);
					} else {
						setLeaderboard(data);
					}
				} else {
					setLeaderboard([]);
					console.log("No data found.");
				}
			}
		)
		.catch(error => {
			//console.error("Error fetching leaderboard data: ", error);
			setResult("Error  fetching  leaderboard  data.");
		}
		);
	}, [game, sortType, sortColumn]);

	// Function to handle the sorting of the leaderboard
	const handleSort = (column) => {
		if (column === sortColumn) {
			if (sortType === "DESC") {
				setSortType("ASC");
			} else {
				setSortType("DESC");
			}
		} else {
			setSortColumn(column);
			setSortType("DESC");
		}
	};

	// Function to render the arrows for the sorting based on the column being sorted
	function renderArrows(columnToSort) {
		const upArrow = <span>&#9650;</span>;
		const upArrowWithStyle = <span style={{color: "#29BF12"}}>&#9650;</span>;
		
		const downArrow = <span>&#9660;</span>;
		const downArrowWithStyle = <span style={{color: "#592E83"}}>&#9660;</span>;

		return (
		  <>
		  	 {/*
			  * If the column is the one being sorted, then display the up arrow in green if the sortType is DESC
			  *	Else, display the up arrow with no style
			  * Check if the leaderboard is not empty to avoid displaying the up arrow when the leaderboard is empty.
			  */}
			{sortColumn === columnToSort ? (
			  	(sortType ===  "DESC" && leaderboard.length > 0) ? (
					<span>{upArrowWithStyle}</span>
			  	) : (
					<span>{upArrow}</span>
			  	)
			) : (
			  	<span>{upArrow}</span>
			)}
			
			<br />

			{/*
			  * If the column is the one being sorted, then display the down arrow in purple if the sortType is ASC
			  * Else, display the down arrow with no style
			  * Check if the leaderboard is not empty to avoid displaying the down arrow when the leaderboard is empty. 
			  */}
			{sortColumn === columnToSort ? (
			  	(sortType === "ASC" && leaderboard.length > 0) ? (
					<span>{downArrowWithStyle}</span>
			  	) : (
					<span>{downArrow}</span>
			  	)
			) : (
			  	<span>{downArrow}</span>
			)}
		  </>
		);
	  }


	return (
		<table id="table-container">
			<thead>
				<tr>
					{/*<th onClick = {() => handleSort("score")}>Rank</th>  Rank not working yet*/}
					<th onClick = {() => handleSort("username")}>
						<div className="th-arrows">
							<div>Username</div>
							<div className="th-arrow">
								{renderArrows("username")}
							</div>
						</div>
					</th>
					<th onClick = {() => handleSort("score")}>
						<div className="th-arrows">
							<div>Score</div>
							<div className="th-arrow">
								{renderArrows("score")}
							</div>
						</div>
					</th>
					<th onClick = {() => handleSort("date_time")}>
						<div className="th-arrows">
							<div>Date</div>
							<div className="th-arrow">
								{renderArrows("date_time")}
							</div>
						</div>
					</th>
				</tr>
			</thead>
				{leaderboard.length > 0 ? (
					<div id="body-wrap">
						<tbody>
							{leaderboard.map((row, index) => (
								<tr key={index}>
									{/*<td>{index + 1}</td>      Rank not working yet*/}
									<td>{row.username}</td>
									<td>{row.score}</td>
									<td>{row.date_time}</td>
								</tr>
							))}
						</tbody>
					</div>		
			) : (
				<tbody id="error">
					<h1>{result}</h1>	
				</tbody>	
			)}
		</table>
	);
}

export default Leaderboard;
