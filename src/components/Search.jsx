import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
  }

  onSearchInputChange(event) {
    let target = event.target;
    let handleSearchInputChange = this.props.handleSearchInputChange;

    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      handleSearchInputChange(target.value);
    }, 500);
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" onChange={this.onSearchInputChange} />
        <button className="btn hidden-sm-down">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}


export default Search;
