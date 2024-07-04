import React, { useState } from 'react';
import AllPostCard from '../components/AllPostCard';

function EditOwnComments(props) {
    const token = localStorage.getItem("token");
    const userDetailsId = localStorage.getItem("userDetailsId");
    const [updateCommentsData, setUpdateCommentsData] = useState({});

    const { editcommentsData, setEditCommentsData, setIsCommentsUpdateBtnClicked, updateComments, showAlert } = props;

    const handleCommentsEditInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;



        setUpdateCommentsData({
            ...updateCommentsData,
            [name]: value
        })

        // console.log("vvvvvvvvvvv", name, value);
    };

    const editComments = async (event) => {
        event.preventDefault();

        try {
            const postId = editcommentsData.postID;
            const commentsId = editcommentsData.id;

            const response = await fetch(`http://localhost:5000/edit_own_comment/${userDetailsId}/${postId}/${commentsId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateCommentsData)
            });

            const res = await response.json();

            if (res?.status) {
                setEditCommentsData(true);
                setUpdateCommentsData({});
                setIsCommentsUpdateBtnClicked(false);
                showAlert("success", "comment updated")
                updateComments(res.updatedComment); // Assuming updatedComment contains the updated comment data


            } else {
                showAlert("warning", "You are not eligible to update this comment")
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <form>
                <div className="mb-3 txt_align mx-3">
                    <label htmlFor="comments" className="form-label">Edit Your Comments: </label>
                    <input type="text" name='comments' value={updateCommentsData?.comments || ''} onChange={handleCommentsEditInput} placeholder="Comments" />
                </div>



                <i className=' mx-2'>
                    {updateCommentsData?.comments ? <i type="submit" class="fa-solid fa-circle-check" style={{ color: "#19f076" }} onClick={editComments}></i> : <i class="fa-solid fa-circle-xmark" style={{ color: "#ff0000", cursor: "default" }}></i>}
                </i>
            </form>
        </>
    );
}

export default EditOwnComments;