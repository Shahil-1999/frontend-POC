import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdatePost from './UpdatePost';
import AddComments from "./AddComments";
import './postFeed.css'
import EditOwnComments from './EditOwnComments';
import Alert from '../components/Alert';
import { showCommentsEditPage } from '../components/common'
import EditDeleteCommentSection from '../components/EditDeleteCommentSection';

function OwnPost(props) {
    const [ownPostData, setPostData] = useState([]) //c
    const [myStyle, setMyStyle] = useState()
    const [isDeleted, setIsDeleted] = useState(false)   //c
    const [editPostData, setEditPostData] = useState({})


    const [isCommentsUpdateBtnClicked, setIsCommentsUpdateBtnClicked] = useState(false)  //c

    const [isAddCommentBtnClicked, setIsAddCommentBtnClicked] = useState(false)

    const [clickedPostData, setClickedPostData] = useState({})

    const [alert, setAlert] = useState(null)

    const [isUserCommentsToggleBtnClicked, setIsUserCommentsToggleBtnClicked] = useState(false)
    // const [remainingComments, setRemainingComments] = useState([])


    const [isCommentDeleted, setIsCommentDeleted] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false)  //c
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem("userDetailsId")



    const { mode, showAlert } = props




    const getService = async () => {
        setIsDeleted(false)
        setIsUpdated(false)
        setIsCommentDeleted(false)
        setIsCommentsUpdateBtnClicked(false)



        try {
            const response = await fetch(`http://localhost:5000/read_own_post/${userDetailsId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const res = await response.json();
            // console.log("getComment",res);


            if (res?.status) {
                // Filtering out deleted comments
                const filteredPosts = res?.data?.readOwnPosts?.map((post) => {
                    const filteredComments = post?.comments?.filter((comment) => {
                        return !comment?.is_deleted;
                    });

                    return { ...post, comments: filteredComments };
                });
                console.log("filteredPosts", filteredPosts);

                // Setting filtered data to state
                setPostData({ ...res, data: { readOwnPosts: filteredPosts } });
            } else {
                navigate('/UserLogin')
            }

        } catch (error) {
            console.log(error);

        }
    }






    useEffect(() => {
        // console.log(isDeleted);
        getService()
        // eslint-disable-next-line
    }, [isDeleted, isUpdated, isUserCommentsToggleBtnClicked, isCommentDeleted, isAddCommentBtnClicked])

    useEffect(() => {
        if (mode === "dark") {
            setMyStyle({
                color: "white",
                backgroundColor: "black",
                borderColor: "white"
            })

        } else {
            setMyStyle({
                color: "black",
                backgroundColor: "white",
                borderColor: "black"

            })
        }
    }, [mode])



    const deletePost = async (post) => {

        try {
            // console.log("aaaaaaaaaaaaaaaa", post);
            const postId = post.id
            // console.log("pppppp", postId);

            const response = await fetch(`http://localhost:5000/delete_post/${userDetailsId}/${postId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const res = await response.json();
            // console.log(res);
            if (res?.status) {
                setIsDeleted(true)
                showAlert('success', "Post deleted")

            } else {
                showAlert('success', "Post not deleted")
            }

        } catch (error) {
            console.log(error);
        }

    }


    const deletePostComment = async (event, commentId) => {
        // console.log("commentsId", commentsId);
        event.preventDefault()

        try {
            // console.log("aaaaaaaaaaaaaaaa", post);

            // console.log("pppppp", postId);

            const response = await fetch(`http://localhost:5000/delete_own_post_comment/${userDetailsId}/${commentId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
            const res = await response.json();
            // console.log("delete post commenttttttt", res?.data?.is_deleted);
            if (res?.status) {
                // console.log("res?.status", res?.status);
                setIsCommentDeleted(true)
                showAlert('success', "comment deleted")

            } else {
                showAlert('success', "comment not deleted")
            }


        } catch (error) {
            console.log(error);
        }

    }







    const showPostEditPage = (index, post) => {
        if (isUpdateBtnClicked !== false) {
            setIsUpdateBtnClicked(false);
        } else {
            setIsUpdateBtnClicked(index)
            setEditPostData(post)
        }

    }



    const viewCommentsList = (event, index, post) => {
        // console.log("isUserCommentsToggleBtnClicked", index, post);
        event.preventDefault()
        if (isUserCommentsToggleBtnClicked !== false) {
            setIsUserCommentsToggleBtnClicked(false);

        } else {

            setIsUserCommentsToggleBtnClicked(index)



        }

    }


    const showCommentSection = (event, index, post) => {
        event.preventDefault()

        // console.log("isAddCommentBtnClicked",isAddCommentBtnClicked);
        if (isAddCommentBtnClicked !== false) {
            setIsAddCommentBtnClicked(false);
        } else {

            setIsAddCommentBtnClicked(index);
            setClickedPostData(post)
        }


    }







    const showPostDetails = (postData) => {
        // console.log("details", postData);

        return (

            postData?.data?.readOwnPosts?.length === 0 ? <div style={myStyle}>No Post Available</div> : (
                postData?.data?.readOwnPosts?.map((post, index) => {


                    return (
                        <>



                            <div className="col-sm-6 mb-3 mb-sm-my-3">
                                <div className="card scrollable-card" style={myStyle}>

                                    <div className="card-body">
                                        <p className="card-title"><span>Name: </span>{post.user_name}</p>
                                        <p className="card-title"><span>Post Title: </span>{post.title}</p>
                                        <p className="card-text" style={myStyle}><span>Post Description: </span>{post.post_description}</p>


                                        {/* Delete Post Icon */}

                                        {/* <i type="submit" className="fa-solid fa-trash-can  mx-2" onClick={() => deletePost(post)}></i> */}
                                        <lord-icon
                                            type="submit"
                                            onClick={() => deletePost(post)}
                                            src="https://cdn.lordicon.com/xekbkxul.json"
                                            trigger="hover">
                                        </lord-icon>


                                        {/* Edit Post Section icon */}

                                        {/* <i type="submit" className="fa-solid fa-pen-to-square mx-2" onClick={() => showPostEditPage(index, post)}></i> */}

                                        <lord-icon
                                            type="submit"
                                            onClick={() => showPostEditPage(index, post)}
                                            src="https://cdn.lordicon.com/zfzufhzk.json"
                                            trigger="hover"
                                            state="hover-line">
                                        </lord-icon>



                                        {/* {console.log("isUpdateBtnClicked",isUpdateBtnClicked, "index",index)} */}



                                        {/* Show Comments Section Icon */}


                                        {/* <i className=' mx-2' onClick={(event) => viewCommentsList(event, index, post)}>
                                            {isUserCommentsToggleBtnClicked === index ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                                        </i> */}

                                        <lord-icon
                                            onClick={(event) => viewCommentsList(event, index, post)}>
                                            {isUserCommentsToggleBtnClicked === index ? <lord-icon
                                                src="https://cdn.lordicon.com/fmjvulyw.json"
                                                trigger="hover"
                                                state="hover-cross">
                                            </lord-icon> : <lord-icon
                                                src="https://cdn.lordicon.com/fmjvulyw.json"
                                                trigger="hover">

                                            </lord-icon>}
                                        </lord-icon>


                                        {/* Add Comment Icon */}

                                        {/* <i className=" mx-2" onClick={(event) => showCommentSection(event, index, post)}>
                                            {isAddCommentBtnClicked === index ? <i class="fa-solid fa-comment-slash"></i> : <i class="fa-solid fa-comment"></i>}
                                        </i> */}

                                        <lord-icon
                                            onClick={(event) => showCommentSection(event, index, post)}

                                            src="https://cdn.lordicon.com/lsrcesku.json"
                                            trigger="hover">
                                        </lord-icon>



                                        {/* Edit Your Post */}

                                        {isUpdateBtnClicked === index && <UpdatePost postData={editPostData} setIsUpdated={setIsUpdated} setIsUpdateBtnClicked={setIsUpdateBtnClicked} showAlert={showAlert} />}





                                        {/*Add your Comments*/}
                                        
                                        {/* {console.log("isAddCommentBtnClicked", isAddCommentBtnClicked, "index", index)} */}

                                        {isAddCommentBtnClicked === index && <AddComments clickedPostData={clickedPostData} setIsAddCommentBtnClicked={setIsAddCommentBtnClicked} showAlert={showAlert} />}




                                        {/* {console.log("aaaaaaaaaaaa",remainingComments?.data?.comments_on_post)} */}
                                        {isUserCommentsToggleBtnClicked === index && post?.comments?.length > 0 && post?.comments?.map((comment, commentsIndex) => {
                                            {/* console.log("post?.id === comment?.postID", post?.id === comment?.postID, post?.id, comment?.postID) */ }
                                            {/* {console.log("commentsssssssssss", comment)} */ }
                                            {/* {console.log( "indcex", commentsIndex)} */ }


                                            return (
                                                post?.id === comment?.postID ?


                                                    (

                                                        <EditDeleteCommentSection isCommentsUpdateBtnClicked={isCommentsUpdateBtnClicked} comment={comment} deletePostComment={deletePostComment} showCommentsEditPage={showCommentsEditPage} setIsCommentsUpdateBtnClicked={setIsCommentsUpdateBtnClicked} commentsIndex={commentsIndex} getService={getService} showAlert={showAlert} />
                                                    ) : null

                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            )
        )

    }









    return (
        <>
            <div className="row mr mx-2" >
                <Alert alert={alert} />
                {showPostDetails(ownPostData)}
            </div>
        </>
    )
}

export default OwnPost
