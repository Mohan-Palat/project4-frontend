import "./App.scss";
import React, { Component } from "react";
import {
	getSongList,
	refreshSongList,
	sortByArtist,
	sortByTitle,
	getFirstSong,
	groupBySong,
	searchFor,
} from "./apis/Api";
import {Route} from 'react-router-dom';
import About from './About';
import Header from './Header';
//import { Button } from "semantic-ui-react";
import DisplaySongs from './DisplaySongs';

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
		results: [],
		showResults: false,
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
				showGroup: false,
				showResults: false,
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
					showResults: false,
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
					showResults: false,
					
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
					showResults: false,
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
					showResults: false,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	searchForSong = (phrase) =>{
		searchFor(phrase)
		.then((response) =>{
			this.setState({
				results: response.data,
				showGroup: false,
				showResults: true,
			})
		})
		.catch((error) =>{
			console.log("API Error: ", error)
		})

	}

	render() {
		return (
			<>
			<Header />
<div className="intro">
	
				<h1>Christmas Radio Analysis of Music</h1>
				<h3>Courtesy of Magic 98.3</h3>
				Last Updated: {this.state.lastUpdated}
				
				</div>
				<div className="links">
				<button onClick={() => this.showList()}>By Date</button>
				<button onClick={() => this.sortArtist()}>By Artist {this.state.artistLabel}</button>
				<button onClick={() => this.sortTitle()}>By Title {this.state.titleLabel}</button>
				<button onClick={() => this.groupBy()}>Song Count</button>
				<button onClick={() => this.refreshList()}>Refresh List</button>
				
				</div>
				
					<DisplaySongs
					songs={this.state.songs}
					songGroup={this.state.songGroup}
					showGroup={this.state.showGroup}
					 />
			</>
		);
	}
}

export default App;
