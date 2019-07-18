import {combineReducers} from 'redux';
import data from './data';
import {reducer as formReducer} from 'redux-form';
import login from './login'
import products from './product'


export default combineReducers({
  isAutenticado: login,
  loaded: data,
  form: formReducer,
  products: products
})
