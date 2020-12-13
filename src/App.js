import "./App.css";
import React, { Component } from "react";
import { getSongList } from "./apis/Api";
import DisplaySong from "./DisplaySong";
// import {Route} from 'react-router-dom';

class App extends Component {
	state = {
		color: "",
		songs: [],
	};

	componentDidMount() {
		getSongList()
			.then((response) => {
				//console.log(response.data)

				this.setState({
					songs: response.data,
				});
				//console.log(this.state.songs);
				// 	this.setState({
				// artist: response.data.artist,
				//   title: response.data.title,
				// });
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	}

	changeBackgroundColor = (event) => {
		console.log("Change BG Color", event.target.value);
		return this.setState({
			color: `"${event.target.value}"`,
		});
	};

	// displaySongs = (songs) => {
	// 	//console.log(songs);

	// 	let allSongs = <h3>No songs!</h3>;
	// 	if (songs.length > 0) {
	// 		return songs.map((song, index) => {
	// 			<div className="song">
	// 				<p>
	// 					{song.title} - {song.artist}
	// 				</p>
	// 			</div>;
	// 			console.log(song.title, " - ", song.artist);
	// 		});
	// 	}
	// 	console.log("AllSongs(56): ", allSongs);
	// 	return allSongs;
	// };

	render() {
		//	console.log("Songs:", this.state.songs);

		let allSongs = <h3>No songs!</h3>;
		if (this.state.songs.length > 0) {
			allSongs = this.state.songs.map((song, index) => {
				return (
					<DisplaySong song={song.title} artist={song.artist} date={song.createdOn} key={index} />
				);
			});
		}

		return (
			<>
				<h1>Hello World!</h1>

				<select
					id={this.state.color}
					name={this.state.color}
					onChange={this.changeBackgroundColor}
				>
					<option value="rgb(0,255,255)">Aqua</option>
					<option value="rgb(193,154,107)">Camel Brown</option>
					<option value="rgb(255,105,180)">Hot Pink</option>
					<option value="rgb(122,255,151">Light Green</option>
					<option value="rgb(65,105,225">Royal Blue</option>
					<option value="rgb(255,255,255)">White</option>
				</select>
				<div className="songList">{allSongs}</div>
			</>
		);
	}
}

export default App;
