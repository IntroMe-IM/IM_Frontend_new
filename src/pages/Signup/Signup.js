import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from "../../config";

const Signup = () =>
{
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyNumber, setVerifyNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 인증번호 검증 상태
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({}); // 입력 필드 터치 상태
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleBack = (e) =>
  {
    e.preventDefault();
    navigate('/');
  };

  const validateForm = () =>
  {
    const isBirthValid = birth.length === 8 && /^\d{8}$/.test(birth);
    const isPhoneNumberValid = phoneNumber.length === 11 && /^\d{11}$/.test(phoneNumber);
    const isPasswordValid = password.length >= 8;
    const isPasswordMatch = password === confirmPassword;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validationErrors = {
      birth: !isBirthValid,
      phoneNumber: !isPhoneNumberValid,
      password: !isPasswordValid,
      confirmPassword: !isPasswordMatch,
      email: !isEmailValid,
    };

    setErrors(validationErrors);

    const isValid = name && email && isBirthValid && isPhoneNumberValid && isPasswordValid && isPasswordMatch && isVerified && isEmailValid;
    setIsFormValid(isValid);
  };

  const handleVerify = async (e) =>
  {
    e.preventDefault();

    try
    {
      const response = await axios.post(`${API_URL}/v1/member/verify-phone`, {
        phoneNumber: phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      setIsVerified(true); // 인증이 성공하면 true로 설정
      validateForm(); // 인증 성공 후 유효성 검사
    } catch (error)
    {
      toast.error('인증번호 전송 실패');
    }
  };

  const handleSignup = async (e) =>
  {
    e.preventDefault();

    try
    {
      const regex = /^(\d{4})(\d{2})(\d{2})$/;

      const result = birth.match(regex);

      const year = result[1];
      const month = result[2];
      const day = result[3];

      const formattedBirth = `${year}-${month}-${day}`;

      const response = await axios.post(`${API_URL}/v1/member/signup?verificationCode=` + verifyNumber, {
        name: name,
        birth: formattedBirth,
        email: email,
        password: password,
        phoneNumber: phoneNumber
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      if (response.data === '회원가입 완료!')
      {
        toast.success('회원가입 성공');
        navigate('/');
      } else
      {
        alert('회원가입 실패');
      }
    } catch (error)
    {
      toast.error('회원가입 실패');
    }
  };

  const handleChange = (setter) => (e) =>
  {
    setter(e.target.value);
    validateForm(); // 입력 값 변경 시 유효성 검사
  };

  const handleBlur = (field) => () =>
  {
    setTouched({ ...touched, [field]: true });
    validateForm(); // 필드 포커스 해제 시 유효성 검사
  };

  return (
    <div className={styles.signup}>
      <div className={styles.header}>
        <a href="/" onClick={handleBack}><img src='svgs/backArrow.svg' alt='backArrow' /></a>
        <p>회원가입</p>
      </div>
      <div className={styles.intro}>
        <p>자신의 이력과 프로필을</p>
        <p>효율적으로 공유해보세요.</p>
      </div>
      <div className={styles.signupForm}>
        <input
          id="name"
          placeholder='이름'
          type='text'
          value={name}
          onChange={handleChange(setName)}
          onBlur={handleBlur('name')}
        />
        <input
          id="birth"
          className={touched.birth && errors.birth ? styles.errorInput : ''}
          placeholder='생년월일("-"를 제외한 8자리)'
          type='text'
          value={birth}
          onChange={handleChange(setBirth)}
          onBlur={handleBlur('birth')}
        />
        {touched.birth && errors.birth && <p className={styles.errorMessage}>생년월일을 올바르게 입력하세요.</p>}

        <input
          id="email"
          className={touched.email && errors.email ? styles.errorInput : ''}
          placeholder='이메일'
          type='text'
          value={email}
          onChange={handleChange(setEmail)}
          onBlur={handleBlur('email')}
        />
        {touched.email && errors.email && <p className={styles.errorMessage}>유효한 이메일을 입력하세요.</p>}

        <input
          id="password"
          className={touched.password && errors.password ? styles.errorInput : ''}
          placeholder='비밀번호(8자리 이상)'
          type='password'
          value={password}
          onChange={handleChange(setPassword)}
          onBlur={handleBlur('password')}
        />
        {touched.password && errors.password && <p className={styles.errorMessage}>비밀번호는 8자리 이상이어야 합니다.</p>}

        <input
          placeholder='비밀번호 확인'
          className={touched.confirmPassword && errors.confirmPassword ? styles.errorInput : ''}
          type='password'
          value={confirmPassword}
          onChange={handleChange(setConfirmPassword)}
          onBlur={handleBlur('confirmPassword')}
        />
        {touched.confirmPassword && errors.confirmPassword && <p className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</p>}

        <div className={styles.phone}>
          <input
            id="phoneNumber"
            className={touched.phoneNumber && errors.phoneNumber ? styles.errorInput : ''}
            placeholder='휴대폰("-"를 제외한 11자리)'
            type='text'
            value={phoneNumber}
            onChange={handleChange(setPhoneNumber)}
            onBlur={handleBlur('phoneNumber')}
          />
          <button className={styles.verifyButton} onClick={handleVerify}>인증번호 받기</button>
        </div>
        {touched.phoneNumber && errors.phoneNumber && <p className={styles.errorMessage}>휴대폰 번호를 올바르게 입력하세요.</p>}

        <div className={styles.verifyPhone}>
          <input
            id="verifyNumber"
            placeholder='인증번호'
            type='text'
            value={verifyNumber}
            onChange={handleChange(setVerifyNumber)}
          />
        </div>
        <button
          className={`${styles.signupButton} ${isFormValid ? styles.active : styles.inactive}`}
          onClick={handleSignup}
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Signup;
