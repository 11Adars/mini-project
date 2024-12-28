import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];


    //     <nav class="navbar navbar-default probootstrap-navbar">
    //     <div class="container">
    //         <div class="navbar-header">
    //             <button aria-controls="navbar" aria-expanded="false" class="navbar-toggle collapsed"
    //                     data-target="#navbar-collapse"
    //                     data-toggle="collapse" type="button">
    //                 <span class="sr-only">Toggle navigation</span>
    //                 <span class="icon-bar"></span>
    //                 <span class="icon-bar"></span>
    //                 <span class="icon-bar"></span>
    //             </button>
    //             <a class="navbar-brand" href="index.html">Cattle Disease Analysis &amp; Prediction</a>
    //         </div>
    
    //         <div class="navbar-collapse collapse" id="navbar-collapse">
    //             <ul class="nav navbar-nav navbar-right">
    //                 <li class="active"><a data-nav-section="home" href="#">Home</a></li>
    //                 <li><a data-nav-section="features" href="#">About us</a></li>
    //                 <li><a data-nav-section="predict" href="#">Predict</a></li>
    //                 <li><a data-nav-section="analysis" href="#">preventive measures</a></li>
    //                 <li><a data-nav-section="contact" href="#">Feedback</a></li>
    //             </ul>
    //         </div>
    //     </div>
    // </nav>
    



        // Validate file type
        if (file && !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            setSelectedFile(null);
            return;
        }

        // Validate file size (limit to 5MB)
        if (file && file.size > 5 * 1024 * 1024) {
            setError("File size should not exceed 5MB.");
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        setResult(null); // Reset result
        setError(null);  // Reset error
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("No file selected. Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        setIsLoading(true); // Show loading indicator
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setResult(response.data); // Set the prediction result
        } catch (err) {
            console.error("Error uploading file:", err);
            setError("Failed to upload image or get prediction.");
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "#333" }}>Cattle Disease Detection</h1>
            <p style={{ marginBottom: "20px", color: "#555" }}>
                Upload an image of your cattle to detect possible diseases.
            </p>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "15px" }}
            />
            <br />
            <button
                onClick={handleUpload}
                style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border:"none",
                    borderRadius: "15px",
                    width:"200px"
                }}
            >
                {isLoading ? "Processing..." : "Upload and Predict"}
            </button>
            <div style={{border:"2px solid black",marginTop:"40px"}}>
            {result && (
                <div style={{ marginTop: "20px", textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
                    <h3>Prediction Result:</h3>
                    <p><strong>Disease:</strong> {result.disease}</p>
                    <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
                    <p><strong>Remedy:</strong> {result.remedy}</p>
                </div>
               
            )}
            </div>
            {error && (
                <div style={{ marginTop: "20px", color: "red" }}>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default UploadPage;