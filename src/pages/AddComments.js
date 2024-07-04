import React, { useState } from 'react'

function AddComments(props) {
    const { clickedPostData, setIsAddCommentBtnClicked, showAlert } = props
    const [comment, setComment] = useState({})
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem('userDetailsId')
  

    const handleCommentInput = (event) => {
        let name = event.target.name
        let value = event.target.value
        // console.log(name, value);

            setComment({
                ...comment,
                userDetailsId: userDetailsId,
                postID: clickedPostData?.id,

                [name]: value
            })
        
    }

// useEffect(()=>{
// console.log("comments", comment?.comments);
// },[comment?.comments])


    // console.log("cccccccccccc",clickedPostData);
    const handleCommentFormSubmit = async (event) => {
        event.preventDefault()




        try {

            const response = await fetch(`http://localhost:5000/add_comments_on_any_post`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })

            const res = await response.json()
            // console.log("ggggggggggggggggg", res);

            if (res?.status) {
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

    // console.log("commentssssssssssss", comment.comments.length);






    return (


        <div>
            <form >
            {/* {console.log("comment?.comments?.length", comment?.comments?.length, comment?.comments)} */}
            <h4 className='my-4' style={{color: "black", textAlign: "center"}}>Add Your Comments</h4>



                <input type="text" name='comments' onChange={handleCommentInput} placeholder="POST COMMENTS" />
                <button disabled={!comment?.comments} type="submit" className="btn btn-primary sign_button" onClick={handleCommentFormSubmit}>Comment</button>



            </form>
        </div>
    )
}

export default AddComments
