import React from 'react'
import AddComments from "../pages/AddComments";
import { deleteCommentsFromAnyPost } from '../api/apis';

function AllPostCard(props) {
    const userDetailsId = localStorage.getItem('userDetailsId')
    const token = localStorage.getItem('token')
    const { viewCommentsList, showCommentSection, myStyle, post, isAddCommentBtnClicked, index, clickedPostData, isUserCommentsToggleBtnClicked, showAlert, setIsAddCommentBtnClicked, setIsCommentDeleted} = props

    const deleteOwnCommentsInAnyPost = async (event, comment) => {
        event.preventDefault()
        const commentId = comment.id
        try {
            const res = await deleteCommentsFromAnyPost(userDetailsId, commentId, token)
            if (res?.data?.status) {
                setIsCommentDeleted(true)
                showAlert('success', "comment deleted")

            } else {
                showAlert('success', "comment not deleted")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="col-lg-6 mb-3 mb-sm-0">
                <div className="card my-3 scrollable-card" style={myStyle}>
                    <div className="card-body">
                        <p className="card-title"><span>Name: </span>{post.user_name}</p>

                        <p className="card-title"><span>Post Title: </span>{post.title}</p>
                        <p className="card-text" style={myStyle}><span>Post Description: </span>{post.post_description}</p>

                        <button type="button" class="btn btn-primary" onClick={(event) => showCommentSection(event, index, post)}>Add Comments</button>

                        {isAddCommentBtnClicked === index && <AddComments clickedPostData={clickedPostData} setIsAddCommentBtnClicked={setIsAddCommentBtnClicked} showAlert={showAlert} />}

                        <button type="button" class="btn btn-primary mx-2" onClick={(event) => viewCommentsList(event, index, post)}>{isUserCommentsToggleBtnClicked === index ? "Hide Comments" : "Show Comments"}</button>

                        {isUserCommentsToggleBtnClicked === index && post?.comments?.length > 0 && post?.comments?.map((comment) => {

                            return (
                                <>
                                    <div className="container">
                                        <div className="col-sm-6 mb-3 mb-sm-0 my-3">
                                            <div className="card">
                                                <p className="card-title">{comment.user_name} : </p>
                                                <p className="card-title">
                                                    {comment.comments}
                                                </p>
                                                {+userDetailsId === comment?.userDetailsId ? <i className="fa-solid fa-trash-can my-1" onClick={(event) => deleteOwnCommentsInAnyPost(event, comment)}></i> : null}
                                            </div>
                                        </div>

                                    </div>

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllPostCard
