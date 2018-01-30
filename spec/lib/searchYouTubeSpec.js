import request from 'superagent';
import superagentMock from 'superagent-mock';

import searchYouTube from '../../src/lib/searchYouTube';

const getURLSearchParams = (url) =>
  url
    .split('?')[1]
    .split('&')
    .reduce((map, params) => {
      const [key, value] = params.split('=');
      map[key] = value;
      return map;
    }, {});

const hasSameShape = (objectOne, objectTwo) => {
  if (Object.keys(objectOne).length !== Object.keys(objectTwo).length) {
    return false;
  }

  for (let key in objectOne) {
    if (!key in objectTwo) {
      return false;
    }

    if (typeof objectOne[key] !== typeof objectTwo[key]) {
      return false;
    }

    if (Object.prototype.toString.call(objectOne[key]) === '[object Object]') {
      return hasSameShape(objectOne[key], objectTwo[key]);
    }
  }

  return true;
};

const mockConfig = [
  {
    pattern: 'https://www.googleapis.com/youtube/v3/search/*',
    fixtures () {},
    get (match) {
      const mockResponse = {
        statusCode: 200,
        body: {
          items: [],
        },
      };

      return mockResponse;
    },
  },
];

describe('searchYouTube', () => {
  let mock;
  const logger = jest.fn();

  beforeEach(() => {
    mock = superagentMock(request, mockConfig, logger);
  });

  afterEach(() => {
    mock.unset();
    jest.resetAllMocks();
  });

  test('should send a GET request', () => {
    searchYouTube({}, () => {});

    const [[{ method }]] = logger.mock.calls;
    expect(method).toEqual('GET');
  });

  test('should accept `key`, `query`, and `max` options and send them in GET request', () => {
    searchYouTube({ key: 'API_KEY', query: 'cats', max: 10 }, () => {});

    const [[{ url }]] = logger.mock.calls;
    const params = getURLSearchParams(url);
    expect(params.key).toEqual('API_KEY');
    expect(params.q).toEqual('cats');
    expect(params.maxResults).toEqual('10');
  });
});
