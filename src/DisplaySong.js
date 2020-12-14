import React, { Component } from "react";

class DisplaySong extends Component {
	render() {
		return (
			<>
				<div className="song">
					Last Updated: {this.props.lastUpdated}
					<ul>
						{this.props.song} - {this.props.artist} @ {this.props.month}/{this.props.date} {this.props.hours}:
						{this.props.minutes}:{this.props.seconds}
					</ul>
					{/* {d} */}
				</div>
			</>
		);
	}
}

export default DisplaySong;
