import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import BizCard from "../BizCard";
import styles from './BizCardDetail.module.css';

const BizCardDetail = () => {
  let { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  // Fetch the BizCard data and blockchain validation inside useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.7:8080/v1/card/${userId}`);
        const data = response.data;

        if (data.length !== 0) {
          setData(data);
        }
      } catch (error) {
        console.error('카드 정보를 불러오는 중 오류 발생', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchValid = async () => {
      try {
        const response = await axios.get(`http://192.168.0.7:8080/v1/blockchain/${userId}/validate`);
        const isValid = response.data;

        console.log(isValid);

        if (isValid === true) {
          setValid(true);
        }
      } catch (error) {
        console.error('카드 검증 중 오류 발생', error);
      }
    };

    // Call both fetch functions
    fetchData();
    fetchValid();
  }, [userId]); // Only re-run when userId changes

  // Navigate back to the previous page
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.bizCardDetail}>
      <div className={styles.header}>
        <div onClick={handleBack}><img src='/svgs/backArrow.svg' alt='backArrow' /></div>
      </div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loading}>로딩 중...</div>
        ) : (
          <div className={styles.detail}>
            <div className={styles.titleWrapper}>
              <p className={styles.title}>상세 정보</p>
              <img
                src="/svgs/valid.svg"
                alt="valid"
                className={styles.valid}
                style={{ display: valid ? 'block' : 'none' }}
              />
            </div>
            <BizCard bizCard={data} isNavigate={false} />
            <p>이름: {data.name}</p>
            <p>소속: {data.company}</p>
            <p>전화번호: {data.phoneNumber}</p>
            <p>이메일: {data.email}</p>
            <p>소개: {data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BizCardDetail;
