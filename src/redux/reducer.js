import { LOGIN, LOGOUT, SET_USER_dATA } from './constant';
//initial state define(bydefault data (null,object,emoty string etc))
// const initialState = {authToken:23};
// export const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN:
//             return [
//                 ...state,
//                 authToken. action.data,
//             ]
//         case LOGOUT:

//             return [
// authToken=null,
//      ]
//         //     case GET_dATA:
//         //         return[
//         //             ...state,action.data
//         //         ]
//         default:
//             return state;
//     }

// }
import {GET_dATA} from './constant';
const initialState = [];
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_dATA :
            return [
                ...state,
                action.data
            ]
        
        default:
            return state
    }

}