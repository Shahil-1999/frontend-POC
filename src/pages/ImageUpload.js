import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageUpload(props) {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();

    const userDetailsId = localStorage.getItem("userDetailsId");
    // const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    const { mode, showAlert } = props;
    const [myStyle, setMyStyle] = useState({
        color: "black",
        backgroundColor: "white"
    });


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


    // Function to handle file selection
    const handleFileChange = (event) => {

        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/JPEG', 'image/jpg', 'image/JPG', 'image/png', 'image/PNG',]; // Add allowed image types
        if (file && allowedTypes.includes(file.type)) {
            setSelectedFile(file);
            console.log("fileeeeeeeeeeeee", file);
        } else {
            // console.log("selected files", selectedFile);
            showAlert('warning', 'Please select a JPG, JPEG, or PNG image file');
            setSelectedFile(null)
        }

console.log("selectedFile", selectedFile);
    };




    // Function to handle file upload
    const handleUpload = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData();
            // console.log("loggggggggggggggggggggggggggggggggg", selectedFile);

            formData.append('file', selectedFile);
            formData.append('userDetailsId', userDetailsId); // Add userDetailsId to formData
            // formData.append('userName', userName);
            console.log("selectedFile", selectedFile);
            if (selectedFile) {

                const response = await fetch('http://localhost:5000/profile_img/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const res = await response.json();
                // console.log("ressssssssssssssssssssssssssssssssssssssssssssssss", res);
                if (res?.status) {
                    navigate('/Profile');
                } else if (res.statusCode === 413) {
                    showAlert("warning", "Please Upload within 1 mb")
                } else {
                    showAlert("warning", "file not uploaded")
                }
            } else {
                showAlert("warning", "Please Upload Your Image")
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };













    return (
        <div style={myStyle}>
            <h2 >Image Upload</h2>
            {console.log("selectedFileeeeeeeeeeee", selectedFile)}
            <input type="file" onChange={handleFileChange} value={selectedFile ? selectedFile.filename   : ''} />
            <button onClick={(event) => handleUpload(event)}>Upload</button>
        </div>
    );
}

export default ImageUpload;
