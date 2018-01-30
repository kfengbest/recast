import React from 'react';
import { shallow } from 'enzyme';

import VideoListEntry from '../../src/components/VideoListEntry';

import fakeVideoData from '../data/fakeVideoData';

describe('VideoListEntry', function() {
  let cuteCatVideo, superCuteCatVideo, hackReactorVideo;

  beforeEach(function() {
    cuteCatVideo = shallow(<VideoListEntry video={fakeVideoData[0]} />);
    superCuteCatVideo = shallow(<VideoListEntry video={fakeVideoData[1]} />);
    hackReactorVideo = shallow(<VideoListEntry video={fakeVideoData[2]} />);
  });

  test('should be a stateless functional component', function() {
    expect(React.Component.isPrototypeOf(VideoListEntry)).toBeFalsy();
  });

  test('should dynamically render a video\'s image', function() {
    const cuteCatVideoImageElement = cuteCatVideo.find('.media-object');
    const superCuteCatVideoImageElement = superCuteCatVideo.find('.media-object');
    const hackReactorVideoImageElement = hackReactorVideo.find('.media-object');

    expect(cuteCatVideoImageElement.prop('src')).toEqual('http://www.fndvisions.org/img/cutecat.jpg');
    expect(superCuteCatVideoImageElement.prop('src')).toEqual('https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg');
    expect(hackReactorVideoImageElement.prop('src')).toEqual('https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/14/hack_reactor.png');
  });

  test('should dynamically render a video\'s title', function() {
    const cuteCatVideoTitleElement = cuteCatVideo.find('.video-list-entry-title');
    const superCuteCatVideoTitleElement = superCuteCatVideo.find('.video-list-entry-title');
    const hackReactorVideoTitleElement = hackReactorVideo.find('.video-list-entry-title');

    expect(cuteCatVideoTitleElement.prop('children')).toEqual('Cute cat video');
    expect(superCuteCatVideoTitleElement.prop('children')).toEqual('Super cute cat video');
    expect(hackReactorVideoTitleElement.prop('children')).toEqual('Hack Reactor opens extension school on Mars');
  });

  test('should dynamically render a video\'s description', function() {
    const cuteCatVideoDescriptionElement = cuteCatVideo.find('.video-list-entry-detail');
    const superCuteCatVideoDescriptionElement = superCuteCatVideo.find('.video-list-entry-detail');
    const hackReactorVideoDescriptionElement = hackReactorVideo.find('.video-list-entry-detail');

    expect(cuteCatVideoDescriptionElement.prop('children')).toEqual('The best cat video on the internet!');
    expect(superCuteCatVideoDescriptionElement.prop('children')).toEqual('Better than the best cat video on the internet!');
    expect(hackReactorVideoDescriptionElement.prop('children')).toEqual('Watch the ribbon cutting of the first coding bootcamp in space');
  });
});
