import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Form.css';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [previewImg, setPreviewImg] = useState('imgs/person.png'); // Default profile image
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // useEffect to set default preview image on component mount
    useEffect(() => {
        setPreviewImg('imgs/person.png');
    }, []);

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

        if (fileInputRef.current.files[0]) {
            formData.append('profileImg', fileInputRef.current.files[0]);
        } else {
            try {
                const response = await fetch(previewImg);
                const blob = await response.blob();
                formData.append('profileImg', blob, 'default.png');
            } catch (error) {
                console.error('기본 이미지 로드 실패:', error);
                setError('기본 이미지 로드에 실패했습니다. 다시 시도해주세요.');
                setLoading(false);
                return;
            }
        }

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
            const imageUrl = URL.createObjectURL(file);
            setPreviewImg(imageUrl);
        } else {
            setPreviewImg('imgs/person.png');
        }
    };

    const handlePreviewClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='full'>
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
                            accept=".jpeg, .jpg, .png"
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
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? '회원가입 중...' : '회원가입'}
                    </button>
                    <button className="login-button" onClick={() => navigate('/signin')}>로그인</button>
                    <button className="home-button" onClick={() => navigate('/')}>홈</button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
