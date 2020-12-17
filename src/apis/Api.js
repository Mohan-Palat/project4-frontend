import axios from "axios";

const getSongList = () => {
	return axios.get("/songs");
};

const refreshSongList = () => {
	return axios.get("/refresh");
};

const sortByArtist = (s) => {
	return axios.get(`/artist/${s}`);
};
const sortByTitle = (o) => {
	return axios.get(`/title/${o}`);
};
const searchFor = (s) => {
	return axios.get(`/search/?term=${s}`);
};

const getFirstSong = () => {
	return axios.get(`/first`);
};
const getLastSong = () => {
	return axios.get(`/last`);
};

const countBySong = (s) => {
	return axios.get(`/count/${s}`);
};

const getTodaySongs = () =>{
	return axios.get(`/today`);
}

const getTodayCount = () =>{
	return axios.get(`/todayCount`);
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
