import { createStore, compose } from 'redux';
import combineReducers from '../reducers';

export default function configStore(initialState) {
    return createStore(
        combineReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        compose(
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}