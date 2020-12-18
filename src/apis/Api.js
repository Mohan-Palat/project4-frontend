import axios from "axios";

//Passes back songs in order of most recently played.
const getSongList = (o) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/songs/${o}`);
};
//Gets the song list from the API.
const refreshSongList = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/refresh`);
};
//Sorts the collection by artist name.
const sortByArtist = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/artist/${s}`);
};
//Sorts the collection by title.
const sortByTitle = (o) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/title/${o}`);
};
const searchFor = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/search/?term=${s}`);
};

//Gets list of songs played today since 12:00a
const getFirstSong = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/first`);
};

//Not currently used.  Will be for future functionality.
const getLastSong = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/last`);
};

//Used for song count - groups by title and artist.
const countBySong = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/count/${s}`);
};

//Gets list of songs played today since 12:00a
const getTodaySongs = () =>{
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/today`);
}

//Gets count of songs played today since 12:00a
const getTodayCount = () =>{
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/todayCount`);
}
export {
	refreshSongList,
	sortByArtist,
	sortByTitle,
	searchFor,
	getFirstSong,
	countBySong,
	getLastSong,
	getTodaySongs,
	getTodayCount,
	getSongList,
};
