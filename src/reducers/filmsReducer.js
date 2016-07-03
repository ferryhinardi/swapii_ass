import { 
  FETCH_FILMS_START, 
  FETCH_FILMS_DONE, 
  RECEIVE_FILMS, 
  FETCH_FILM_START, 
  FETCH_FILM_DONE, 
  RECEIVE_FILM,
  FETCH_MORE_FILMS_START,
  FETCH_MORE_FILMS_DONE,
  RECEIVE_MORE_FILMS } from '../constants/actionTypes';
const initialState = {
  isFetching: false,
  isFetchingMore: false,
  data: {
    count: '',
    next: '',
    previous: '',
    results: []
  },
  detail: {},
};

export default function filmsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILMS_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_FILMS_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_FILMS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    case FETCH_FILM_START:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCH_FILM_DONE:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case RECEIVE_FILM:
      return Object.assign({}, state, {
        isFetchingMore: false,
        detail: action.detail
      });

    case FETCH_MORE_FILMS_START:
      return Object.assign({}, state, {
        isFetchingMore: true
      });

    case FETCH_MORE_FILMS_DONE:
      return Object.assign({}, state, {
        isFetchingMore: false
      });

    case RECEIVE_MORE_FILMS:
      return Object.assign({}, state, {
        isFetchingMore: false,
        data: {
          results: state.data.results.concat(action.data.results),
          next: action.data.next,
          prev: action.data.prev
        }
      });

    default:
      return state;
  }
}
