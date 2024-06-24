import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../Css/SignUpPage.css';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [previewImg, setPreviewImg] = useState("imgs/person.png"); 

    const fileInputRef = useRef(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileImg', profileImg);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };

    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            setProfileImg(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    const handlePreviewClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>회원가입</h2>
                <div className="profile-preview-container" onClick={handlePreviewClick}>
                    <img src={previewImg} alt="Profile Preview" className="profile-preview" />
                    <input type="file" ref={fileInputRef} onChange={handleFileInputChange} style={{ display: 'none' }} required /> 
                </div>
                <input type="text" placeholder="사용자명" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpPage;
