//숙명여대_박다은_다나
import React from 'react';
import './Button.css';

// ButtonProps 인터페이스 정의
interface ButtonProps {
    onClick: () => void; // 클릭 시 호출되는 함수
    children: React.ReactNode; // 버튼 텍스트나 요소
    className?: string; // 추가적인 스타일 클래스
    disabled?: boolean; // 비활성화 여부
}

// Button 컴포넌트 정의
const Button: React.FC<ButtonProps> = ({ onClick, children, className, disabled }) => {
    return (
        <button
        onClick={onClick}
        className={`btn ${className}`} // className을 통해 스타일을 확장할 수 있음
        disabled={disabled} // 비활성화 상태
        >
        {children} {/* 버튼 안에 표시할 내용 */}
        </button>
    );
};

export default Button;
