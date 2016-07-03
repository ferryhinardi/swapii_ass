import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = 'films/'
export function fetchFilmsStart() {
  return {
    type: types.FETCH_FILMS_START
  };
}

export function fetchFilmsDone() {
  return {
    type: types.FETCH_FILMS_DONE
  };
}

export function receiveFilms(data) {
  return {
    type: types.RECEIVE_FILMS,
    data
  };
}

export function fetchFilms() {
  return (dispatch) => {
    dispatch(fetchFilmsStart());
    
    const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchFilmsDone());
        dispatch(receiveFilms(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchFilms: ', res); //eslint-disable-line
      });
  };
}

export function fetchFilmStart() {
  return {
    type: types.FETCH_FILM_START
  };
}

export function fetchFilmDone() {
  return {
    type: types.FETCH_FILM_DONE
  };
}

export function receiveFilm(detail) {
  return {
    type: types.RECEIVE_FILM,
    detail
  };
}

export function fetchFilm(id) {
  return (dispatch) => {
    dispatch(fetchFilmStart());

    const payload = {
      url: `${endpoint}${id}/`
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchFilmDone());
        dispatch(receiveFilm(res.data))
      })
      .catch((res) => {
        console.log('Catch fetchFilm: ', res); //eslint-disable-line
      });
  };
}

export function fetchMoreFilmsStart() {
  return {
    type: types.FETCH_MORE_FILMS_START
  };
}

export function fetchMoreFilmsDone() {
  return {
    type: types.FETCH_MORE_FILMS_DONE
  };
}

export function receiveMoreFilms(data) {
  return {
    type: types.RECEIVE_MORE_FILMS,
    data
  };
}

export function fetchMoreFilms() {
  return (dispatch, getState) => {
    const next = getState().films.data.next;
    
    if (next == "" || next == null) {
      dispatch(fetchMoreFilmsDone());
    }
    else {
      dispatch(fetchMoreFilmsStart());

      const payload = {
        method: 'get',
        url: next
      };
      RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchMoreFilmsDone());
        dispatch(receiveMoreFilms(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchMoreFilms: ', res); //eslint-disable-line
      });
    }
  };
}