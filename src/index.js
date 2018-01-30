import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import searchYouTube from './lib/searchYouTube';


ReactDOM.render(
  <App searchYouTube={searchYouTube} />,
  document.getElementById('app')
);

