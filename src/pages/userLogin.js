import React, { useState } from 'react'
import '../css/userLogin.css'
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../api/apis';

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
            const res = await userLogin(user)
            
            if (res?.data?.status) {
                localStorage.setItem("token", res?.data?.data?.token)
                localStorage.setItem("userDetailsId", res?.data?.data?.userDetailsId)
                localStorage.setItem("userName", res?.data?.data?.userName)
                localStorage.setItem("userRole", res?.data?.data?.role)
                localStorage.setItem("subscription_status", res?.data?.data?.subscription_status)
                localStorage.setItem("subscription_date", res?.data?.data?.subscription_endDate)

                setUser({
                    email: "",
                    password: "",
                });
                
                    showAlert('success', 'user logged in sucessfully')
                
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            } else {
                alert(res?.data?.message)
            }

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

