import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';
import firebase from 'firebase';
import configFirebase from '../../config.json'

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

		firebase.initializeApp(configFirebase);

    firebase.database().ref().once('value')
      .then(snapshot => {
        dispatch(grabEnd());
        dispatch(receiveGrab(snapshot.val()));
      })
      .catch(res => {
        console.log('Catch fetch: ', res); //eslint-disable-line
        dispatch(grabEnd());
      });
	};
}