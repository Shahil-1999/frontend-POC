import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000`
})



export const showPostFeed =  (token, userDetailsId) => {
    try {
        return api.get(`/read_all_post/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const addCommentsOnAnyPosts =  (token, commentData) => {
    try {
        return api.post(`/add_comments_on_any_post`,commentData, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteUserAccount =  (token, userDetailsId) => {
    try {
        return api.delete(`/delete_user_acct/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteCommentsFromAnyPost =  (userDetailsId, commentId, token) => {
    try {
        return api.delete(`/delete_own_comments_in_any_post/${userDetailsId}/${commentId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteCommentsFromOwnPost =  (userDetailsId, commentId, token) => {
    try {
        return api.delete(`/delete_own_comments_in_any_post/${userDetailsId}/${commentId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const readOwnPost =  (token, userDetailsId) => {
    try {
        return api.get(`/read_own_post/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const postDelete =  (token, userDetailsId, postId) => {
    try {
        return api.delete(`/delete_post/${userDetailsId}/${postId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}
export const userDetailsAdmin =  (token, userDetailsId) => {
    try {
        return api.get(`/user_details_admin/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const editOwnComments =  (token, userDetailsId, postId, commentsId, updateCommentsData) => {
    console.log(token, userDetailsId, postId, commentsId);
    
    try {
        return api.put(`/edit_own_comment/${userDetailsId}/${postId}/${commentsId}`, updateCommentsData, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const getUser =  (token, userDetailsId) => {
    
    try {
        return api.get(`/user_details/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const getUserProfileImage =  (token, userDetailsId) => {
    
    try {
        return api.get(`/get_profile_image/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const imageUpload =  (token, formData) => {
    
    try {
        return api.post(`/profile_img/upload`,formData,  { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}
export const addPost =  (token, postData) => {
    
    try {
        return api.post(`/add_post`,postData,  { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}


export const updatePost =  (token, userDetailsId, postId, updatedPostData) => {
    
    try {
        return api.put(`/edit_own_post/${userDetailsId}/${postId}`, updatedPostData, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

export const addUser =  (userData) => {
    
    try {
        return api.post(`/add_user`,userData)
    } catch (error) {
        console.log(error);
        
    }
}

export const userLogin =  (userData) => {
    
    try {
        return api.post(`/user_login`, userData)
    } catch (error) {
        console.log(error);
        
    }
}


export const getAllProfileImage =  (token, userDetailsId) => {
    
    try {
        return api.get(`/get_all_profile_image/${userDetailsId}`, { headers: {"Authorization" : `Bearer ${token}`} })
    } catch (error) {
        console.log(error);
        
    }
}

