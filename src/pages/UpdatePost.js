import React, { useState } from 'react'

function UpdatePost(props) {

    const [editPostData, setEditPostData] = useState({})
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem("userDetailsId")
    const { postData, setIsUpdated, setIsUpdateBtnClicked, showAlert } = props


    const handleEditInput = (event) => {
        // console.log(event);
        let name = event.target.name
        let value = event.target.value


        setEditPostData({
            ...editPostData,
            [name]: value
        })


    }




    const editPost = async (event) => {
        event.preventDefault()



        try {
            // console.log("aaaaaaaaaaaaaaaa", post);
            const postId = postData.id
            // console.log("eeeeeeee", postData, editPostData);


            const response = await fetch(`http://localhost:5000/edit_own_post/${userDetailsId}/${postId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editPostData)
            })
            const res = await response.json();


            if (res?.status) {
                setIsUpdated(true)
                setEditPostData({})
                setIsUpdateBtnClicked(false)
                showAlert('success', "post updated")

            }

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <>
            

            <form>

                <div className="mb-3 txt_align mx-3">
           
                <h4 className='my-4' style={{color: "black", textAlign: "center"}}>Edit Your Post</h4>
        
                    <label for="title" className="form-label">Title</label>
                    <input type="text" name='title' value={editPostData.title} onChange={handleEditInput} placeholder="TITLE" />

                </div>

                <div className="mb-3 txt_align mx-3">
                    <label for="post_description" className="form-label">Post Description</label>
                    <input type="text" name='post_description' value={editPostData.post_description} onChange={handleEditInput} placeholder="POST DESCRIPTION" />

                </div>

                {/* {console.log("llllllll", editPostData?.title?.length)} */}


                <i className=' mx-2'>
                    {editPostData?.title?.length || editPostData?.post_description?.length ? <i type="submit" class="fa-solid fa-circle-check" style={{ color: "#19f076" }} onClick={editPost}></i> : <i class="fa-solid fa-circle-xmark" style={{ color: "#ff0000", cursor: "default" }}></i>}
                </i>

            </form>



        </>
    )
}

export default UpdatePost
