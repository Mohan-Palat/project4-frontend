import "./App.scss";
import React, { Component } from "react";
import {
	//	getSongList,
	refreshSongList,
	sortByArtist,
	sortByTitle,
	getFirstSong,
	countBySong,
	searchFor,
	getSongList,
} from "./apis/Api";
import { Route, Link } from "react-router-dom";
import About from "./pages/components/About";
import Header from "./components/Header";
//import { Button } from "semantic-ui-react";
import DisplaySongs from "./components/DisplaySongs";
import Footer from "./components/Footer";
import Today from "./components/Today";
import SearchBox from "./components/SearchBox";

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
		searchResults: [],
		showResults: false,
		viewToday: true,
		searchTerm: '',
	};

	componentDidMount() {
		this.refreshList();
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

	getTodayDate = () => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), now.getDate());
	};

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
	sortTitle = (songs) => {
		sortByTitle(this.state.titleSort, this.state.viewToday)
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
		if (this.state.titleSort === "a") {
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
		if (this.state.countSort === "d") {
			this.setState({
				countSort: "a",
			});
		} else {
			this.setState({ countSort: "d" });
		}
	};

	// searchForSong = (phrase) => {
		
	// 	searchFor(phrase)
	// 		.then((response) => {
	// 			this.setState({
	// 				searchResults: response.data,
	// 				showGroup: false,
	// 				showResults: true,
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log("API Error: ", error);
	// 		});
	// };

	updateSearch = (e) =>{
		console.log(e)
	return	this.setState({
			searchTerm: e
		})
	}

	render() {
		return (
			<>
				<header>
					<Header />
				</header>
				<section>
					<div className="intro">
						<h1>Christmas Radio Analysis of Music</h1>
						<h3>
							Featured Station:{" "}
							<a href="https://magic983.com/" target="_blank" rel="noreferrer">
								Magic 98.3
							</a>
						</h3>
						Last Updated: {this.state.lastUpdated}
					</div>
					<input type="text" value={this.state.searchTerm} onChange={(e) => this.updateSearch(e.target.value)}></input>
					<button onclick={this.searchForSong(this.state.searchTerm)}>Search</button>
					<div className="links">
						<Link to="/">
							<Link to="/">
								<button onClick={() => this.refreshList}>Today</button>
							</Link>
							<Link to="/showList">
								{/* <button onClick={() => this.refreshList()}>Full List</button> */}
							</Link>
							{/* <button onClick={() => this.showList()}>Full List</button> */}
							{/* <Link to="/showList"><button>Full List</button></Link> */}
							<Link to="/showList">
								<button onClick={() => this.countBy()}>Song Count</button>
							</Link>
							{/* <button onClick={() => this.refreshList()}>Refresh</button> */}
						</Link>
						<Link to="/about">
							<button>About</button>
						</Link>
					</div>
					<Route path="/search" exact render={() =>(
						<DisplaySongs
						songs={this.state.searchResults}
						songCount={this.state.songCount}
						showCount={this.state.showCount}
						sortArtist={this.sortArtist}
						sortTitle={this.sortTitle}
						artistLabel={this.state.artistLabel}
						titleLabel={this.state.titleLabel}
						showList={this.showList}
						showResults={this.showResults}
					/>

					)}></Route>
					<Route
						path="/showList"
						exact
						render={() => (
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
						)}
					></Route>
					<Route
						path="/"
						exact
						render={() => (
							<Today
								songs={this.state.songs}
								songCount={this.state.songCount}
								showCount={this.state.showCount}
								sortArtist={this.sortArtist}
								sortTitle={this.sortTitle}
								artistLabel={this.state.artistLabel}
								titleLabel={this.state.titleLabel}
								// showList={this.showList}
								today={this.getTodayDate()}
							/>
						)}
					></Route>
					<Route path="/about" exact component={About} />
				</section>
				<footer>
					<Footer />
				</footer>
			</>
		);
	}
}

export default App;
