import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = 'vehicles/'
export function fetchVehiclesStart() {
  return {
    type: types.FETCH_VEHICLES_START
  };
}

export function fetchVehiclesDone() {
  return {
    type: types.FETCH_VEHICLES_DONE
  };
}

export function receiveVehicles(data) {
  return {
    type: types.RECEIVE_VEHICLES,
    data
  };
}

export function fetchVehicles() {
  return (dispatch) => {
    dispatch(fetchVehiclesStart());

    const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchVehiclesDone());
        dispatch(receiveVehicles(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchVehicles: ', res); //eslint-disable-line
      });
  };
}

export function fetchVehicleStart() {
  return {
    type: types.FETCH_VEHICLE_START
  };
}

export function fetchVehicleDone() {
  return {
    type: types.FETCH_VEHICLE_DONE
  };
}

export function receiveVehicle(detail) {
  return {
    type: types.RECEIVE_VEHICLE,
    detail
  };
}

export function fetchVehicle(id) {
  return (dispatch) => {
    dispatch(fetchVehicleStart());

    const payload = {
      url: `${endpoint}${id}/`
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchVehicleDone());
        dispatch(receiveVehicle(res.data))
      })
      .catch((res) => {
        console.log('Catch fetchVehicle: ', res); //eslint-disable-line
      });
  };
}

export function fetchMoreVehiclesStart() {
  return {
    type: types.FETCH_MORE_VEHICLES_START
  };
}

export function fetchMoreVehiclesDone() {
  return {
    type: types.FETCH_MORE_VEHICLES_DONE
  };
}

export function receiveMoreVehicles(data) {
  return {
    type: types.RECEIVE_MORE_VEHICLES,
    data
  };
}

export function fetchMoreVehicles() {
  return (dispatch, getState) => {
    const next = getState().vehicles.data.next;
    
    if (next == "" || next == null) {
      dispatch(fetchMoreVehiclesDone());
    }
    else {
      dispatch(fetchMoreVehiclesStart());

      const payload = {
        method: 'get',
        url: next
      };
      RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchMoreVehiclesDone());
        dispatch(receiveMoreVehicles(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchMoreVehicles: ', res); //eslint-disable-line
      });
    }
  };
}