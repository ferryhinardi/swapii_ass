import { GRAB_START, GRAB_END, RECEIVE_GRAB } from '../constants/actionTypes';
const initialState = {
	isFetching: false
}
export function fireReducer(state = initialState, action) {
	switch (action.type) {
		case GRAB_START:
			return Object.assign({}, state, {
				isFetching: true
		});
		case GRAB_END:
			return Object.assign({}, state, {
				isFetching: false
			});
		case RECEIVE_GRAB:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.base
      });
	}
}