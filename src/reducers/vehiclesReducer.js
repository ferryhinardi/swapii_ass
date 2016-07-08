import { 
  FETCH_VEHICLES_START, 
  FETCH_VEHICLES_DONE, 
  RECEIVE_VEHICLES, 
  FETCH_VEHICLE_START, 
  FETCH_VEHICLE_DONE, 
  RECEIVE_VEHICLE,
  FETCH_MORE_VEHICLES_START,
  FETCH_MORE_VEHICLES_DONE,
  RECEIVE_MORE_VEHICLES } from '../constants/actionTypes';
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

export default function vehiclesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VEHICLES_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_VEHICLES_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_VEHICLES:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });

    case FETCH_VEHICLE_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_VEHICLE_DONE:
      return Object.assign({}, state, {
        isFetching: false
      });

    case RECEIVE_VEHICLE:
      return Object.assign({}, state, {
        detail: action.detail
      });

    case FETCH_MORE_VEHICLES_START:
      return Object.assign({}, state, {
        isFetchingMore: true
      });

    case FETCH_MORE_VEHICLES_DONE:
      return Object.assign({}, state, {
        isFetchingMore: false
      });

    case RECEIVE_MORE_VEHICLES:
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
