import React, { Component } from "react";
import DisplaySong from "./DisplaySong";
//import { getSongList } from "../apis/Api";
import DisplayCount from "./DisplayCount";

class DisplaySongs extends Component {
	state = {
		compareDate: new Date().getDate(),
	};
	componentDidMount() {
		// getSongList()
		// 	.then((response) => {
		// 		this.setState({
		// 			songs: response.data,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log("API Error: ", error);
		// 	});
	}
	render() {
		console.log("Showcount: ", this.props.showCount);
		
		let songLength = 0;
		
	//	let lastPlayed='';
		let allSongs = <h3>No songs!</h3>;
		if (this.props.showCount) {
			if (this.props.songCount.length > 0) {
				songLength = this.props.songCount.length;
				allSongs = this.props.songCount.map((song, index) => {
					return (
						<DisplayCount
							song={song._id.title}
							artist={song._id.artist}
							key={index}
							count={song.count}
						/>
					);
				});
			}
		} else {
			console.log("DS Sort: ",this.props.titleSort)
			songLength = this.props.songs.length;
			// let lastPlayed = this.props.songs.map((song, index) =>{
			// 	if (index!=this.props.songs.length-1){ } else{
			// 		return `${song.month}/${song.date}`
			// 	}
			// });
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
					<p>{songLength} unique songs played this holiday season.</p>
					<table>
						<th onClick={() => this.props.sortTitle(allSongs)}>
							Title
							<br /> (sort {this.props.titleLabel})
						</th>
						<th onClick={() => this.props.sortArtist()}>
							Artist
							<br /> (sort {this.props.artistLabel})
						</th>
						<th onClick={() => this.props.showList()}>Played</th>

						{allSongs}
					</table>
				</div>
			</>
		);
	}
}

export default DisplaySongs;
