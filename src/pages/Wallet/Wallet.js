import React, { useEffect, useState } from 'react';
import styles from "./Wallet.module.css";
import CircularCarousel from "../../components/CircularCarousel";
import { getCookie } from "../../utils/cookies";
import axios from 'axios';
import BizCard from '../BizCard/BizCard';
import API_URL from "../../config";

const Wallet = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberCookie = getCookie('memberCookie');
        if (!memberCookie) {
          throw new Error('No member cookie found');
        }

        const decodedMemberCookie = decodeURIComponent(memberCookie);
        const userData = JSON.parse(decodedMemberCookie);
        const userId = userData.id;

        const response = await axios.get(`${API_URL}/v1/card/shared-cards/${userId}`);
        const data = response.data;
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          const items = data.map((item, index) => (
            <BizCard key={index} bizCard={item} isNavigate={true} />
          ));
          setItems(items);
        } else {
          setItems([]);  // 명함이 없을 경우 빈 배열로 설정
        }
      } catch (error) {
        console.error('Error fetching card information:', error);
        setError('명함 정보를 불러오는 중 오류가 발생했습니다.');  // 오류 메시지 한글로 설정
      } 
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.wallet}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle} />
      </div>
      {items.length > 0 ? (
        <CircularCarousel items={items} />
      ) : (
        <div className={styles.noCard}>
          <p>공유받은 명함이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Wallet;
