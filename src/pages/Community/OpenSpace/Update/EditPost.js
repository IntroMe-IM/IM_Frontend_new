import styles from './EditPost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../../../utils/cookies';
import { useParams } from 'react-router-dom';

const EditPost = () =>
{
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (e) =>
  {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) =>
  {
    setContent(e.target.value);
  };

  const handleGetPost = async () =>
  {
    try
    {
      const response = await axios.get(`https://introme.co.kr/v1/board/${postId}`);

      if (response.data)
      {
        setTitle(response.data.title);
        setContent(response.data.content);
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    }
    catch (error)
    {
      console.error('포스트를 불러오는 중 오류 발생', error);
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

    const memberCookie = getCookie('memberCookie');
    const decodedMemberCookie = decodeURIComponent(memberCookie);
    const userData = JSON.parse(decodedMemberCookie);

    const response = await axios.put(`https://introme.co.kr/v1/board/${postId}`, {
      "title": title,
      "content": content,
      "updatedAt": "2024-06-15",
      "imgUrl": "",
      "authorId": userData.id,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data === '작성완료!')
    {
      navigate(-1);
    } else
    {
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  useEffect(() =>
  {
    handleGetPost();
  }, []); // postId가 변경될 때마다 fetchData 호출

  const handleCancel = () =>
  {
    navigate(-1);
  }
  return (
    <div className={styles.editpost}>
      <div className={styles.p}>
        <p>글 수정</p>
      </div>
      <form
        className={styles.form}
        onSubmit={handleSubmit}>
        <input
          className={styles.title}
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
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

export default EditPost;