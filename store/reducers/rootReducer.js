import storyReducer from './storyReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    story: storyReducer,
});

export default rootReducer
