import React, { Component } from "react";
//Displays song title, artist, and count played in a table
class DisplayCount extends Component {
	render() {
		return (
			<>
				<tr>
					<td>{this.props.song}</td>
					<td>{this.props.artist}</td>
					<td>{this.props.count}</td>
				</tr>
			</>
		);
	}
}

export default DisplayCount;
