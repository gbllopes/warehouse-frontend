import {combineReducers} from 'redux';
import data from './data';
import {reducer as formReducer} from 'redux-form';
import login from './login';
import products from './product';
import company from './company';


export default combineReducers({
  isAutenticado: login,
  loaded: data,
  form: formReducer,
  products: products,
  company: company
})
