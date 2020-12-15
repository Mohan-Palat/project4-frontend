import React, { Component } from "react";
import DisplaySong from "./DisplaySong";
import {getSongList} from "./apis/Api";
import DisplayGroup from "./DisplayGroup";

class DisplaySongs extends Component {
	componentDidMount() {
		getSongList()
			.then((response) => {
				this.setState({
					songs: response.data,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});

		}
	render() {
		let allSongs = <h3>No songs!</h3>;
		if (this.props.showGroup) {
			console.log("State ShowGroup:",this.props.songGroup.length)
			if (this.props.songGroup.length > 0) {
				
				allSongs = this.props.songGroup.map((song, index) => {
					return (
						<DisplayGroup
							song={song._id.title}
							artist={song._id.artist}
							key={index}
							count={song.count}
						/>
					);
				});
			}
			
		 } 
		 else{
		allSongs = this.props.songs.map((song, index) => {
			return (
				<DisplaySong
					song={song.title}
					artist={song.artist}
					month={song.month}
					date={song.date}
					hours={song.hours}
					minutes={song.minutes}
					seconds={song.seconds}
					key={index}
					count={song.count}
				/>
			);
		});
	}
		return (
			<>
				<div className="song">
					
					<table>
						
						<th>Title</th>
						<th>Artist</th>
						<th>Played</th>
						
							{allSongs}
					
					</table>
				</div>
			</>
		);
	}
}

export default DisplaySongs;
