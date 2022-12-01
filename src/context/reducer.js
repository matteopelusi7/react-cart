import {DATA_FETCHING_FAIL, DATA_FETCHING_SUCCESS, DATA_FETCHING_STARTED} from './actions'

const reducer = (state, {type, payload}) => {
    if(type === DATA_FETCHING_STARTED) {
        return {...state, isLoading: true}
    }
    if(type === DATA_FETCHING_SUCCESS) {
        return {...state, isLoading: false, isError: false, products:payload}
    }
    if(type === DATA_FETCHING_FAIL) {
        return {...state, isLoading: false, isError: true}
    }
    return state;
};
  
export default reducer;