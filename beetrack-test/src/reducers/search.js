import * as types from '../actions/actionsTypes';

const search = (state = [], action) => {
    switch (action.type) {
        case types.SEARCH:
            return {
                ...state,
                result: action.result
            };

        default:
            return state
    }
}

export default search;