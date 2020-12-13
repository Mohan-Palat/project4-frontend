import React, { Component } from "react";

class DisplaySong extends Component {
	render() {
        
		return (
			<>
				<div className="song">
					<ul>
						{this.props.song} - {this.props.artist}
					</ul>
					{/* {d} */}
				</div>
			</>
		);
	}
}

export default DisplaySong;
