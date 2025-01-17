import React, { useState } from 'react';
import './signupForm.css';

const SignupForm: React.FC = () => {
    const [form, setForm] = useState({
        id: '',
        password: '',
        confirmPassword: '',
        nickname: '',
    });
    const [validation, setValidation] = useState({
        id: false,
        idLength: false,
        idDuplicate: false,
        passwordLength: false,
        passwordComplexity: false,
        confirmPassword: false,
        nickname: false,
    });
    const [messages, setMessages] = useState({
        id: '',
        idLength: '',
        idDuplicate: '',
        passwordLength: '',
        passwordComplexity: '',
        confirmPassword: '',
        nickname: '',
    });
    const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복 여부 검사 완료 상태
    const [isIdDuplicate, setIsIdDuplicate] = useState(false); // 중복 여부

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        validateField(name, value);

        if (name === 'id') {
            setIsIdChecked(false); // 아이디 수정 시 중복 여부 초기화
            setIsIdDuplicate(false); // 아이디 수정 시 중복 여부 초기화
        }
    };

    const handleFocus = (name: keyof typeof form) => {
        validateField(name, form[name]);
    };

    const validateField = (name: string, value: string) => {
        let message = '';
        let isValid = false;
    
        switch (name) {
            case 'id': {
                const isLengthValid = value.length >= 6 && /^[a-zA-Z0-9]+$/.test(value); // 길이와 영문/숫자 조합
                const isDuplicateValid = !isIdDuplicate; // 중복 검사 여부

                setMessages(prev => ({
                    ...prev,
                    idLength: isLengthValid
                        ? '* 6자 이상의 영문 혹은 영문과 숫자 조합'
                        : '* 6자 이상의 영문 혹은 영문과 숫자 조합',
                    idDuplicate: isDuplicateValid
                        ? '* 아이디 중복 확인'
                        : '* 아이디 중복 확인',
                }));

                setValidation(prev => ({
                    ...prev,
                    idLength: isLengthValid,
                    idDuplicate: isDuplicateValid,
                }));
                break;
            }
    
            case 'password': {
                const isLengthValid = value.length >= 10; // 길이 조건
                const isComplexValid =
                    (/[a-zA-Z]/.test(value) && /\d/.test(value)) || // 영문 + 숫자
                    (/[a-zA-Z]/.test(value) && /[!@#$%^&*()_+]/.test(value)) || // 영문 + 특수문자
                    (/\d/.test(value) && /[!@#$%^&*()_+]/.test(value)); // 숫자 + 특수문자

                setMessages(prev => ({
                    ...prev,
                    passwordLength: isLengthValid
                        ? '* 10자 이상 입력'
                        : '* 10자 이상 입력',
                    passwordComplexity: isComplexValid
                        ? '* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)'
                        : '* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)',
                }));

                setValidation(prev => ({
                    ...prev,
                    passwordLength: isLengthValid,
                    passwordComplexity: isComplexValid,
                }));
                break;
            }
    
            case 'confirmPassword':
                isValid = value === form.password;
                message = '* 동일한 비밀번호를 입력해주세요.';
                break;
    
            case 'nickname':
                isValid = value.length >= 2 && /^[a-zA-Z0-9가-힣]+$/.test(value);
                message = '* 2자 이상의 한글·영문·숫자';
                break;
        }
    
        setMessages((prev) => ({ ...prev, [name]: message }));
        setValidation((prev) => ({ ...prev, [name]: isValid }));
    };

    const handleIdCheck = () => {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const isDuplicate = storedUsers.some((user: { id: string }) => user.id === form.id);
    
        if (isDuplicate) {
            setIsIdChecked(true);
            setIsIdDuplicate(true);
            setMessages((prev) => ({
                ...prev,
            }));
            setValidation((prev) => ({
                ...prev,
                idDuplicate: false, // 중복된 경우 유효성 실패
            }));
            alert('이미 사용 중인 아이디입니다.');
        } else {
            setIsIdChecked(true);
            setIsIdDuplicate(false);
            setMessages((prev) => ({
                ...prev,
            }));
            setValidation((prev) => ({
                ...prev,
                idDuplicate: true, // 중복되지 않은 경우 유효성 성공
            }));
            alert('사용할 수 있는 아이디입니다.');
        }
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(validation).every((v) => v) && !isIdDuplicate) {
            const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const newUser = { id: form.id, nickname: form.nickname };
            localStorage.setItem('registeredUsers', JSON.stringify([...storedUsers, newUser]));
    
            alert('회원가입 성공!');
        } else {
            alert('입력한 정보를 확인해주세요.');
        }
    };

    const isIdValid = validation.idLength;

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="inform">
                <div className="informbox">
                    <div className="imgbox">
                        <img src="src\icons\logo.png" alt="logo" />
                    </div>
                    <h1>회원가입</h1>
                    <h6><span className="starcolor">*</span> 필수 입력 사항</h6>
                </div>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label>아이디 <span className="starcolor">*</span></label>
                    <div className="input-container">
                        <input
                            type="text"
                            name="id"
                            value={form.id}
                            onChange={handleChange}
                            onFocus={() => handleFocus('id')}
                            className={validation.idLength && !isIdDuplicate ? 'valid' : ''}
                            placeholder="아이디를 입력해주세요."
                        />
                        {isIdChecked && !isIdDuplicate && (
                            <img className="check-icon" src="src\icons\v-circle.png" />
                        )}
                        <img
                            className="clear-icon"
                            src="src\icons\x-circle.png"
                            onClick={() => {
                                setForm({ ...form, id: '' })}
                            }
                        >
                        </img>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleIdCheck}
                        disabled={!isIdValid} // 유효하지 않으면 버튼 비활성화
                    >
                        중복확인
                    </button>
                </div>
                <small
                    className={
                        form.id === ''
                        ? 'default-text'
                        : validation.idLength
                        ? 'valid-text'
                        : 'error-text'
                    }
                >
                    {messages.idLength}
                </small>
                <small
                    className={
                        !form.id || !isIdChecked
                            ? 'default-text'
                            : validation.idDuplicate
                            ? 'valid-text'
                            : 'error-text'
                    }
                >
                    {messages.idDuplicate}
                </small>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label>비밀번호 <span className="starcolor">*</span></label>
                    <div className="input-container">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            onFocus={() => handleFocus('password')}
                            className={validation.passwordLength && validation.passwordComplexity ? 'valid' : ''}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => setForm({ ...form, password: '' })}
                        >
                        </img>
                    </div>
                </div>
                <small
                    className={
                        form.password === ''
                        ? 'default-text'
                        : validation.passwordComplexity
                        ? 'valid-text'
                        : 'error-text'
                    }                    
                >
                    {messages.passwordComplexity}
                </small>

                <small
                    className={
                        form.password === ''
                        ? 'default-text'
                        : validation.passwordLength
                        ? 'valid-text'
                        : 'error-text'
                    }
                >
                    {messages.passwordLength}
                </small>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label>비밀번호 확인 <span className="starcolor">*</span></label>
                        <div className="input-container">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            onFocus={() => handleFocus('confirmPassword')}
                            className={validation.confirmPassword ? 'valid' : ''}
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => setForm({ ...form, confirmPassword: '' })}
                        >
                        </img>
                    </div>
                </div>

                <small
                    className={
                        form.confirmPassword === ''
                        ? 'default-text'
                        : validation.confirmPassword
                        ? 'valid-text'
                        : 'error-text'
                    }
                >
                    {messages.confirmPassword}
                </small>
            </div>

            <div className="form-group">
                <div className="input-group">
                    <label>닉네임 </label>
                    <div className="input-container">
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            onFocus={() => handleFocus('nickname')}
                            className={validation.nickname ? 'valid' : ''}
                            placeholder="닉네임을 입력해주세요."
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => setForm({ ...form, nickname: '' })}
                        >
                        </img>
                    </div>
                </div>

                <small
                    className={
                        form.nickname === ''
                        ? 'default-text'
                        : validation.nickname
                        ? 'valid-text'
                        : 'error-text'
                    }
                >
                    {messages.nickname}
                </small>
            </div>

            <hr className="contour"></hr>
            <button type="submit" className="submit-button">가입하기</button>
        </form>
    );
};

export default SignupForm;
