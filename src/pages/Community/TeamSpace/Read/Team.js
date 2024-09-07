import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/cookies";

import styles from './Team.module.css';
import DropdownMenu from "../../../../components/DropDownMenu";
import API_URL from "../../../../config";

const Team = () =>
{
  const { teamId } = useParams();
  const [team, setTeam] = useState({}); // 올바르게 useState 사용
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const userId = userData.id;
  const ownerId = team.ownerId;

  const dropDownMenuOptions = [];

  if (ownerId === userId)
  {
    dropDownMenuOptions.push({ label: '팀원 초대', path: './invitemember' });
    dropDownMenuOptions.push({ label: '팀 수정', path: './editteam' });
    dropDownMenuOptions.push({ label: '프로젝트 종료', path: './terminateproject' });
    dropDownMenuOptions.push({ label: '팀 삭제', path: './deleteteam' });
  }

  const navigate = useNavigate();

  const fetchData = async () =>
  {
    try
    {
      const response = await axios.get(`${API_URL}/v1/team/d/${teamId}`);

      // 서버에서 받아온 데이터의 content 속성 확인
      if (response.data)
      {
        setTeam(response.data); // 데이터 설정
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error)
    {
      console.error('글을 불러오는 중 오류 발생', error);
    }
  }

  const terminateDate = (date) =>
  {
    if (date === null)
      return '진행중';
    else
      return date;
  }

  const handleBack = (e) =>
  {
    e.preventDefault();
    navigate(-1);
  }

  const toggleDropdown = () =>
  {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() =>
  {
    fetchData();
  }, []); // teamId가 변경될 때마다 fetchData 호출

  return (
    <div className={styles.team}>
      <div className={styles.header}>
        <div className={styles.backArrow} onClick={handleBack}><img src='/svgs/backArrow.svg' alt='backArrow' /></div>
        {dropDownMenuOptions.length > 0 && (
          <div className={styles.more} onClick={toggleDropdown}><img src='/svgs/more.svg' alt='more' /></div>
        )}
        <DropdownMenu isVisible={isDropdownVisible} options={dropDownMenuOptions} />
      </div>
      <div className={styles.teamContent}>
        <div className={styles.name}>
          <p>{team.name}</p>
          <p>{team.project}</p>
        </div>
        {team.imgUrl && <img className={styles.thumbnail} src={team.imgUrl} alt="team" />} {/* 이미지가 있을 경우에만 렌더링 */}
        <div className={styles.info}>
          <div className={styles.owner}>
            <p>대표자: </p>
            <p>{team.ownerId}</p>
          </div>
          <div className={styles.date}>
            <img src="/svgs/calendar.svg" alt="date" />
            <p>{team.createdDate + ' ~ ' + terminateDate(team.terminateDate)}</p>
          </div>
          <div className={styles.member}>
            <img src="/svgs/person.svg" alt="members" />
            <p>{team.members ? team.members.join(', ') : ''}</p>
          </div>
        </div>
        <p>{team.description}</p>
      </div>
    </div>
  );
}

export default Team;
