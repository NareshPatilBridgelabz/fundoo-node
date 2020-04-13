import axios from "axios";
import userApiConstants from "../apiConstants/userApiConstants";
let userData = JSON.parse(localStorage.getItem("userDetails"))

export async function getUserData(){
    try{
        const response = await axios.get(process.env.REACT_APP_API_URL+'user');
        return response;
    }catch(err){
        throw err;
    }
}

export async function searchUserByWord(data){
    try{
        let sendData = {searchWord:data}
        const response = await axios.post(process.env.REACT_APP_BASE_URL+ userApiConstants.SearchUserList,sendData,{
            headers: {
                Authorization:userData.id
        }});
        return response;
    }catch(err){
        throw err;
    }
}

export async function register(registerData){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.singUp, registerData);
        return response;
    }catch(err){
        throw err;
    }
}

export async function login(loginData){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.login, loginData);
        localStorage.setItem('token', response.data.id)
        localStorage.setItem('userDetails', JSON.stringify(response.data))
        localStorage.setItem('userProfileImage', JSON.stringify(response.data.imageUrl))
        return response;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export async function dashboard(){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.dashboard)
        return response;
    } catch (err){
        console.log(err);
        return err;
    }
}

export async function forgotPassword(data){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.forgotPassword,data);
        return response;
    } catch (err){
        return err;
    }
}

export async function uploadUserProfile(data){
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.UploadProfileImage,data,{
            headers: {
                Authorization:userData.id
        }});
        return response;
    } catch (err){
        return err;
    }
}