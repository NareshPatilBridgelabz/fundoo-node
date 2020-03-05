import axios from "axios";
import userApiConstants from "../apiConstants/userApiConstants";


export async function register(registerData){
    try{
        console.log("Services : "+registerData)
        console.log("Base URL : "+process.env.REACT_APP_BASE_URL);
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.singUp, registerData);
        return response;
    }catch(err){
        throw err;
    }
}
