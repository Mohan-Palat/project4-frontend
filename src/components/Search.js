import React, { Component } from "react";
import { searchFor } from "../apis/Api";
import DisplaySong from "./DisplaySong";


class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			songs: [],
		};
	}
	componentDidMount() {
		//Takes search term from App and calls the API to retrieve the results
		searchFor(this.props.term)
			.then((response) => {
				this.setState({
					songs: response.data,
					showCount: false,
					showResults: false,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	}

	render() {
		let songLength = this.state.songs.length;
		let allSongs = <h3>No songs!</h3>;
//Renders the list of documents obtained by the search
		
			songLength = this.state.songs.length;
			allSongs = this.state.songs.map((song, index) => {
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
		
		return (
			<>
				<div className="song">
					<p>{songLength} matches found:</p>
					<table>
						<th>
							Title
							<br />
						</th>
						<th>
							Artist
							<br />
						</th>
						<th>Played</th>

						{allSongs}
					</table>
				</div>
			</>
		);
	}
}

export default Search;
