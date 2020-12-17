import React, {Component} from 'react';
import {searchFor} from "../apis/Api";
import DisplaySong from "./DisplaySong";
import DisplayCount from "./DisplayCount";

class Search extends Component {
constructor(props) {
    super(props);
    this.state = {
        searchText: "",
        songs: [],

    };
}
componentDidMount() {
    console.log("TErm: ", this.props.term)
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

render(){
    console.log("Search Results", this.state.songs);
    console.log("In DSs");
    let songLength = this.state.songs.length;
   // let songCountLength = this.state.songCount.length;

    
    let allSongs = <h3>No songs!</h3>;
    // if (this.state.showCount) {
    //     if (this.state.songCount.length > 0) {
            
    //         allSongs = this.state.songCount.map((song, index) => {
    //             return (
    //                 <DisplayCount
    //                     song={song._id.title}
    //                     artist={song._id.artist}
    //                     key={index}
    //                     count={song.count}
    //                 />
    //             );
    //         });
    //     }
    // } else 
    {
        songLength = this.state.songs.length;
        // let lastPlayed = this.props.songs.map((song, index) =>{
        // 	if (index!=this.props.songs.length-1){ } else{
        // 		return `${song.month}/${song.date}`
        // 	}
        // });
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
    return (
        <>
            <div className="song">
                {/* <p>{songCountLength} unique songs were played {songLength} times this holiday season.</p> */}
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

export default Search