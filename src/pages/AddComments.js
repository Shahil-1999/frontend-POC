import React, { useState } from 'react'
import { addCommentsOnAnyPosts } from "../api/apis";

function AddComments(props) {
    const { clickedPostData, setIsAddCommentBtnClicked, showAlert } = props
    const [comment, setComment] = useState({})
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem('userDetailsId')
    const handleCommentInput = (event) => {
        let name = event.target.name
        let value = event.target.value
            setComment({
                ...comment,
                userDetailsId: userDetailsId,
                postID: clickedPostData?.id,

                [name]: value
            })
        
    }
    const handleCommentFormSubmit = async (event) => {
        event.preventDefault()

        try {

            const res = await addCommentsOnAnyPosts(token, comment)

            if (res?.data?.status) {
                setComment({})
                setIsAddCommentBtnClicked(false)
                showAlert("success", "Comment Added")
            }
            else {
                showAlert("success", "Comment are required")
            }

        } catch (error) {
            console.log("User Post Error", error);
        }

    }

    return (

        <div>
            <form >
            <h4 className='my-4' style={{color: "black", textAlign: "center"}}>Add Your Comments</h4>
                <input type="text" name='comments' onChange={handleCommentInput} placeholder="POST COMMENTS" />
                <button disabled={!comment?.comments} type="submit" className="btn btn-primary sign_button" onClick={handleCommentFormSubmit}>Comment</button>
            </form>
        </div>
    )
}

export default AddComments
