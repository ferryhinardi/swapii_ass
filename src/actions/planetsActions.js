import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = 'planets/';
export function fetchPlanetsStart() {
  return {
    type: types.FETCH_PLANETS_START
  };
}

export function fetchPlanetsDone() {
  return {
    type: types.FETCH_PLANETS_DONE
  };
}

export function receivePlanets(data) {
  return {
    type: types.RECEIVE_PLANETS,
    data
  };
}

export function fetchPlanets() {
  return (dispatch) => {
    dispatch(fetchPlanetsStart());

    const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchPlanetsDone());
        dispatch(receivePlanets(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchPlanets: ', res); //eslint-disable-line
      });
  };
}

export function fetchPlanetStart() {
  return {
    type: types.FETCH_PLANET_START
  };
}

export function fetchPlanetDone() {
  return {
    type: types.FETCH_PLANET_DONE
  };
}

export function receivePlanet(detail) {
  return {
    type: types.RECEIVE_PLANET,
    detail
  };
}

export function fetchPlanet(id) {
  return (dispatch) => {
    dispatch(fetchPlanetStart());

    const payload = {
      url: `${endpoint}${id}/`
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchPlanetDone());
        dispatch(receivePlanet(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchPlanet: ', res); //eslint-disable-line
      });
  };
}

export function fetchMorePlanetsStart() {
  return {
    type: types.FETCH_MORE_PLANETS_START
  };
}

export function fetchMorePlanetsDone() {
  return {
    type: types.FETCH_MORE_PLANETS_DONE
  };
}

export function receiveMorePlanets(data) {
  return {
    type: types.RECEIVE_MORE_PLANETS,
    data
  };
}

export function fetchMorePlanets() {
  return (dispatch, getState) => {
    const next = getState().planets.data.next;
    
    if (next == "" || next == null) {
      dispatch(fetchMorePlanetsDone());
    }
    else {
      dispatch(fetchMorePlanetsStart());

      const payload = {
        method: 'get',
        url: next
      };
      RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchMorePlanetsDone());
        dispatch(receiveMorePlanets(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchMorePlanets: ', res); //eslint-disable-line
      });
    }
  };
}