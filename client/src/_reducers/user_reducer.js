import { LOGIN_USER, REGISTER_USER } from '../_actions/types';

export default function (state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            //console.log(action.payload)
            return  {...state, loginScccuess:action.payload}
            break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        default:
            return state;
            break;
    }
}