import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useState, useEffect } from 'react';

const NavBar = () =>
{
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>
  {
    switch (location.pathname)
    {
      case '/':
        setActiveIndex(0);
        break;
      case '/wallet':
        setActiveIndex(1);
        break;
      case '/community/openspace':
      case '/community/teamspace': // TeamSpace 경로 추가
        setActiveIndex(2);
        break;
      case '/info':
        setActiveIndex(3);
        break;
      case '/share':
        setActiveIndex(4);
        break;
      default:
        setActiveIndex(0);
    }
  }, [location.pathname]);

  const handleNavClick = (index) =>
  {
    setActiveIndex(index);
    navigate(index === 0 ? '/' : index === 1 ? '/wallet' : index === 2 ? '/community/openspace' : index === 3 ? '/info' : '/share');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navWrapper}>
        <div className={`${styles.navItem} ${activeIndex === 0 ? styles.active : ''}`} onClick={() => handleNavClick(0)}>
          <img src="/svgs/home.svg" className={styles.icon} alt="home" />
          <span>홈</span>
        </div>
        <div className={`${styles.navItem} ${activeIndex === 1 ? styles.active : ''}`} onClick={() => handleNavClick(1)}>
          <img src="/svgs/wallet.svg" className={styles.icon} alt="wallet" />
          <span>명함지갑</span>
        </div>
      </div>

      <div className={styles.centralButton} onClick={() => handleNavClick(4)}>
        <img src="/svgs/share.svg" className={styles.icon} alt="share" />
      </div>

      <div className={styles.navWrapper}>
        <div className={`${styles.navItem} ${activeIndex === 2 ? styles.active : ''}`} onClick={() => handleNavClick(2)}>
          <img src="/svgs/openspace.svg" className={styles.icon} alt="community" />
          <span>오픈공간</span>
        </div>
        <div className={`${styles.navItem} ${activeIndex === 3 ? styles.active : ''}`} onClick={() => handleNavClick(3)}>
          <img src="/svgs/info.svg" className={styles.icon} alt="info" />
          <span>내 정보</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
