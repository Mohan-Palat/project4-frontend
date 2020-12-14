import React, { Component } from "react";

class DisplaySong extends Component {
	render() {
		return (
			<>
				<div className="song">
					<ul>
						{this.props.song} - {this.props.artist} @ {this.props.hours}:
						{this.props.minutes}:{this.props.seconds}
					</ul>
					{/* {d} */}
				</div>
			</>
		);
	}
}

export default DisplaySong;
