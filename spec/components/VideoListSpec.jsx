import React from 'react';
import { shallow } from 'enzyme';

import VideoList from '../../src/components/VideoList';
import VideoListEntry from '../../src/components/VideoListEntry';

import fakeVideoData from '../data/fakeVideoData';

describe('VideoList', () => {
  test('should be a stateless functional component', () => {
    expect(React.Component.isPrototypeOf(VideoList)).toBeFalsy();
  });

  test('should render one `VideoListEntry` when given one video', () => {
    const videoList = shallow(
      <VideoList videos={fakeVideoData.slice(-1)} />
    );

    expect(videoList.prop('children')).toHaveLength(1);
    expect(videoList.find('VideoListEntry')).toHaveLength(1);
  });

  test('should render three `VideoListEntry` when given three videos', () => {
    const videoList = shallow(
      <VideoList videos={fakeVideoData.slice(-3)} />
    );

    expect(videoList.prop('children')).toHaveLength(3);
    expect(videoList.find('VideoListEntry')).toHaveLength(3);
  });

  test('should render five `VideoListEntry` when given five videos', () => {
    const videoList = shallow(
      <VideoList videos={fakeVideoData.slice(-5)} />
    );

    expect(videoList.prop('children')).toHaveLength(5);
    expect(videoList.find('VideoListEntry')).toHaveLength(5);
  });
});
