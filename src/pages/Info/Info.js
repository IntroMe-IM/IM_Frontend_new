import BizCard from "../BizCard/BizCard";
import { deleteCookie, getCookie } from "../../utils/cookies";
import styles from './Info.module.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Info = () =>
{
  const [bizCard, setBizCard] = useState(null);
  const navigate = useNavigate();

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const handleBizCard = async () =>
  {
    try
    {
      const response = await axios.get(`/v1/card/${userData.id}`);
      setBizCard(response.data);
    } catch (error)
    {
      console.error("Error fetching business card data:", error);
    }
  }

  const handleEditInfo = () =>
  {
    navigate('./edit');
  }

  const handleSignout = () =>
  {
    deleteCookie('authToken');
    deleteCookie('memberCookie');
    navigate('/signin');
  }

  useEffect(() =>
  {
    handleBizCard();
  }, []);

  if (!bizCard)
  {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.info}>
      <div className={styles.infoEdit} onClick={handleEditInfo}>
        <img src="/images/info/person.png" alt="person" />
        <p>{userData.name}</p>
        <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
      </div>
      <div className={styles.bizCardEdit}>
        <p>명함을 눌러 수정해보세요!</p>
        <BizCard
          bizCard={{ id: bizCard.id, name: bizCard.name, company: bizCard.company, phoneNumber: bizCard.phoneNumber, email: bizCard.email, color: bizCard.color }}
          isNavigate={true}
          isEdit={true}
        />
      </div>
      <img className={styles.infoBanner} src="/images/info/infoBanner.png" alt="infoBanner" />
      <div className={styles.infoItems}>
        {/*공지사항, 고객센터, FAQ, 약관확인, 로그아웃, 버전정보 */}
        <div className={styles.infoItem}>
          <div className={styles.itemContent}>
            <img src="/svgs/notice.svg" alt="notice" />
            <p>공지사항</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
        <div className={styles.infoItem}>
          <div className={styles.itemContent}>
            <img src="/svgs/support.svg" alt="support" />
            <p>고객센터</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
        <div className={styles.infoItem}>
          <div className={styles.itemContent}>
            <img src="/svgs/faq.svg" alt="faq" />
            <p>자주 묻는 질문(FAQ)</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
        <div className={styles.infoItem}>
          <div className={styles.itemContent}>
            <img src="/svgs/terms.svg" alt="terms" />
            <p>약관확인</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
        <div className={styles.infoItem} onClick={handleSignout}>
          <div className={styles.itemContent}>
            <img src="/svgs/signout.svg" alt="signout" />
            <p>로그아웃</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
        <div className={styles.infoItem}>
          <div className={styles.itemContent}>
            <img src="/svgs/version.svg" alt="version" />
            <p>버전정보</p>
          </div>
          <img className={styles.arrowRight} src="/svgs/arrowRight.svg" alt="arrowRight" />
        </div>
      </div>
    </div>
  );
}

export default Info;
