import styles from './EditTeam.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../../../utils/cookies';
import { useParams } from 'react-router-dom';

const EditTeam = () =>
{
  const { teamId } = useParams();
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (e) =>
  {
    setTitle(e.target.value);
  };

  const handleProjectChange = (e) =>
  {
    setProject(e.target.value);
  };

  const handleContentChange = (e) =>
  {
    setContent(e.target.value);
  };

  const handleGetTeam = async () =>
  {
    try
    {
      const response = await axios.get(`/v1/team/d/${teamId}`);

      if (response.data)
      {
        setTitle(response.data.name);
        setProject(response.data.project);
        setContent(response.data.description);
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    }
    catch (error)
    {
      console.error('팀을 불러오는 중 오류 발생', error);
    }
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '')
    {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const response = await axios.put(`/v1/team/${teamId}`, {
      "name": title,
      "project": project,
      "description": content,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    if (response.data === '빌드 완료')
    {
      navigate(-1);
    } else
    {
      alert('팀 빌딩 중 오류가 발생했습니다.');
    }
  };

  useEffect(() =>
  {
    handleGetTeam();
  }, []); // teamId가 변경될 때마다 fetchData 호출

  const handleCancel = () =>
  {
    navigate(-1);
  }
  return (
    <div className={styles.editteam}>
      <div className={styles.p}>
        <p>팀 수정</p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
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
        <button className={styles.submit} type="submit">수정</button>
        <button className={styles.cancel} onClick={handleCancel} type="button">취소</button>
      </form>
    </div>
  );
}

export default EditTeam;