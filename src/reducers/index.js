import {combineReducers} from 'redux';
import data from './data';
import {reducer as formReducer} from 'redux-form';
import login from './login'


export default combineReducers({
  login: login,
  loaded: data,
  form: formReducer
})
