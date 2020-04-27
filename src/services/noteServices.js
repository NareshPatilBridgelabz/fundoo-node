import axios from "axios";
import userApiConstants from "../apiConstants/userApiConstants";
let userData = JSON.parse(localStorage.getItem("userDetails"))

export async function getUserNote(){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    console.log('userData services ',userData)
    try{
        const response = await axios.get(process.env.REACT_APP_NOTES_URL + userApiConstants.getNotes, {
            headers: {
                Authorization:userData.id
        }});
        return response;
    }catch(err){
        throw err;
    }
}

export async function setUserNote(noteData){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.setNotes,noteData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        throw err
    }
}

export async function deleteRestoreUserNote(deleteRestoreData){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.deleteNote,deleteRestoreData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        throw err
    }
}

export async function updateUserNote(editData){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.updateNotes,editData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function addUpdateReminderNote(addUpdateReminderdata){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.addUpdateReminderNotes,addUpdateReminderdata,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function removeReminderNote(noteID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let noteData = {noteIdList: [noteID]}
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.removeReminderNotes,noteData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function changesColorNotes(colordata){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.changesColorNotes,colordata,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function archiveNote(archiveData){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.archiveNotes,archiveData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function deleteNoteForever(noteId){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL + userApiConstants.deleteForeverNotes,noteId,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function getLableList(){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.get(process.env.REACT_APP_NOTES_LABLE+'/'+userApiConstants.GetNoteLabelList,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function addNotelable(label){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let lableData = {label:label,isDeleted:false,userId:userData.userId}
        const response = await axios.post(process.env.REACT_APP_NOTES_LABLE,lableData,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function deleteNotelable(labelId){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.delete(process.env.REACT_APP_NOTES_LABLE+'/'+labelId+'/deleteNoteLabel',{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function updateNoteLabel(labelId,editLabel){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_LABLE+'/'+labelId+'/updateNoteLabel',editLabel,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function removeNoteLabel(lableId,noteId){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {}
        const response = await axios.post(process.env.REACT_APP_API_URL+'notes/'+noteId+'/addLabelToNotes/'+lableId+'/remove',data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function addSubNoteLabel(lableId,noteId){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {}
        const response = await axios.post(process.env.REACT_APP_API_URL+'notes/'+noteId+'/addLabelToNotes/'+lableId+'/add',data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}
export async function getNotesListByLabel(label){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {}
        const response = await axios.post(process.env.REACT_APP_API_URL+'notes/getNotesListByLabel/'+label,data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function addcollaboratorsNotes(user,noteID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.post(process.env.REACT_APP_NOTES_URL+noteID+'/AddcollaboratorsNotes',user,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function removeCollaboratorsNotes(userID,noteID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        const response = await axios.delete(process.env.REACT_APP_NOTES_URL+noteID+'/removeCollaboratorsNotes'+'/'+userID,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function askQuesion(message,noteID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {message:message,notesId:noteID}
        const response = await axios.post(process.env.REACT_APP_API_URL+'questionAndAnswerNotes/addQuestionAndAnswer',data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function replyQuestion(message,parentID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {message:message}
        const response = await axios.post(process.env.REACT_APP_API_URL+'questionAndAnswerNotes/reply/'+parentID,data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function ratingQuestion(rate,parentID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {rate:rate}
        const response = await axios.post(process.env.REACT_APP_API_URL+'questionAndAnswerNotes/rate/'+parentID,data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}

export async function likeQuestion(like,parentID){
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    try{
        let data = {like:like}
        const response = await axios.post(process.env.REACT_APP_API_URL+'questionAndAnswerNotes/like/'+parentID,data,{
            headers: {
                Authorization:userData.id
        }});
        return response
    } catch(err){
        return err
    }
}