import React, {Component} from 'react';
//import 

class Search extends Component {
constructor(prop) {
    super(props);
    this.state = {
        searchText,

    };
}

onTextBoxChange = (e) =>{
    console.log("On text change", event.target);
    this.setState({
        //searchText: event.target.value,
    })
}

searchFor = (e) =>{
    e.PreventDefault();

}
render(){

    return(
        <h2>Hi!</h2>
    )
}
}

export default Search