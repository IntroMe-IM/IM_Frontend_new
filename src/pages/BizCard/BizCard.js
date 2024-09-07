import { useNavigate } from 'react-router-dom';
import styles from './BizCard.module.css';

// 색상 밝기 계산 함수
const calculateTextColor = (bgColor) =>
{
  if (!bgColor) return '#ffffff'; // 기본 글씨 색상

  const color = bgColor.substring(1); // #을 제거
  const r = parseInt(color.substring(0, 2), 16); // R 값
  const g = parseInt(color.substring(2, 4), 16); // G 값
  const b = parseInt(color.substring(4, 6), 16); // B 값

  // 밝기 계산
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기가 128 이상이면 검정색, 그렇지 않으면 흰색
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

const BizCard = ({ bizCard, isNavigate = false, isEdit = false }) =>
{
  const navigate = useNavigate();

  isNavigate = isNavigate === undefined ? true : isNavigate;

  const handleClick = () =>
  {
    isEdit
      ? navigate(`/bizcard/${bizCard.id}/edit`)
      : navigate(`/bizcard/${bizCard.id}`);
  }

  // 동적으로 글씨 색상 계산
  const textColor = calculateTextColor(bizCard.color || '#262626');
  const logoSrc = textColor === '#FFFFFF' ? '/svgs/bizCardLogoWhite.svg' : '/svgs/bizCardLogoBlack.svg';

  return (
    <div
      onClick={isNavigate ? handleClick : null}
      className={styles.bizCard}
      style={{ backgroundColor: bizCard.color || '#262626' }}
      data-text-color={textColor}
    >
      <div className={styles.content}>
        <div>
          <p className={styles.name}>{bizCard.name}</p>
          <p className={styles.company}>{bizCard.company}</p>
        </div>
        <div>
          <p className={styles.phoneNumber}>T. {bizCard.phoneNumber}</p>
          <p className={styles.email}>E. {bizCard.email}</p>
        </div>
        <img className={styles.bizCardLogo} src={logoSrc} alt='bizCardLogo' />
      </div>
    </div>
  );
}

export default BizCard;
