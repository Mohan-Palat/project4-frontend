import "./App.css";
import React, { Component } from "react";
import { getSongList } from "./apis/Api";

class App extends Component {
	componentDidMount() {
		getSongList()
			.then((response) => {
		console.log(response.data)
		// 	this.setState({
		// artist: response.data.artist,
        //   title: response.data.title,
		// });

			})
			.catch((error) => {
				console.log("API Error: ", error);
			});
	}
	constructor(props) {
		super(props);
		this.color = "";
		this.state = {
			color: props.color,
			artist: [],
			title: [],
		};
	}

	changeBackgroundColor = (event) => {
		console.log("Change BG Color", event.target.value);
		return this.setState({
			color: `"${event.target.value}"`,
		});
  };
  
  displaySongs = () =>{

  }

	render() {
		return (
			<>
				<h1>Hello World!</h1>
				<select
					id={this.state.color}
					name={this.state.color}
					onChange={this.changeBackgroundColor}
				>
					<option value="rgb(0,255,255)">Aqua</option>
					<option value="rgb(193,154,107)">Camel Brown</option>
					<option value="rgb(255,105,180)">Hot Pink</option>
					<option value="rgb(122,255,151">Light Green</option>
					<option value="rgb(65,105,225">Royal Blue</option>
					<option value="rgb(255,255,255)">White</option>
				</select>
				<div className="songinfo">
					{getSongList}
					{this.state.artist} - {this.state.title}
				</div>
			</>
		);
	}
}

export default App;
