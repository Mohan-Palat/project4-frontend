import axios from "axios";

const getSongList = () => {
	return axios.get("/songs");
	// const songListURI = "https://nowplaying.bbgi.com/WMGQFM/list?limit=1000";
	// axios
	//     .get(songListURI)

	//     return axios.get(songListURI);
};

const refreshSongList = () =>{
    return axios.get("/refresh");
}
export { getSongList, refreshSongList };
