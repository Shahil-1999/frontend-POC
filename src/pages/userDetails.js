import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './userDetails.css'



function UserDetails(props) {
    const {showAlert} = props
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone_number: "",
        gender: "",
        role: ""
    })

    



    const navigate = useNavigate()


    const handleInput = (event) => {
        // console.log(event);
        let name = event.target.name
        let value = event.target.value
        setUser({
            ...user,
            [name]: value
        })
    }

    // Handling Form Submittion
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {

            const response = await fetch(`http://localhost:5000/add_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            
            if(response.ok){
                setUser({
                    name: "",
                    email: "",
                    password: "",
                    phone_number: "",
                    gender: "",
                    role: ""
                });
                navigate('/userLogin')
            }else{
                alert("Fill All The Feild")
            }
            // console.log(response);

        } catch (error) {
            console.log("UserDetails Error",error);
        }


    }





    return (
        <>
            <div className="container">

                <div className="content" >
                    <img src="https://res.cloudinary.com/debbsefe/image/upload/f_auto,c_fill,dpr_auto,e_grayscale/image_fz7n7w.webp" alt="" className="cld-responsive" />
                    <h1 className="form-title">Register Here</h1>
                    <form>

                        <input type="text" name='name' value={user.name} onChange={handleInput} placeholder="NAME" />
                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder="EMAIL ADDRESS" />
                        <input type="text" name='password' value={user.password} onChange={handleInput} placeholder="PASSWORD" />
                        <div className="beside">
                            <input type="number" name='phone_number' value={user.phone_number} onChange={handleInput} placeholder="PHONE NUMBER" />
                            <select name='gender' className='drop1' value={user.gender} onChange={handleInput} >
                                <option>GENDER</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>NON-BINARY</option>
                            </select>
                            
                        </div>
                        <div className='drop'>
                        
                            <select name='role'value={user.role} onChange={handleInput} >
                            <option>ROLE</option>

                                <option >USER</option>
                                <option>ADMIN</option>
                                <option>GUEST</option>
                                
                            </select>
                        </div>
                        
                        <button type="submit" className="btn btn-primary sign_button" onClick={handleFormSubmit}>Sign In</button>



                    </form>
                </div>
            </div>


        </>
    )
}

export default UserDetails