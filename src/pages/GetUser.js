import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function GetUser(props) {
  const [userData, setUserData] = useState([]);
  const [imageData, setImageData] = useState(null);
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
      const url = `http://localhost:5000/user_details/${userDetailsId}`;

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
      console.log(error);
    }
  };



  const getProfileImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const userDetailsId = localStorage.getItem("userDetailsId");

      const url = `http://localhost:5000/get_profile_image/${userDetailsId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const res = await response.json();
      // console.log("resssssssssssssssssssssssssssssssss get userrrrrrr", res);

      if (res?.status) {

        const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.fileData.data)));

        setImageData(`data:image/png;base64, ${base64String}`);

        // const base64Image = res.data.fileData.data.toString('base64');
        // setImageData(base64String);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProfileImage();
  }, [userData]); // Fetch profile image only when userData changes

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

  return (
    <div className="mr h-100 d-flex align-items-center justify-content-center">
      <div className="col-sm-6 mb-3 mb-sm-0">
        <div className="card" style={myStyle}>
          <div className="card-body getUserCardText">
            <div className='my-2'>
              {imageData && (
                <img style={{ height: "100px", width: "100px", borderRadius: "50px" }} src={imageData} alt="Profile Img" />
              )}
            </div>


            <p className="card-title" style={myStyle}><span>Name: </span>{userData.name}</p>
            <p className="card-text" style={myStyle}><span>Email: </span>{userData.email}</p>
            <p className="card-text" style={myStyle}><span>Phone Number: </span>{userData.phone_number}</p>
            <p className="card-text" style={myStyle}><span>Gender: </span>{userData.gender}</p>





          </div>
        </div>
      </div>
    </div>
  );
}

export default GetUser;