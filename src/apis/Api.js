import axios from "axios";

const getSongList = () =>{
return axios.get("/")
// const songListURI = "https://nowplaying.bbgi.com/WMGQFM/list?limit=1000";
// axios
//     .get(songListURI)
    
//     return axios.get(songListURI);
}
export {getSongList};