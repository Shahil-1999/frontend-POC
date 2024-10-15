import React, { useState } from 'react'
import './userLogin.css'
import { useNavigate } from 'react-router-dom';

function UserLogin(props) {


    const [user, setUser] = useState({
        email: "",
        password: ""

    })
    const { showAlert } = props

    const handleInput = (event) => {
        // console.log(event);
        let name = event.target.name
        let value = event.target.value
        setUser({
            ...user,
            [name]: value,
        })
    }

    const navigate = useNavigate()


    // Handling Form Submittion
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`http://localhost:5000/user_login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res = await response.json();
            console.log(res);

            if (res.status) {
                // console.log(res.data);

                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userDetailsId", res.data.userDetailsId)
                localStorage.setItem("userName", res.data.userName)
                localStorage.setItem("userRole", res.data.role)
                localStorage.setItem("subscription_status", res.data.subscription_status)
                localStorage.setItem("subscription_date", res.data.subscription_endDate)




                // console.log(localStorage.getItem("token"));


                setUser({

                    email: "",
                    password: "",

                });
                
                    showAlert('success', 'user logged in sucessfully')
                
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            } else {
                alert(res.message)
            }
            // console.log(res);


        } catch (error) {
            console.log(error);
        }

    }




    return (

        <>
            <div className="container">

                <div className="content">
                    <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="" className="cld-responsive" />
                    <h1 className="form-title">Login Here</h1>
                    <form onSubmit={handleLogin}>


                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder="EMAIL ADDRESS" />
                        <input type="text" name='password' value={user.password} onChange={handleInput} placeholder="PASSWORD" />
                        <button type="submit" className="btn btn-primary login_button">Login</button>


                    </form>
                </div>
            </div>


        </>

    )
}



export default UserLogin

