import * as types from '../actions/actionsTypes';

export default function search(result) {
    return {
        type: types.SEARCH,
        result
    };
}