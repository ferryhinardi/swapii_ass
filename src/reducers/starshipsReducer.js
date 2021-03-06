import { 
  FETCH_STARSHIPS_START, 
  FETCH_STARSHIPS_DONE, 
  RECEIVE_STARSHIPS, 
  FETCH_STARSHIP_START, 
  FETCH_STARSHIP_DONE, 
  RECEIVE_STARSHIP,
  FETCH_MORE_STARSHIPS_START,
  FETCH_MORE_STARSHIPS_DONE,
  RECEIVE_MORE_STARSHIPS } from '../constants/actionTypes';
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

export default function starshipsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STARSHIPS_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_STARSHIPS_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_STARSHIPS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    case FETCH_STARSHIP_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_STARSHIP_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_STARSHIP:
      return Object.assign({}, state, {
        detail: action.detail
      });

    case FETCH_MORE_STARSHIPS_START:
      return Object.assign({}, state, {
        isFetchingMore: true
      });

    case FETCH_MORE_STARSHIPS_DONE:
      return Object.assign({}, state, {
        isFetchingMore: false
      });

    case RECEIVE_MORE_STARSHIPS:
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
