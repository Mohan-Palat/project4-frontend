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
const sortByTitle = (s) => {
	return axios.get(`/title/${s}`);
};
const searchFor = (s) => {
	return axios.get(`/search/${s}`);
};
export { getSongList, refreshSongList, sortByArtist, sortByTitle, searchFor };
