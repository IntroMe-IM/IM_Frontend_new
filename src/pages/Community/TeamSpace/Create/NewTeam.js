import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../../utils/cookies';
import axios from 'axios';
import styles from './NewTeam.module.css';

const NewTeam = () => {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleProjectChange = (e) => {
    setProject(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const memberCookie = getCookie('memberCookie');
    const decodedMemberCookie = decodeURIComponent(memberCookie);
    const userData = JSON.parse(decodedMemberCookie);

    const team = {
      name: title,
      project: project,
      description: content,
      image: "",
      owner: userData.id,
    };

    const formData = new FormData();
    formData.append('team', new Blob([JSON.stringify(team)], { type: 'application/json' }));
    formData.append('file', file);

    try {
      const response = await axios.post('/v1/team/build', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);

      if (response.data === '빌드 완료') {
        navigate(-1);
      } else {
        alert('팀 빌딩 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.newteam}>
      <div className={styles.p}>
        <p>새 프로젝트</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.teamname}
          type="text"
          placeholder="팀명 입력"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          className={styles.project}
          type="text"
          placeholder="프로젝트명 입력"
          value={project}
          onChange={handleProjectChange}
        />
        <textarea
          className={styles.content}
          placeholder="내용"
          value={content}
          onChange={handleContentChange}
        />
        <input
          className={styles.file}
          type="file"
          onChange={handleFileChange}
        />
        <button className={styles.submit} type="submit">생성</button>
        <button className={styles.cancel} onClick={handleCancel} type="button">취소</button>
      </form>
    </div>
  );
};

export default NewTeam;
