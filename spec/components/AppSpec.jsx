import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/components/App';

import fakeVideoData from '../data/fakeVideoData';

describe('App', () => {
  let app;

  test('should be a stateful class component', () => {
    expect(React.Component.isPrototypeOf(App)).toBeTruthy();
  });

  describe('shallow mount', () => {
    beforeEach(() => {
      app = shallow(
        <App searchYouTube={() => {}}/>
      );
    });

    test('should render a single VideoPlayer component', () => {
      expect(app.find('VideoPlayer')).toHaveLength(1);
    });

    test('should render a single VideoList component', () => {
      expect(app.find('VideoList')).toHaveLength(1);
    });
  });

  describe('full mount', () => {

    describe('when rendering live data from YouTube', () => {
      let searchYouTubeStub;

      beforeEach(() => {
        searchYouTubeStub = sinon.stub();
        searchYouTubeStub.onCall(0).yields(fakeVideoData);

        app = mount(
          <App searchYouTube={searchYouTubeStub} />
        );
      });

      test('should update the video player when a video entry\'s title is clicked', () => {
        // This test will only works once `App` is refactored into a stateful class component
        // because `renderIntoDocument` does not work with stateless class components
        expect(React.Component.isPrototypeOf(App)).toBeTruthy();

        const videoEntryTitleElements = app.find('.video-list-entry-title');

        videoEntryTitleElements.forEach((videoEntryTitle) => {
          videoEntryTitle.simulate('click')
          app.update();
          const playerTitle = app.find('.video-player-details h3').prop('children');

          // This test assumes that if you can successfully update the video player's title,
          // you can also update the video and description
          expect(playerTitle).toEqual(videoEntryTitle.prop('children'));
        });
      });

      test('should call `searchYouTube` when app is initialized', () => {
        expect(searchYouTubeStub.called).toBeTruthy();
      });

      test('should load live data when app is initialized', () => {
        expect(searchYouTubeStub.called).toBeTruthy();
        const videoEntryTitleElements = app.find('.video-list-entry-title');

        videoEntryTitleElements.forEach((videoEntryTitle, i) =>
          expect(videoEntryTitle.prop('children')).toEqual(fakeVideoData[i].snippet.title)
        );
      });
    });
  });
});
