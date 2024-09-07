import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './OpenSpace.module.css';
import { useNavigate } from "react-router-dom";

const OpenSpace = () =>
{
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const fetchData = async (index) =>
  {
    try
    {
      const response = await axios.post('http://192.168.0.7:8080/v1/board/page', {
        "page": index,
        "size": 100,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // 서버에서 받아온 데이터의 content 속성 확인
      if (Array.isArray(response.data.content))
      {
        setPosts(response.data.content);
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error)
    {
      console.error('오픈스페이스를 불러오는 중 오류 발생', error);
    }
  };

  const updatedDateCheck = (post) =>
  {
    if (post.updateAt === null)
    {
      return post.createAt;
    } else
    {
      return post.updateAt;
    }
  }

  const handlePost = (postId) =>
  {
    return () =>
    {
      navigate(`/community/openspace/${postId}`);
    }
  }

  useEffect(() =>
  {
    fetchData(0);
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className={styles.OpenSpace}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div onClick={handlePost(post.id)} className={styles.post} key={index}>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.info}>
              <p className={styles.author}>{post.author}</p>
              <p className={styles.date}>{updatedDateCheck(post)}</p>
              <p className={styles.views}>조회 {post.hit}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p> // 데이터가 로드되지 않았을 때 로딩 메시지 표시
      )}
    </div>
  );
}

export default OpenSpace;
