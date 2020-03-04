import axios from 'axios';

let headers = {
    "Content-Type":"application/json"
    // "Access-Control-Allow-Origin":"*"
}
export async function registration(data){
    let responce = axios.post('http://localhost:4000/register',JSON.stringify(data),{
        headers: headers
      });
    console.log('Check Responce = ');
    console.log(responce);
    return responce;
}