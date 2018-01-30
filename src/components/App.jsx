import React from 'react';

import Nav from './Nav';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';

import ExampleData from '../data/exampleVideoData';
import API_KEY from '../config/youtube';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      currentVideo: {}
    };

    this.handleVideoListEntryTitleClick = this.handleVideoListEntryTitleClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidMount() {
    this.handleSearchInputChange('');
  }

  handleSearchInputChange(query) {
    let options = {query: query, max: 10, key: API_KEY};
    this.state.videos = this.props.searchYouTube(options, (res) => {
      if (res.body) {
        let items = res.body.items;
        if (items) {
          this.setState({
            videos: items,
            currentVideo: items[0]
          });
        }
      }
    });
  }

  handleVideoListEntryTitleClick(video) {
    this.setState({
        currentVideo: video
    });
  }

  render() {
    return (
      <div>
        <Nav handleSearchInputChange={this.handleSearchInputChange} />
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleVideoListEntryTitleClick={this.handleVideoListEntryTitleClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
