import React from 'react';
import PropTypes from 'prop-types';

import VideoListEntry from './VideoListEntry';

const VideoList = (props) => (
  <div className="video-list">
    {props.videos.map((value, key) => <VideoListEntry key={key} video={value}
      handleVideoListEntryTitleClick={props.handleVideoListEntryTitleClick} />)}
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: PropTypes.array.isRequired
};

export default VideoList;
