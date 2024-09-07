import { getCookie } from '../../../utils/cookies';
import { useEffect, useState } from 'react';
import styles from './EditInfo.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditInfo = () =>
{
  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    mbti: '',
    organization: '',
  });

  useEffect(() =>
  {
    setUserInfo({
      name: userData.name || '',
      mbti: userData.mbti || '',
      organization: userData.organization || '',
    });
  }, []);

  const handleEdit = async () =>
  {
    try
    {
      const response = await axios.put(`https://introme.co.kr/v1/member/${userData.id}`,
        {
          name: userInfo.name,
          mbti: userInfo.mbti,
          organization: userInfo.organization,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.data)
      {
        navigate(-1);
      }
    }
    catch (error)
    {
      console.error("Error updating business card data:", error);
    }
  }




  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  }

  const handleBack = () =>
  {
    navigate(-1);
  }


  return (
    <div className={styles.container}>
      <div>
        <h1>회원정보 수정</h1>
        <form>
          <label>이름</label>
          <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
          <label>이메일</label>
          <input type="text" name="email" value={userData.email || ''} disabled />
          <label>생년월일</label>
          <input type="text" name="birthday" value={userData.birthday || ''} disabled />
          <label>MBTI</label>
          <input type="text" name="mbti" value={userInfo.mbti} onChange={handleChange} />
          <label>소속</label>
          <input type="text" name="organization" value={userInfo.organization} onChange={handleChange} />
          <label>전화번호</label>
          <input type="text" name="phoneNumber" value={userData.phoneNumber || ''} disabled />
          <button onClick={handleEdit} type="submit">수정</button>
          <button onClick={handleBack} type="button">취소</button>
        </form>
      </div>
    </div>
  );
}

export default EditInfo;
