import React, { Component } from "react";

class DisplayGroup extends Component {
	render() {
		return (
			<>
				<div className="song">
					
					<table>
						
						<th>Title</th>
						<th>Artist</th>
						<th>Count</th>
						<tr>
							<td>{this.props.song}</td>
					<td>{this.props.artist}</td>
					<td>{this.props.count}</td>
					</tr>
					</table>
				</div>
			</>
		);
	}
}

export default DisplayGroup;
