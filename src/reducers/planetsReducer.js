import { 
  FETCH_PLANETS_START, 
  FETCH_PLANETS_DONE, 
  RECEIVE_PLANETS, 
  FETCH_PLANET_START, 
  FETCH_PLANET_DONE, 
  RECEIVE_PLANET,
  FETCH_MORE_PLANETS_START,
  FETCH_MORE_PLANETS_DONE,
  RECEIVE_MORE_PLANETS } from '../constants/actionTypes';
const initialState = {
  isFetching: false,
  isFetchingMore: false,
  data: {
    count: '',
    next: '',
    previous: '',
    results: []
  },
  detail: {}
};

export default function planet(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLANETS_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_PLANETS_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_PLANETS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    case FETCH_PLANET_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_PLANET_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_PLANET:
      return Object.assign({}, state, {
        detail: action.detail
      });

    case FETCH_MORE_PLANETS_START:
      return Object.assign({}, state, {
        isFetchingMore: true
      });

    case FETCH_MORE_PLANETS_DONE:
      return Object.assign({}, state, {
        isFetchingMore: false
      });

    case RECEIVE_MORE_PLANETS:
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
