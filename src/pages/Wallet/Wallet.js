import React, { useEffect, useState } from 'react';
import styles from "./Wallet.module.css";
import CircularCarousel from "../../components/CircularCarousel";
import { getCookie } from "../../utils/cookies";
import axios from 'axios';
import BizCard from '../BizCard/BizCard';

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

        const response = await axios.get(`/v1/card/shared-cards/${userId}`);
        const data = response.data;
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          const items = data.map((item, index) => (
            <BizCard key={index} bizCard={item} isNavigate={true} />
          ));
          setItems(items);
        } else {
          setItems([]);  // Set to empty array if no cards are received
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching card information:', error);
        setError('An error occurred while fetching card information.');  // Set error state
      } 
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading indicator while fetching data
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;  // Display error message
  }

  // Ensure a minimum number of slides for the carousel
  const minSlides = 4;
  const extendedItems = [...items];
  while (extendedItems.length < minSlides) {
    extendedItems.push(...items);  // Duplicate items to meet minimum slide requirement
  }

  return (
    <div className={styles.wallet}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle} />
      </div>
      {items.length > 0 ? (
        <CircularCarousel items={extendedItems} />  // Show carousel if items are present
      ) : (
        <div className={styles.noCard}>
          <p>No business cards received.</p>  // Show message if no items are present
        </div>
      )}
    </div>
  );
};

export default Wallet;
