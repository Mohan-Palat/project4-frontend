import "./App.css";
import React, { Component } from "react";
import {
	getSongList,
	refreshSongList,
	sortByArtist,
	sortByTitle,
} from "./apis/Api";
import DisplaySong from "./DisplaySong";
// import {Route} from 'react-router-dom';
import { Button } from "semantic-ui-react";

class App extends Component {
	state = {
		color: "",
		songs: [],
		artistSort: "a",
		titleSort: "a",
	};

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

	// changeBackgroundColor = (event) => {
	// 	console.log("Change BG Color", event.target.value);
	// 	return this.setState({
	// 		color: `"${event.target.value}"`,
	// 	});
	// };

	refreshList = () => {
		refreshSongList()
			.then((response) => {
				this.setState({
					songs: response.data,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	sortArtist = () => {
		let sort = this.state.artistSort;
		sortByArtist(sort)
			.then((response) => {
				this.setState({
					songs: response.data,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
		if (sort === "a") {
			this.setState({ artistSort: "d" });
		} else {
			this.setState({ artistSort: "a" });
		}
	};
	sortTitle = () => {
		let sort = this.state.titleSort;
		sortByTitle(sort)
			.then((response) => {
				this.setState({
					songs: response.data,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
		if (sort === "a") {
			this.setState({ titleSort: "d" });
		} else {
			this.setState({ titleSort: "a" });
		}
	};

	render() {
		let allSongs = <h3>No songs!</h3>;
		if (this.state.songs.length > 0) {
			let lastUpdated = `${this.state.songs[0].month}/${this.state.songs[0].date} @ ${this.state.songs[0].hours}:${this.state.songs[0].minutes}:${this.state.songs[0].seconds}`;
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
						lastUpdated={lastUpdated}
					/>
				);
			});
		}

		return (
			<>
				<h1>Christmas Radio Analysis of Music</h1>
				<h3>Courtesy of Magic 98.3</h3>
				<Button onClick={() => this.refreshList()}>Refresh List</Button>
				<Button onClick={() => this.sortArtist()}>Sort By Artist</Button>
				<Button onClick={() => this.sortTitle()}>Sort By Title</Button>

				{/* <select
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
				</select> */}
				<div className="songList">{allSongs}</div>
			</>
		);
	}
}

export default App;
