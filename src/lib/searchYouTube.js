import request from 'superagent'

const searchYouTube = (options, callback) => {
  return request
    .get("https://www.googleapis.com/youtube/v3/search")
    .query({
      q: options.query,
      maxResults: options.max,
      key: options.key,
      type: 'video',
      part: 'snippet',
      videoEmbeddable: 'true'
    })
    .then(function(res) {
      callback(res);
    })
    .catch(function(err) {
      return err;
    });

};

export default searchYouTube;
