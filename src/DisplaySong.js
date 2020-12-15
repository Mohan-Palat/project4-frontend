import React, { Component } from "react";

class DisplaySong extends Component {
	render() {
		return (
			<>
				<tr>
					<td>{this.props.song}</td>
					<td>{this.props.artist}</td>
					<td>
						{this.props.month}/{this.props.date} @ {this.props.hours}:
						{this.props.minutes}:{this.props.seconds}
					</td>
					</tr>
				
			</>
		);
	}
}

export default DisplaySong;
