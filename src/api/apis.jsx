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
