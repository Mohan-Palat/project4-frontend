import React, { Component } from "react";

class DisplayGroup extends Component {
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

export default DisplayGroup;
