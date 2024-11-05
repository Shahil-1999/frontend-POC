import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './userDetails.css'






function Post(props) {
    const {showAlert} = props


    const [post, setPost] = useState({
        title: "",
        post_description: ""
    })
 

    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userDetailsId = localStorage.getItem("userDetailsId")
    // const userName = localStorage.getItem("userName")


    useEffect(() => {
        if (token === null) {
            navigate('/UserLogin')
        }
    }, [token])



    const handleInput = (event) => {
        // console.log(event);
        let name = event.target.name
        let value = event.target.value

        setPost({
            ...post,
            [name]: value
        })


    }




    // Handling Form Submittion
    const handleFormSubmit = async (event) => {
        // console.log("ppppppppp", post);
        event.preventDefault()

        // console.log(user);
        // alert("Your Form Has Been Submitted")



        post.userDetailsId = userDetailsId  //Adding userDetailsId in database when form is being submitted
       

        try {

            const response = await fetch(`http://localhost:5000/add_post`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })

            const res = await response.json()
            console.log("post post", res);

            if (res?.status) {
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