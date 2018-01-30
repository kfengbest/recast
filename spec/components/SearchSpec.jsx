import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/components/App';
import Search from '../../src/components/Search';

import fakeVideoData from '../data/fakeVideoData';
import moreFakeVideoData from '../data/moreFakeVideoData';

describe ('Search', () => {
  let app, searchYouTubeStub;

  describe('when rendering live data from YouTube', () => {
    beforeEach(() => {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.onCall(0).returns(fakeVideoData);
      searchYouTubeStub.onCall(1).returns(moreFakeVideoData);

      app = mount(
        <App searchYouTube={searchYouTubeStub} />
      );
    });

    test('should load live data when app is initialized', () => {
      const videoEntryTitleElements = app.find('.video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.prop('children')).toEqual(fakeVideoData[i].snippet.title);
      });
    });

    test('should update the video list when typing into the input box', () => {
      const videoEntryTitleElements = app.find('.video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.prop('children')).toEqual(fakeVideoData[i].snippet.title);
      });

      const searchInputElement = app.find('.form-control');
      searchInputElement.simulate('change', {target: {value: 'React tutorial'}});

      const newVideoEntryTitleElements = app.find('.video-list-entry-title');
      newVideoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.prop('children')).toEqual(moreFakeVideoData[i].snippet.title);
      });
    });

  });

  describe('debounced search method', () => {
    beforeEach(() => {
      searchYouTubeStub = jest.fn();

      app = mount(
        <Search handleSearchInputChange={searchYouTubeStub} />
      );
    });

    test('should debounce requests to YouTube API by 500ms', (done) => {
      const searchInputElement = app.find('.form-control');

      // should be called initially when the App renders
      expect(searchYouTubeStub).toHaveBeenCalledTimes(0);
      searchInputElement.simulate('change', {target: {value: 'React tutorial'}});

      setTimeout(() => {
        expect(searchYouTubeStub).toHaveBeenCalledTimes(1);

        setTimeout(() => {
          searchInputElement.simulate('change', {target: {value: 'React tutorial'}});
          expect(searchYouTubeStub).toHaveBeenCalledTimes(1);

          setTimeout(()=> {
            searchInputElement.simulate('change', {target: {value: 'React tutorial'}});

            expect(searchYouTubeStub).toHaveBeenCalledTimes(2);
            done();
          }, 505)
        }, 505);
      }, 505);
    });
  });
});
