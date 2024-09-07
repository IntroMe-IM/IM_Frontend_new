import { getCookie } from "../../../utils/cookies";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TeamSpace.module.css'; // 해당 경로를 실제 경로로 수정해야 합니다.

const TeamSpace = () => {
  const [teams, setTeams] = useState([]);

  const fetchData = async () => {
    try {
      const memberCookie = getCookie('memberCookie');
      const decodedMemberCookie = decodeURIComponent(memberCookie);
      const userData = JSON.parse(decodedMemberCookie);

      const userId = userData.id;
      const response = await axios.get('http://192.168.0.7:8080/v1/team/' + userId);

      setTeams(response.data);

      // response.data에서 image 경로 출력 (필요 시)
      response.data.forEach(team => {
        console.log(team.image);
      });
    } catch (error) {
      console.error('팀스페이스를 불러오는 중 오류 발생', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleTeam = (teamId) => () => {
    console.log(`Team ${teamId} clicked!`);
    // 여기에 팀 클릭 시 실행될 로직을 추가하세요.
  };

  const terminateDate = (date) => {
    return date ? date : '현재';
  };

  const memberParse = (members) => {
    return members.join(', ');
  };

  return (
    <div className={styles.TeamSpace}>
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <div className={styles.team} onClick={handleTeam(team.id)} key={index}>
            <img className={styles.thumbnail} src={team.image} alt="thumbnail" />
            <div className={styles.context}>
              <div className={styles.content}>
                <div className={styles.title}>{team.name}</div>
                <div className={styles.info}>
                  <p>{team.create + ' ~ ' + terminateDate(team.terminate)}</p>
                  <p>대표자: {team.owner}</p>
                  <p>팀원: {memberParse(team.members)}</p>
                </div>
              </div>
              <div className={styles.member}>
                <img src="/svgs/person.svg" alt="members" />
                <p>{team.members.length}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p> // 데이터가 로드되지 않았을 때 로딩 메시지 표시
      )}
    </div>
  );
};

export default TeamSpace;
