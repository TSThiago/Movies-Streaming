import { combineReducers, createStore } from 'redux'
import userReducer from './user/reducer'

const reducers = combineReducers({
    user : userReducer
});

const store = createStore(reducers)

export default store;