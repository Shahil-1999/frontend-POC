import React,{useState} from 'react'
import EditOwnComments from '../pages/EditOwnComments'


function EditDeleteCommentSection(props) {
    const [editcommentsData, setEditCommentsData] = useState({})
    const userDetailsId = localStorage.getItem('userDetailsId')
    const{isCommentsUpdateBtnClicked, comment, deletePostComment, showCommentsEditPage, setIsCommentsUpdateBtnClicked, commentsIndex, getService, showAlert } = props
    return (
        <>
            <div className="container">

                <div className="col-sm-6 mb-3 mb-sm-0 my-3">
                    <div className="card">
                        <p className="card-title">{comment?.user_name} : {comment?.comments}</p>

                        <div className="classname">
                            <i className="fa-solid fa-trash-can my-1" onClick={(event) => deletePostComment(event, comment?.id)}></i>


                            {+userDetailsId === comment?.userDetailsId ? <i className="fa-solid fa-pen-to-square mx-2" onClick={() => showCommentsEditPage({ isCommentsUpdateBtnClicked, setIsCommentsUpdateBtnClicked, setEditCommentsData, commentsIndex, comment })}></i> : null}

                        </div>

                        {/* {console.log("ccccccccccccc", userDetailsId, comment?.userDetailsId, +userDetailsId===comment?.userDetailsId)} */}



                        {+userDetailsId === comment?.userDetailsId && isCommentsUpdateBtnClicked === commentsIndex && <EditOwnComments editcommentsData={editcommentsData} setEditCommentsData={setEditCommentsData} setIsCommentsUpdateBtnClicked={setIsCommentsUpdateBtnClicked} updateComments={getService} showAlert={showAlert} />}
                        {/* {console.log("commentssssssssssss", comment)} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditDeleteCommentSection
