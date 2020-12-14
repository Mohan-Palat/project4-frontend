import "./App.scss";
import React, { Component } from "react";
import {
	getSongList,
	refreshSongList,
	sortByArtist,
	sortByTitle,
	getFirstSong,
	groupBySong,
} from "./apis/Api";
import DisplaySong from "./DisplaySong";
import DisplayGroup from "./DisplayGroup";
// import {Route} from 'react-router-dom';
//import { Button } from "semantic-ui-react";

class App extends Component {
	state = {
		songs: [],
		artistSort: "a",
		titleSort: "a",
		lastUpdated: "",
		count: "",
		songGroup: [],
		showGroup: false,
		titleLabel: "A-Z",
		artistLabel: "A-Z",
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
		this.lastUpdatedDate();
		
	}

	showList = () =>{
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

	refreshList = () => {
		refreshSongList()
			.then((response) => {
				this.setState({
					songs: response.data,
					showGroup: false,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
		this.lastUpdatedDate();
	};

	sortArtist = () => {
		let sort = this.state.artistSort;
		sortByArtist(sort)
			.then((response) => {
				this.setState({
					songs: response.data,
					showGroup: false,
					
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
		if (sort === "a") {
			this.setState({ artistSort: "d", artistLabel: "Z-A" });
		} else {
			this.setState({ artistSort: "a", artistLabel: "A-Z" });
		}
	};
	sortTitle = () => {
		let sort = this.state.titleSort;
		sortByTitle(sort)
			.then((response) => {
				this.setState({
					songs: response.data,
					showGroup: false,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
		if (sort === "a") {
			this.setState({ titleSort: "d", titleLabel: "Z-A" });
		} else {
			this.setState({ titleSort: "a", titleLabel: "A-Z" });
		}
	};

	lastUpdatedDate = () => {
		getFirstSong()
			.then((response) => {
				this.setState({
					lastUpdated: `${response.data[0].month}/${response.data[0].date} @ ${response.data[0].hours}:${response.data[0].minutes}:${response.data[0].seconds}`,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	groupBy = () => {
		groupBySong()
			.then((response) => {
				this.setState({
					songGroup: response.data,
					showGroup: true,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	render() {
		let allSongs = <h3>No songs!</h3>;
		console.log(this.state.showGroup)
		if (this.state.showGroup) {
			if (this.state.songGroup.length > 0) {
				allSongs = this.state.songGroup.map((song, index) => {
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
			
		} else {
			if (this.state.songs.length > 0) {
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
			}
		}
		return (
			<>
			<div class="lights">
			<ul class="lightrope">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  
</ul>
</div> 
<div class="intro">
				<h1>Christmas Radio Analysis of Music</h1>
				<h3>Courtesy of Magic 98.3</h3>
				<div class="refresh">
				Last Updated: {this.state.lastUpdated}
				</div>
				<button onClick={() => this.showList()}>By Date</button>
				<button onClick={() => this.sortArtist()}>By Artist {this.state.artistLabel}</button>
				<button onClick={() => this.sortTitle()}>By Title {this.state.titleLabel}</button>
				<button onClick={() => this.groupBy()}>Song Count</button>
				<button onClick={() => this.refreshList()}>Refresh List</button>
				
				</div>
				<div className="songList">{allSongs}</div>
			</>
		);
	}
}

export default App;
