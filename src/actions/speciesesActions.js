import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = 'species/'
export function fetchSpeciesesStart() {
  return {
    type: types.FETCH_SPECIESES_START
  };
}

export function fetchSpeciesesDone() {
  return {
    type: types.FETCH_SPECIESES_DONE
  };
}

export function receiveSpecieses(data) {
  return {
    type: types.RECEIVE_SPECIESES,
    data
  };
}

export function fetchSpecieses() {
  return (dispatch) => {
    dispatch(fetchSpeciesesStart());

    const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchSpeciesesDone());
        dispatch(receiveSpecieses(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchSpecieses: ', res); //eslint-disable-line
      });
  };
}

export function fetchSpeciesStart() {
  return {
    type: types.FETCH_SPECIES_START
  };
}

export function fetchSpeciesDone() {
  return {
    type: types.FETCH_SPECIES_DONE
  };
}

export function receiveSpecies(detail) {
  return {
    type: types.RECEIVE_SPECIES,
    detail
  };
}

export function fetchSpecies(id) {
  return (dispatch) => {
    dispatch(fetchSpeciesStart());

    const payload = {
      url: `${endpoint}${id}/`
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchSpeciesDone());
        dispatch(receiveSpecies(res.data))
      })
      .catch((res) => {
        console.log('Catch fetchSpecies: ', res); //eslint-disable-line
      });
  };
}

export function fetchMoreSpeciesesStart() {
  return {
    type: types.FETCH_MORE_SPECIESES_START
  };
}

export function fetchMoreSpeciesesDone() {
  return {
    type: types.FETCH_MORE_SPECIESES_DONE
  };
}

export function receiveMoreSpecieses(data) {
  return {
    type: types.RECEIVE_MORE_SPECIESES,
    data
  };
}

export function fetchMoreSpecieses() {
  return (dispatch, getState) => {
    const next = getState().specieses.data.next;
    
    if (next == "" || next == null) {
      dispatch(fetchMoreSpeciesesDone());
    }
    else {
      dispatch(fetchMoreSpeciesesStart());

      const payload = {
        method: 'get',
        url: next
      };
      RequestHelper.request(payload)
      .then((res) => {
        dispatch(fetchMoreSpeciesesDone());
        dispatch(receiveMoreSpecieses(res.data));
      })
      .catch((res) => {
        console.log('Catch fetchMoreSpecieses: ', res); //eslint-disable-line
      });
    }
  };
}