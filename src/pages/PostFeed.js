import "./postFeed.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPostCard from "../components/AllPostCard";
import { showPostFeed } from "../api/apis";






function PostFeed(props) {
    const { mode, showAlert } = props
    // console.log(" modeeeeeeeeeeeee", mode);

    const [isAddCommentBtnClicked, setIsAddCommentBtnClicked] = useState(false)
    const [isUserCommentsToggleBtnClicked, setIsUserCommentsToggleBtnClicked] = useState(false)
    const [isCommentDeleted, setIsCommentDeleted] = useState(false)



    const [postData, setPostData] = useState([])

    const [clickedPostData, setClickedPostData] = useState({})
    // Dark Mode Effect
    // const [btnText, setBtnText] = useState("Enable Dark Mode")
    const [myStyle, setMyStyle] = useState({
        color: "black",
        backgroundColor: "white"
    })
    // console.log("myStyle", myStyle);

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem("userDetailsId")
    // console.log("loggggggggggggggggggggggggggggggg", postData);





    useEffect(() => {
        getService()
        // eslint-disable-next-line
    }, [token, isAddCommentBtnClicked, isUserCommentsToggleBtnClicked])









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








    const getService = async () => {
        setIsCommentDeleted(false)
        try {
            const res = await showPostFeed(token, userDetailsId)
            if (res?.status) {
                // Filtering out deleted comments
                const filteredPosts = res?.data?.data?.readAllPosts?.map((post) => {
                    const filteredComments = post?.comments?.filter((comment) => {
                        return !comment?.is_deleted;
                    });

                    return { ...post, comments: filteredComments };
                });
                console.log("filteredPosts", filteredPosts);

                // Setting filtered data to state
                setPostData({ ...res, data: { readAllPosts: filteredPosts } });
            } else {
                navigate('/UserLogin');
            }
        } catch (error) {
            console.log(error);
        }
    };




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
    // console.log("clicked post data", clickedPostData);
    // console.log("isUserCommentsToggleBtnClicked", isUserCommentsToggleBtnClicked);

    const viewCommentsList = (event, index, post) => {
        console.log("isUserCommentsToggleBtnClicked", isUserCommentsToggleBtnClicked);
        event.preventDefault()
        if (isUserCommentsToggleBtnClicked !== false) {
            setIsUserCommentsToggleBtnClicked(false);

        } else {

            setIsUserCommentsToggleBtnClicked(index)



        }

    }
    
    useEffect(() => {
        // console.log(isDeleted);
        getService()
        // eslint-disable-next-line
    }, [isCommentDeleted])






    const showPostDetails = (postData, myStyle) => {
        // console.log("details", postData);

        return (
           
            postData?.data?.readAllPosts?.length ? (

                postData?.data?.readAllPosts?.map((post, index) => {
                    // console.log("post", post?.comments)
                    return (

                        <AllPostCard viewCommentsList={viewCommentsList} showCommentSection={showCommentSection} myStyle={myStyle} post={post} isAddCommentBtnClicked={isAddCommentBtnClicked} index={index} clickedPostData={clickedPostData} isUserCommentsToggleBtnClicked={isUserCommentsToggleBtnClicked} showAlert={showAlert} setIsAddCommentBtnClicked={setIsAddCommentBtnClicked} setIsCommentDeleted={setIsCommentDeleted} />

                    )
                })
            ) : <div style={myStyle}>No Post Available</div>
        )

        
    }


    return (
        <>
            <div className="row mr mx-3" >
                {showPostDetails(postData, myStyle)}

            </div>
        </>
    )
}

export default PostFeed
