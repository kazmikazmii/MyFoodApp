import { LOGIN, GET_dATA, LOGOUT } from './constant';
// export const Init = () => {
//     return async dispatch => {
//         let token = await AsyncStorage.getItem('token');
//         if(token!==null){
//             console.log('token Fetched')
//         }
//         dispatch(
//             {
//                 type: LOGIN,
//                 data: token
//             }
//         )
//     }          
// }

// export const Login = (email, password) => {
//     return async dispatch => {
//         let token = 123;
//         if (email === 'neelum' && password == '1234') {
//             token = email + password;
//             await AsyncStorage.setItem('token', token);
//             console.log('token Stored')
//         }
//         dispatch(
//             {
//                 type: LOGIN,
//                 data: token
//             }
//         )
//     }

// }
// export function Logout(item) {

//     return async dispatch=> {
//         await AsyncStorage.clear
//         ();
//         dispatch({
//             type: LOGOUT,
//     })
      
//     }
// }
export function GetData(item) {
    return {
        type: GET_dATA,
        data: item
    }
}