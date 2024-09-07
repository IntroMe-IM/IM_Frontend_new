import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../../../utils/cookies';
import styles from './TerminateProject.module.css';

import { toast, ToastContainer } from 'react-toastify';

const TerminateProject = () =>
{
  const { teamId } = useParams();
  const navigate = useNavigate();

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const handleTerminate = async () =>
  {
    const response = await axios.post(`/v1/team/terminate`,
      {
        "ownerId": userData.id,
        "teamId": teamId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (response.data)
    {
      toast.success('프로젝트가 종료되었습니다.');
      navigate(`/community/teamspace/${teamId}`);
    } else
    {
      console.error('Unexpected data format:', response.data);
    }
  }

  const handleBack = (e) =>
  {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={styles.terminateProject}>
      <div className={styles.container}>
        <p>정말로 프로젝트를 종료하시겠습니까?</p>
        <div className={styles.warning}>
          <p>경고</p>
          <img className={styles.warningImg} src="/svgs/warning.svg" alt="warning" />
        </div>
        <p>한번 종료한 프로젝트는</p><p> 되돌릴 수 없습니다.</p>
        <button className={styles.deleteButton} onClick={handleTerminate}>종료하기</button>
        <button className={styles.backButton} onClick={handleBack}>취소</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TerminateProject;