import { 
  FETCH_SPECIESES_START, 
  FETCH_SPECIESES_DONE, 
  RECEIVE_SPECIESES, 
  FETCH_SPECIES_START, 
  FETCH_SPECIES_DONE, 
  RECEIVE_SPECIES,
  FETCH_MORE_SPECIESES_START,
  FETCH_MORE_SPECIESES_DONE,
  RECEIVE_MORE_SPECIESES } from '../constants/actionTypes';
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

export default function speciesesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPECIESES_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_SPECIESES_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_SPECIESES:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    case FETCH_SPECIES_START:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case FETCH_SPECIES_DONE:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case RECEIVE_SPECIES:
      return Object.assign({}, state, {
        detail: action.detail
      });

    case FETCH_MORE_SPECIESES_START:
      return Object.assign({}, state, {
        isFetchingMore: true
      });

    case FETCH_MORE_SPECIESES_DONE:
      return Object.assign({}, state, {
        isFetchingMore: false
      });

    case RECEIVE_MORE_SPECIESES:
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
