import * as types from '../constants/actionTypes';
import RequestHelper from '../utils/requestHelper';
import firebase from 'firebase';

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

		firebase.initializeApp({
      apiKey: "AIzaSyC24-qD8en4Jrot3Aglq8NYuz50NuQ73Sw",
	    authDomain: "glaring-inferno-7571.firebaseapp.com",
	    databaseURL: "https://glaring-inferno-7571.firebaseio.com",
	    storageBucket: "glaring-inferno-7571.appspot.com",
    });

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