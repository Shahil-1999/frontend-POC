import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/userDetails.css'
import { addPost } from '../api/apis';

function Post(props) {
    const {showAlert} = props
    const [post, setPost] = useState({
        title: "",
        post_description: ""
    })
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem("userDetailsId")
    useEffect(() => {
        if (token === null) {
            navigate('/UserLogin')
        }
    }, [token])

    const handleInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        setPost({
            ...post,
            [name]: value
        })
    }
    // Handling Form Submittion
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        post.userDetailsId = userDetailsId  //Adding userDetailsId in database when form is being submitted
        try {

            const res = await addPost(token, post)

            if (res?.data?.status) {
                setPost({
                    title: "",
                    post_description: ""
                });
                showAlert('success', "Post Saved")
                
            } else {

                showAlert('success', "Post Not Saved")
            }

        } catch (error) {
            console.log("User Post Error", error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="content">
                    <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="" className="cld-responsive" />
                    <h1 className="form-title">Post Here</h1>

                    <form>
                        <input type="text" name='title' value={post.title} onChange={handleInput} placeholder="TITLE" />
                        <input type="text" name='post_description' value={post.post_description} onChange={handleInput} placeholder="POST DESCRIPTION" />
                        <button disabled={!(post?.title?.length && post.post_description.length)} type="submit" className="btn btn-primary sign_button" onClick={handleFormSubmit}>Post</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Post