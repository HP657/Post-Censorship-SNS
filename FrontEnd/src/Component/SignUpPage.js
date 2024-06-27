import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Form.css';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [previewImg, setPreviewImg] = useState('imgs/person.png'); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = useRef(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== password_confirm) {
            setError('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileImg', profileImg);

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('회원가입 성공:', response.data);
            navigate('/signin');
        } catch (error) {
            console.error('회원가입 실패:', error);
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
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
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>회원가입</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="profile-preview-container">
                    <img 
                        src={previewImg} 
                        alt="Profile Preview" 
                        className="profile-preview" 
                        onClick={handlePreviewClick}
                    />
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileInputChange} 
                    style={{ display: 'none' }} 
                    required={!profileImg} 
                />
                </div>
                <input 
                    type="text" 
                    placeholder="사용자명" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="이메일" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="비밀번호 확인" 
                    value={password_confirm} 
                    onChange={(e) => setPasswordConfirm(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? '회원가입 중...' : '회원가입'}
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
