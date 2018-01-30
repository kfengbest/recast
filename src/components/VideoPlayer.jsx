import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = (props) => {
  if (props.video.id) {
    return (
      <div className="video-player">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={`https://www.youtube.com/embed/${props.video.id.videoId}?autoplay=1` || ""}
            allowFullScreen
          >
          </iframe>
        </div>
        <div className="video-player-details">
          <h3>{props.video.snippet.title || ''}</h3>
          <div>{props.video.snippet.description || ''}</div>
        </div>
      </div>
    );
  }

  return <div></div>
};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired
};

export default VideoPlayer;
