import React, { Component } from "react";

class DisplaySong extends Component {
	render() {
		return (
			<>
				<div className="song">
					
					<table>
						
						<th>Title</th>
						<th>Artist</th>
						<th>Played on</th>
						<tr>
							<td>{this.props.song}</td>
					<td>{this.props.artist}</td>
					<td>{this.props.month}/{this.props.date} @ {this.props.hours}:
						{this.props.minutes}:{this.props.seconds}</td>
					</tr>
					</table>
				</div>
			</>
		);
	}
}

export default DisplaySong;
