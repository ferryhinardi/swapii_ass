import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = 'starships/';
export function fetchStarshipsStart() {
  return {
    type: types.FETCH_STARSHIPS_START
  };
}

export function fetchStarshipsDone() {
  return {
    type: types.FETCH_STARSHIPS_DONE
  };
}

export function receiveStarships(data) {
  return {
    type: types.RECEIVE_STARSHIPS,
    data
  };
}

export function fetchStarships() {
  return (dispatch) => {
    dispatch(fetchStarshipsStart());

    const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchStarshipsDone());
        dispatch(receiveStarships(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchStarships: ', res); //eslint-disable-line
      });
  };
}

export function fetchStarshipStart() {
  return {
    type: types.FETCH_STARSHIP_START
  };
}

export function fetchStarshipDone() {
  return {
    type: types.FETCH_STARSHIP_DONE
  };
}

export function receiveStarship(detail) {
  return {
    type: types.RECEIVE_STARSHIP,
    detail
  };
}

export function fetchStarship(id) {
  return (dispatch) => {
    dispatch(fetchStarshipStart());

    const payload = {
      url: `${endpoint}${id}/`
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchStarshipDone());
        dispatch(receiveStarship(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchStarship: ', res); //eslint-disable-line
      });
  };
}

export function fetchMoreStarshipsStart() {
  return {
    type: types.FETCH_MORE_STARSHIPS_START
  };
}

export function fetchMoreStarshipsDone() {
  return {
    type: types.FETCH_MORE_STARSHIPS_DONE
  };
}

export function receiveMoreStarships(data) {
  return {
    type: types.RECEIVE_MORE_STARSHIPS,
    data
  };
}

export function fetchMoreStarships() {
  return (dispatch, getState) => {
    const next = getState().starships.data.next;
    
    if (next == "" || next == null) {
      dispatch(fetchMoreStarshipsDone());
    }
    else {
      dispatch(fetchMoreStarshipsStart());

      const payload = {
        method: 'get',
        url: next
      };
      RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchMoreStarshipsDone());
        dispatch(receiveMoreStarships(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchMoreStarships: ', res); //eslint-disable-line
      });
    }
  };
}