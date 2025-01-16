import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/signupForm';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupPage />} />
                {/* 다른 페이지 라우트를 여기에 추가하고 나중에 회원가입 페이지 path를 '/signup'으로 변경하면 좋을 듯 */}
            </Routes>
        </Router>
    );
};

export default App;

