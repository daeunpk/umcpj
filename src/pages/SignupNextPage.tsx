import { useNavigate } from 'react-router-dom';
import './SignupNextPage.css';

const SignupNextPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoLogin = () => {
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleGoBack = () => {
        navigate('/home'); // 피그마에서 메인 페이지로 가라고 되어 있음
    };

    return (
        <div className="signup-next-form">
            <div className="signup-next-banner">
                <div className="signup-next-imagebox">
                    <img src="/image/logo.png" alt="로고" />
                    <h1>회원 가입</h1>
                </div>
            </div>

            <div className="signup-next-mainform">
                <div className="signup-next-maincontainer">
                    <img src="image/Done.png" alt="회원가입 완료 내용" />
                </div>
                <div className="signup-next-text">
                    <div id="signup-next-text1">Tasteholic에 오신 걸 환영합니다!</div>
                    <div id="signup-next-text2">원하는 맛을 찾고, 직접 레시피를 기록해보세요.</div>
                </div>
            </div>

            <div className="signup-next-btn">
                <div className="signup-next-btncontainer">
                    <button 
                        type="button" 
                        className="signup-next-backbtn"
                        onClick={handleGoBack}>뒤로가기
                    </button>
                    <button
                        type="submit"
                        className="signup-next-loginbtn"
                        onClick={handleGoLogin}
                    >
                        로그인 하기
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SignupNextPage;
