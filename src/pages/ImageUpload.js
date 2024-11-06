import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUpload } from '../api/apis';

function ImageUpload(props) {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();

    const userDetailsId = localStorage.getItem("userDetailsId");
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
        } else {
            showAlert('warning', 'Please select a JPG, JPEG, or PNG image file');
            setSelectedFile(null)
        }

    };

    // Function to handle file upload
    const handleUpload = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('userDetailsId', userDetailsId); // Add userDetailsId to formData
            if (selectedFile) {

                const res = await imageUpload(token, formData)
                if (res?.data?.status) {
                    navigate('/Profile');
                } else if (res.status === 413) {
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
            <input type="file" onChange={handleFileChange} value={selectedFile ? selectedFile.filename   : ''} />
            <button onClick={(event) => handleUpload(event)}>Upload</button>
        </div>
    );
}

export default ImageUpload;
