import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard(props) {
    const [userData, setUserData] = useState([]);
    const [imageData, setImageData] = useState({}); // Changed to an object for multiple images

    const [myStyle, setMyStyle] = useState({
        color: "black",
        backgroundColor: "white"
    });
    const { mode } = props;
    const navigate = useNavigate();

    const getService = async () => {
        try {
            const token = localStorage.getItem("token");
            const userDetailsId = localStorage.getItem("userDetailsId");
            const url = `http://localhost:5000/user_details_admin/${userDetailsId}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const res = await response.json();

            if (res?.status) {
                setUserData(res?.data);
            } else {
                navigate('/UserLogin');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getService();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            setMyStyle({
                color: "white",
                backgroundColor: "black",
                borderColor: "white"
            });
        } else {
            setMyStyle({
                color: "black",
                backgroundColor: "white",
                borderColor: "black"
            });
        }
    }, [mode]);

    useEffect(() => {
        if (userData.length > 0) {
            getProfileImage();
        }
    }, [userData]); // Fetch profile image only when userData changes

    const getProfileImage = async () => {
        try {
            const token = localStorage.getItem("token");
            const userDetailsId = localStorage.getItem("userDetailsId");

            const url = `http://localhost:5000/get_all_profile_image/${userDetailsId}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const res = await response.json();

            if (res?.status) {
                const images = {};
                res.data.forEach((image) => {

                    console.log("imageeeeeeeeeeeeeeeee", image
                    );
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(image.fileData.data)));
                    images[image.userDetailsId] = `data:image/png;base64, ${base64String}`;
                });
                setImageData(images); // Store images with userId as key
                // console.log(imageData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const showPostDetails = (userData, myStyle) => {
        return userData.length ? (
            userData.map((user, index) => (
                
                
                <div key={index} className="mr h-100 d-flex align-items-center justify-content-center">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <div className="card" style={myStyle}>
                            <div className="card-body getUserCardText">
                                {imageData[user.id] && ( // Show image based on userId
                                    <img
                                        key={user.id}
                                        style={{ height: "100px", width: "100px", borderRadius: "50px" }}
                                        src={imageData[user.id]}
                                        alt="profile_image"
                                    />
                                )}

                                <p className="card-title" style={myStyle}><span>Name: </span>{user.name}</p>
                                <p className="card-text" style={myStyle}><span>Email: </span>{user.email}</p>
                                <p className="card-text" style={myStyle}><span>Phone Number: </span>{user.phone_number}</p>
                                <p className="card-text" style={myStyle}><span>Gender: </span>{user.gender}</p>
                                <p className="card-text" style={myStyle}><span>Role: </span>{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div style={myStyle}>No User Available</div>
        );
    };

    return (
        <>
            <div className="row mr mx-3">
                {showPostDetails(userData, myStyle)}
            </div>
        </>
    );
}

export default AdminDashboard;
