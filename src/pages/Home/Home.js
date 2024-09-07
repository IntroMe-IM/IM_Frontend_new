import styles from './Home.module.css';
import CustomCarousel from '../../components/CustomCarousel';
import BizCard from '../BizCard/BizCard';
import { React, useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookies';
import axios from 'axios';
import API_URL from "../../config";

const Home = () =>
{
  const [bizCardItems, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerItems = [
    <img className={styles.img} src="/images/bannerCarousel/1.png" alt="1" />,
    <img className={styles.img} src="/images/bannerCarousel/2.png" alt="2" />,
    <img className={styles.img} src="/images/bannerCarousel/3.png" alt="3" />
  ];

  const bannerSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    arrows: false,
  };

  const projectItems = [
    <img className={styles.img} src="/images/projectCarousel/1.png" alt="1" />,
    <img className={styles.img} src="/images/projectCarousel/2.png" alt="2" />,
    <img className={styles.img} src="/images/projectCarousel/3.png" alt="3" />
  ];

  const projectSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    variableWidth: true,
    arrows: false,
  };

  const bizCardSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    variableWidth: true,
    arrows: false,
  };

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const memberCookie = getCookie('memberCookie');
        const decodedMemberCookie = decodeURIComponent(memberCookie);
        const userData = JSON.parse(decodedMemberCookie);

        const userId = userData.id;
        const response = await axios.get(`${API_URL}/v1/card/shared-cards/` + userId);
        const data = response.data;

        if (data.length !== 0)
        {
          const items = data.map((item, index) => (
            <div style={{ marginRight: "20px" }} key={index}>
              <BizCard bizCard={item} />
            </div>
          ));
          setItems(items);
        } else
        {
          setItems([]);
        }
      } catch (error)
      {
        console.error('카드 정보를 불러오는 중 오류 발생', error);
      } finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
  {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.Home}>
      <CustomCarousel
        items={bannerItems}
        settings={bannerSettings}
      />
      <div className={styles.bizCardCarousel}>
        <h3>최근 업데이트 명함</h3>
        {bizCardItems.length > 0 ? (
          <CustomCarousel
            items={bizCardItems}
            settings={bizCardSettings}
          />
        ) : (
          <div>공유 받은 명함이 없습니다.</div>
        )}
      </div>
      <div className={styles.projectCarousel}>
        <h3>팀 스페이스</h3>
        <CustomCarousel
          items={projectItems}
          settings={projectSettings}
        />
      </div>
    </div>
  );
};

export default Home;
