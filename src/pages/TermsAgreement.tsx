import React, { useState } from 'react';
import CustomCheckbox from '../components/Checkbox';
import { termsContent } from '../data/termsContent';
import './termsAgreement.css'; // 별도 CSS 파일

interface TermsAgreementProps {
  onChange: (isAllRequiredChecked: boolean, hasInteracted: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ onChange }) => {
  const [agreements, setAgreements] = useState({
    allChecked: false,
    terms: false,
    privacy: false,
    optional: false,
    adult: false,
  });

  const [hasInteracted, setHasInteracted] = useState(false); // 사용자가 체크박스와 상호작용했는지 여부
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const handleIndividualCheck = (name: keyof typeof agreements) => {
    setAgreements((prev) => {
      const updated = { ...prev, [name]: !prev[name] };
      const isAllRequiredChecked = updated.terms && updated.privacy && updated.adult;
      const isAllChecked = isAllRequiredChecked && updated.optional;
      // 상호작용 상태 업데이트 및 부모로 상태 전달
      setHasInteracted(true);
      onChange(isAllRequiredChecked, true);
  
      return { ...updated, allChecked: isAllChecked };
    });
  };
  
  const handleAllCheck = () => {
    const allChecked = !agreements.allChecked;
    const updatedAgreements = {
      allChecked,
      terms: allChecked,
      privacy: allChecked,
      optional: allChecked,
      adult: allChecked,
    };
  
    setAgreements(updatedAgreements);
    setHasInteracted(true);
  
    const isAllRequiredChecked = allChecked && updatedAgreements.terms && updatedAgreements.privacy && updatedAgreements.adult;
    onChange(isAllRequiredChecked, true);
  };
  
  const handlePopup = (title: string, content: string) => {
    const cleanedTitle = title.replace(/동의/g, '');
    setPopupContent(content);
    setShowPopup(true);
    setPopupTitle(cleanedTitle);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent('');
    setPopupTitle('');
  };

  return (
    <div className="terms-agreement">
      <div className="agreement">
        <label className="agree">이용약관 동의</label>
        <label className="allcheckbox-label">
          
            <CustomCheckbox
                checked={agreements.allChecked}
                onChange={handleAllCheck}
            />
          <div>
            <span className="allagree">전체 동의합니다.</span>
          </div>
        </label>
        
      </div>
      <div className="info-container">
            <div className="info">선택항목에 동의하지 않은 경우도 회원가입 및 서비스 이용이 가능합니다.</div>
      </div>

      {[
        { name: 'terms', label: '이용약관 동의 (필수)', content: termsContent.terms },
        {
          name: 'privacy', label: '개인정보 수집 및 이용 동의 (필수)', content: termsContent.privacy,
        },
        { 
          name: 'optional', label: '개인정보 수집 및 이용 동의 (선택)', content: termsContent.optional,
        },
        { 
            name: 'adult', label: '본인은 만 19세 이상입니다. (필수)', content: '성인 동의 내용' },
      ].map((item) => (
        <div key={item.name} className="agreement-item">
          <label className="checkbox-label">
            <CustomCheckbox
              checked={agreements[item.name as keyof typeof agreements]}
              onChange={() => handleIndividualCheck(item.name as keyof typeof agreements)}
            />
            <span>{item.label}</span>
          </label>
          {/* 조건부 렌더링: "adult" 항목은 버튼을 렌더링하지 않음 */}
         {item.name !== 'adult' && (
          <button
            type="button"
            className="view-terms-button"
            onClick={() => handlePopup(item.label,item.content)
            
            }
          >
            약관보기
          </button>
         )}
        </div>
      ))}

      {/* 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="title-container">
                <h3 className="popup-title">{popupTitle}</h3>
            </div>
            <textarea readOnly value={popupContent} className="popup-content" />
            
            <button className="popup-close-button" onClick={closePopup}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAgreement;