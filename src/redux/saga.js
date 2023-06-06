import {takeEvery,put} from 'redux-saga/effects';
import {SET_USER_dATA, USER_LIST} from './constant'
function* userList(){
const url="";
let data=yield fetch(url);
data= yield data.json();
console.log('data in saga',data)
yield put({type:SET_USER_dATA,data})

}
function* SagaData(){
yield takeEvery(USER_LIST,userList)
}
export default SagaData