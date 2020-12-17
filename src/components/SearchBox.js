import React, {Component} from 'react';

const SearchBox = () => {
    return(
        <input type='search'
        className='search'
        placeholder={this.props.placeholder}
        onchange={this.props.handleChange}
        />
    )
    
}

export default SearchBox