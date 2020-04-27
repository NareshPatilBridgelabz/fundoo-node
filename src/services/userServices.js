import axios from "axios";
import userApiConstants from "../apiConstants/userApiConstants";

export async function getUserData(){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.get(process.env.REACT_APP_API_URL+'user');
        return response;
    }catch(err){
        throw err;
    }
}

export async function searchUserByWord(data){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
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
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.singUp, registerData);
        return response;
    }catch(err){
        throw err;
    }
}

export async function login(loginData){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.login, loginData);
        console.log('login response : ',response.data)
        localStorage.setItem('token', response.data.id)
        localStorage.setItem('userDetails', JSON.stringify(response.data))
        return response;
    } catch(err) {
        console.log(err);
        return err;
    }
}

export async function dashboard(){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.dashboard)
        return response;
    } catch (err){
        console.log(err);
        return err;
    }
}

export async function forgotPassword(data){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_BASE_URL + userApiConstants.forgotPassword,data);
        return response;
    } catch (err){
        return err;
    }
}

export async function uploadUserProfile(data){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
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

export async function myCart(){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.get(process.env.REACT_APP_API_URL + userApiConstants.Productcarts + '/myCart', {
            headers: {
                Authorization:userData.id
            }
        })
        return response;
    }
    catch(err) {
        return err;
    }
}

export async function placeOrder(cartId,address){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const data = {cartId:cartId,address:address}
        const response = await axios.post(process.env.REACT_APP_API_URL + userApiConstants.Productcarts + '/placeOrder',data, {
            headers: {
                Authorization:userData.id
            }
        })
        return response;
    }
    catch(err) {
        return err;
    }
}