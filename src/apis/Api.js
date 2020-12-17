import axios from "axios";

const getSongList = (o) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/${o}`);
};

const refreshSongList = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/refresh`);
};

const sortByArtist = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/artist/${s}`);
};
const sortByTitle = (o) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/title/${o}`);
};
const searchFor = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/search/?term=${s}`);
};

const getFirstSong = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/first`);
};
const getLastSong = () => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/last`);
};

const countBySong = (s) => {
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/count/${s}`);
};

const getTodaySongs = () =>{
	return axios.get(`${process.env.REACT_APP_BACKEND_URL}/today`);
}

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
