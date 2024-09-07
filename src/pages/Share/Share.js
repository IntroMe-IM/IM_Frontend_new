import { getCookie } from '../../utils/cookies';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Share.module.css';
import 'react-toastify/dist/ReactToastify.css';
import BizCard from '../BizCard/BizCard';

const Share = () =>
{
  const navigate = useNavigate();

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  console.log(userData);

  const url = userData.url;

  const name = userData.name;
  const org = userData.organization;
  const tel = userData.phoneNumber;
  const email = userData.email;

  const copyUrl = () =>
  {
    navigator.clipboard.writeText(url).then(() =>
    {
      toast.success("복사되었습니다!", {
        position: "bottom-center",
        autoClose: 2000, // 2초 후 자동으로 닫힘
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }).catch((error) =>
    {
      toast.error("복사 실패!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    });
  }

  const handleBack = (e) =>
  {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={styles.share}>
      <div className={styles.header}>
        <div onClick={handleBack}><img src='/svgs/backArrow.svg' alt='backArrow' /></div>
        <p>명함 공유</p>
      </div>
      <BizCard bizCard={{ name: name, company: org, phoneNumber: tel, email: email }} />
      <div className={styles.shareQR}>
        <p>QR 코드</p>
        {url && <QRCode value={url} />}
        <div className={styles.copyUrl}>
          <button className={styles.copyButton} onClick={copyUrl}><img src='/svgs/clipboard.svg' alt='copy' /><p>공유링크 복사</p></button>
        </div>
      </div>
      <div className={styles.shareSNS}>
        <div className={styles.snsIcons}>
          <img src='/svgs/kakaoTalk.svg' alt='kakaoTalk' />
          <img src='/svgs/instagram.svg' alt='instagram' />
        </div>
      </div>
      <ToastContainer />
    </div >
  );
}

export default Share;