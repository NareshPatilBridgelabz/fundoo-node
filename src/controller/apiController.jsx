import axios from 'axios';

let headers = {
    "Content-Type":"multipart/form-data",
    "Access-Control-Allow-Origin":"*"
}
export async function registration(data){
    let responce = 'hii';//axios.post('',data);
    console.log('Check Responce = ',data);
    return responce;
}