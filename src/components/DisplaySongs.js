import React, { Component } from "react";
import DisplaySong from "./DisplaySong";
//import { getSongList } from "../apis/Api";
import DisplayCount from "./DisplayCount";

class DisplaySongs extends Component {
	sortList = (songs) => {
		songs.sort((a, b) => {
			return a.createdOn - b.createdOn;
		});
	};

	render() {
		let songLength = this.props.songs.length; //Used in statement about number of songs over season
		let songCountLength = this.props.songCount.length; //Used in statement about number of unique songs played.

		let allSongs = <h3>No songs!</h3>; //Placeholder in case API call returns 0 documents

		//Execute if the Song Count toggle is checked.
		if (this.props.showCount) {
			if (this.props.songCount.length > 0) {
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
			///Execute if Song Count toggle is not checked.
			songLength = this.props.songs.length;
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
					<p>
						{songCountLength} unique songs were played {songLength} times this
						holiday season.
					</p>
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
