import React, { useState, useRef } from 'react';
import './signupForm.css';
import TermsAgreement from './TermsAgreement';

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
        password: false,
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAllRequiredChecked, setIsAllRequiredChecked] = useState(false); // 약관 동의 상태
    const [hasInteracted, setHasInteracted] = useState(false);

    const idInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
        passwordInputRef.current?.focus();
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
        confirmPasswordInputRef.current?.focus();
    };

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
        const { id, password, ...relevantValidation } = validation;

         console.log('필수 입력 필드 유효성 상태:', relevantValidation);
         console.log('아이디 중복 여부:', isIdDuplicate);
         console.log('필수 약관 동의 상태:', isAllRequiredChecked);

        // const requiredValidation = { ...validation };
        // delete requiredValidation.nickname; // 닉네임 유효성을 제외
        
        if (Object.values(relevantValidation).every((v) => v) && !isIdDuplicate && isAllRequiredChecked) {
            const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const newUser = { id: form.id, nickname: form.nickname };
            localStorage.setItem('registeredUsers', JSON.stringify([...storedUsers, newUser]));
    
            alert('회원가입 성공!');
        } else {
            // 유효성 검사 실패 시 메시지
            if (!isAllRequiredChecked) {
                alert('필수 약관을 모두 동의해주세요.');
        } else {
            alert('입력한 정보를 확인해주세요.');
        }
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
                            ref={idInputRef}
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
                                setForm({ ...form, id: '' });
                                idInputRef.current?.focus();
                            }}
                        >
                        </img>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleIdCheck}
                        disabled={!isIdValid} // 유효하지 않으면 버튼 비활성화
                        className="idbutton"
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
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            // onFocus={() => handleFocus('password')}
                            ref={passwordInputRef}
                            className={validation.passwordLength && validation.passwordComplexity ? 'valid' : ''}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <img
                            src={showPassword ? 'src/icons/eye.png' : 'src/icons/eye-off.png'}
                            alt={showPassword ? '보기' : '숨기기'}
                            className="toggle-password-icon"
                            onClick={toggleShowPassword}
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => {
                                setForm({ ...form, password: '' });
                                passwordInputRef.current?.focus(); // input에 다시 focus 설정
                            }}
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
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            onFocus={() => handleFocus('confirmPassword')}
                            ref={confirmPasswordInputRef}
                            className={validation.confirmPassword ? 'valid' : ''}
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                        />
                        <img
                            src={showConfirmPassword ? 'src/icons/eye.png' : 'src/icons/eye-off.png'}
                            alt={showConfirmPassword ? '보기' : '숨기기'}
                            className="toggle-password-icon"
                            onClick={toggleShowConfirmPassword}
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => {
                                setForm({ ...form, confirmPassword: '' });
                                confirmPasswordInputRef.current?.focus(); // input에 다시 focus 설정
                            }}
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
                            ref={nicknameInputRef}
                            className={validation.nickname ? 'valid' : ''}
                            placeholder="닉네임을 입력해주세요."
                        />
                        <img
                            className="clear-icon-us"
                            src="src\icons\x-circle.png"
                            onClick={() => {
                                setForm({ ...form, nickname: '' });
                                nicknameInputRef.current?.focus();
                            }}
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
            <TermsAgreement
                onChange={(isAllRequiredChecked, hasInteracted) => {
                    setIsAllRequiredChecked(isAllRequiredChecked);
                    setHasInteracted(hasInteracted);
                    console.log('필수 약관 동의 상태:', isAllRequiredChecked);
                    console.log('상호작용 상태:', hasInteracted);
                }}
            />
            {!isAllRequiredChecked && hasInteracted && (
                <div className="error-message">필수 항목 체크를 다시 확인해주세요.</div>
            )}
            <div className="button-container">
                <button className="back-button">뒤로가기</button>
                <button type="submit" className="submit-button">가입하기</button>
            </div>
        </form>
    );
};

export default SignupForm;