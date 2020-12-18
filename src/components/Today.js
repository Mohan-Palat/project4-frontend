import React, { Component } from "react";
import DisplaySong from "./DisplaySong";
import { getTodayCount, getTodaySongs } from "../apis/Api";
import DisplayCount from "./DisplayCount";

class Today extends Component {
	state = {
		compareDate: new Date().getDate(),
		songs: [],
		songCount: [],
		showList: false,
		today: true,
	};

	//Calls the API for the collection of documents for the songs played on the current date since 12:00a.
	componentDidMount() {
		this.getToday();
		this.todayCount();
	}

	getToday = () => {
		getTodaySongs()
			.then((response) => {
				this.setState({
					songs: response.data,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	todayCount = () => {
		getTodayCount()
			.then((response) => {
				this.setState({
					songCount: response.data,
					showCount: true,
				});
			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	};

	render() {
		let hours = new Date().getHours();
		let songLength = 0;
		let songAverage = 0;
		
		let allSongs = <h3>No songs!</h3>;
		let allCountSongs = <h3>No songs!</h3>;
		
		allCountSongs = this.state.songCount.map((song, index) => {
			return (
				<DisplayCount
					song={song._id.title}
					artist={song._id.artist}
					key={index}
					count={song.count}
				/>
			);
		});

		songLength = this.state.songs.length;
		
		if (hours === 0) {
			songAverage = Math.floor(songLength / (hours + 1));
		} else {
			songAverage = Math.floor(songLength / hours);
		}
		
		
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
					<p>
						{allCountSongs.length} unique songs were played {songLength} times
						today. That's about {songAverage} per hour!
					</p>
					<p>
						Below are the unique songs and the number of times they played
						today.
					</p>
					<table>
						<th onClick={() => this.props.sortTitle(this.state.songs)}>
							Title
							<br /> (sort {this.props.titleLabel})
						</th>
						<th onClick={() => this.props.sortArtist()}>
							Artist
							<br /> (sort {this.props.artistLabel})
						</th>
						<th onClick={() => this.props.showList()}>Played</th>
						{allCountSongs}
					</table>
					<h1 onClick={() => this.setState({ showList: true })}>Full List:</h1>

					<table>
						<th onClick={() => this.props.sortTitle(this.state.songs)}>
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

export default Today;
