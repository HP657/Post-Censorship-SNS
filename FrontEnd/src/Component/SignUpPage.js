import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState(null); // File 객체를 저장할 상태

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profileImg', profileImg); // File 객체를 append

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('회원가입 성공:', response.data);
            // 성공 처리
        } catch (error) {
            console.error('회원가입 실패:', error);
            // 실패 처리
        }
    };

    const handleFileChange = (e) => {
        setProfileImg(e.target.files[0]); // 첨부된 파일 객체를 상태에 저장
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="사용자명" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">회원가입</button>
        </form>
    );
};

export default SignUpPage;
