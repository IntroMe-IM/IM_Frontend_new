import { getCookie } from '../../../utils/cookies';
import { useEffect, useRef, useState } from 'react';
import styles from './EditInfo.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "../../../config";

const EditInfo = () => {
  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const navigate = useNavigate();

  // Refs for storing input values without triggering re-renders
  const nameRef = useRef();
  const mbtiRef = useRef();
  const organizationRef = useRef();

  const [userInfo, setUserInfo] = useState({
    name: '',
    mbti: '',
    organization: '',
  });

  useEffect(() => {
    const cachedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  
    // Check if there's a difference before setting the state
    if (cachedUserInfo) {
      if (
        cachedUserInfo.name !== userInfo.name ||
        cachedUserInfo.mbti !== userInfo.mbti ||
        cachedUserInfo.organization !== userInfo.organization
      ) {
        setUserInfo({
          name: cachedUserInfo.name || userData.name || '',
          mbti: cachedUserInfo.mbti || userData.mbti || '',
          organization: cachedUserInfo.organization || userData.organization || '',
        });
      }
    } else if (
      userData.name !== userInfo.name ||
      userData.mbti !== userInfo.mbti ||
      userData.organization !== userInfo.organization
    ) {
      setUserInfo({
        name: userData.name || '',
        mbti: userData.mbti || '',
        organization: userData.organization || '',
      });
    }
  }, [userData, userInfo]); // Add userData and userInfo as dependencies
  

  // Handle edit when the "수정" button is clicked
  const handleEdit = async (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    // Update userInfo state with input refs
    const updatedUserInfo = {
      name: nameRef.current.value || userInfo.name,
      mbti: mbtiRef.current.value || userInfo.mbti,
      organization: organizationRef.current.value || userInfo.organization,
    };

    try {
      console.log("Updating user data:", updatedUserInfo); // Add logging to see what's being updated
      const response = await axios.put(
        `${API_URL}/v1/member/${userData.id}`,
        updatedUserInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.data) {
        // Cache updated user info locally
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        console.log("User data successfully updated");
        setUserInfo(updatedUserInfo);
        navigate(-1); // Go back to the previous page
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>회원정보 수정</h1>
        <form>
          <label>이름</label>
          <input
            type="text"
            name="name"
            defaultValue={userInfo.name} // Use defaultValue to keep initial value
            ref={nameRef} // Store reference
          />
          <label>이메일</label>
          <input type="text" name="email" value={userData.email || ''} disabled />
          <label>생년월일</label>
          <input type="text" name="birthday" value={userData.birthday || ''} disabled />
          <label>MBTI</label>
          <input
            type="text"
            name="mbti"
            defaultValue={userInfo.mbti} // Use defaultValue to keep initial value
            ref={mbtiRef} // Store reference
          />
          <label>소속</label>
          <input
            type="text"
            name="organization"
            defaultValue={userInfo.organization} // Use defaultValue to keep initial value
            ref={organizationRef} // Store reference
          />
          <label>전화번호</label>
          <input type="text" name="phoneNumber" value={userData.phoneNumber || ''} disabled />
          <button onClick={handleEdit} type="button">수정</button>
          <button onClick={handleBack} type="button">취소</button>
        </form>
      </div>
    </div>
  );
}

export default EditInfo;
