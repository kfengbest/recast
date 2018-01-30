import React from 'react';
import { shallow } from 'enzyme';

import VideoPlayer from '../../src/components/VideoPlayer';

import fakeVideoData from '../data/fakeVideoData';

describe ('VideoPlayer', () => {
  let cuteCatVideo, superCuteCatVideo, hackReactorVideo;

  beforeEach(() => {
    cuteCatVideo = shallow(<VideoPlayer video={fakeVideoData[0]} />);
    superCuteCatVideo = shallow(<VideoPlayer video={fakeVideoData[1]} />);
    hackReactorVideo = shallow(<VideoPlayer video={fakeVideoData[2]} />);
  });

  test('should be a stateless functional component', () => {
    expect(React.Component.isPrototypeOf(VideoPlayer)).toBeFalsy();
  });

  test('should dynamically render a video', () => {
    const cuteCatVideoIFrameElement = cuteCatVideo.find('.embed-responsive-item');
    const superCuteCatVideoIFrameElement = superCuteCatVideo.find('.embed-responsive-item');
    const hackReactorVideoIFrameElement = hackReactorVideo.find('.embed-responsive-item');

    expect(cuteCatVideoIFrameElement.prop('src')).toEqual('https://www.youtube.com/embed/000001?autoplay=1');
    expect(superCuteCatVideoIFrameElement.prop('src')).toEqual('https://www.youtube.com/embed/000002?autoplay=1');
    expect(hackReactorVideoIFrameElement.prop('src')).toEqual('https://www.youtube.com/embed/000003?autoplay=1');
  });

  test('should dynamically render a video\'s title', () => {
    const cuteCatVideoTitleElement = cuteCatVideo.find('.video-player-details');
    const superCuteCatVideoTitleElement = superCuteCatVideo.find('.video-player-details');
    const hackReactorVideoTitleElement = hackReactorVideo.find('.video-player-details');

    expect(cuteCatVideoTitleElement.childAt(0).prop('children')).toEqual('Cute cat video');
    expect(superCuteCatVideoTitleElement.childAt(0).prop('children')).toEqual('Super cute cat video');
    expect(hackReactorVideoTitleElement.childAt(0).prop('children')).toEqual('Hack Reactor opens extension school on Mars');
  });

  test('should dynamically render a video\'s description', () => {
    const cuteCatVideoDescriptionElement = cuteCatVideo.find('.video-player-details');
    const superCuteCatVideoDescriptionElement = superCuteCatVideo.find('.video-player-details');
    const hackReactorVideoDescriptionElement = hackReactorVideo.find('.video-player-details');

    expect(cuteCatVideoDescriptionElement.childAt(1).prop('children')).toEqual('The best cat video on the internet!');
    expect(superCuteCatVideoDescriptionElement.childAt(1).prop('children')).toEqual('Better than the best cat video on the internet!');
    expect(hackReactorVideoDescriptionElement.childAt(1).prop('children')).toEqual('Watch the ribbon cutting of the first coding bootcamp in space');
  });
});
