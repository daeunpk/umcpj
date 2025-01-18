import React from 'react';
import './Checkbox.css'; // 스타일 파일

interface CustomCheckboxProps {
  checked: boolean; // 체크 상태
  onChange: () => void; // 상태 변경 이벤트
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <span className="custom-checkbox" onClick={onChange}>
      {checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_768_3163)">
            <circle cx="12" cy="12" r="11.5" fill="#F42B72" stroke="#F42B72" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.7311 7.81769C19.1079 8.22144 19.0861 8.85423 18.6823 9.23106L11.1823 16.2311C10.7884 16.5987 10.1739 16.5882 9.79289 16.2071L5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929C5.68342 9.90237 6.31658 9.90237 6.70711 10.2929L10.524 14.1098L17.3177 7.76895C17.7214 7.39211 18.3542 7.41393 18.7311 7.81769Z"
              fill="#FEF1F6"
            />
          </g>
          <defs>
            <clipPath id="clip0_768_3163">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_697_1618)">
            <circle cx="12" cy="12" r="11.5" stroke="#8D8F90" />
          </g>
          <defs>
            <clipPath id="clip0_697_1618">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </span>
  );
};

export default CustomCheckbox;
