import "./App.scss";
import React, { Component } from "react";
import {
	getSongList,
	refreshSongList,
	sortByArtist,
	sortByTitle,
	getFirstSong,
	countBySong,
	searchFor,
} from "./apis/Api";
import {Route, Link} from 'react-router-dom';
import About from './pages/components/About';
import Header from './Header';
//import { Button } from "semantic-ui-react";
import DisplaySongs from './DisplaySongs';
import Footer from './Footer';

class App extends Component {
	state = {
		songs: [],
		artistSort: "a",
		titleSort: "a",
		countSort: "d",
		lastUpdated: "",
		count: "",
		songCount: [],
		showCount: false,
		titleLabel: "A-Z",
		artistLabel: "A-Z",
		results: [],
		showResults: false,
	};

	componentDidMount() {
		this.refreshList();
		// 	.then((response) => {
		// 		this.setState({
		// 			songs: response.data,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.log("API Error: ", error);
		// 	});
		// this.lastUpdatedDate();
		
	}

	showList = () =>{
		getSongList()
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

	refreshList = () => {
		refreshSongList()
			.then((response) => {
				this.setState({
					songs: response.data,
					showCount: false,
					showResults: false,
					lastUpdated: this.lastUpdatedDate(),
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
					showCount: false,
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
					showCount: false,
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

	countBy = () => {
		countBySong(this.state.countSort)		
			.then((response) => {
				this.setState({
					songCount: response.data,
					showCount: true,
					showResults: false,
					
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
			if(this.state.countSort==="d"){
				this.setState({
					countSort: "a"
				});
			} else{ this.setState({countSort: "d"})}
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
			<header><Header /></header>
			<section>
<div className="intro">
	
				<h1>Christmas Radio Analysis of Music</h1>
				<h3>Featured Station: <a href="https://magic983.com/" target="_blank">Magic 98.3</a></h3>
				
				
				Last Updated: {this.state.lastUpdated}
				
				</div>
				<div className="links">
					<Link to="/">

				<Link to="/showList"><button onClick={() => this.refreshList()}>Full List</button></Link>
				{/* <button onClick={() => this.showList()}>Full List</button> */}
				{/* <Link to="/showList"><button>Full List</button></Link> */}
				<Link to="/showList"><button onClick={() => this.countBy()}>Song Count</button></Link>
				{/* <button onClick={() => this.refreshList()}>Refresh</button> */}
				</Link>
				<Link to="/about"><button>About</button></Link>
				</div>
				<Route path="/showList" exact render= { () =>
					<DisplaySongs
					
					songs={this.state.songs}
					songCount={this.state.songCount}
					showCount={this.state.showCount}
					sortArtist={this.sortArtist}
					sortTitle={this.sortTitle}
					artistLabel={this.state.artistLabel}
					titleLabel={this.state.titleLabel}
					showList={this.showList}
					 />
					}></Route>
				<Route path="/about" exact component={About} />
					</section>
					<footer><Footer /></footer>
			</>
		);
	}
}

export default App;
