//The store file will create a redux store from your reducers, making them
//available to your application.
import {createStore} from 'redux';
import reducer from './reducer';

export default createStore(reducer);