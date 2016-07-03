import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';

const endpoint = '';
export function grabStart() {
	return {
		type: types.GRAB_START
	};
}

export function grabEnd() {
	return {
		type: types.GRAB_END
	};
}

export function receiveGrab(data) {
	return {
		type: types.RECEIVE_GRAB,
		data
	};
}

export function fetchFireData() {
	return (dispatch) => {
		dispatch(grabStart());

		const payload = {
      method: 'get',
      url: endpoint
    };

    RequestHelper.request(payload)
      .then((res) => {
        dispatch(grabEnd());
        dispatch(receiveGrab(res.data));
      })
      .catch((res) => {
        console.log('Catch fetch: ', res); //eslint-disable-line
      });
	};
}