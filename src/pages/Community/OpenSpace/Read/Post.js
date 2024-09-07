import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import { getCookie } from "../../../../utils/cookies";
import { useNavigate } from "react-router-dom";

import styles from './Post.module.css';
import DropdownMenu from "../../../../components/DropDownMenu";
import API_URL from "../../../../config";

const Post = () =>
{
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState({});
  const [commentContent, setCommentContent] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const userId = userData.id;
  const authorId = post.authorId;

  const dropDownMenuOptions = [];

  if (authorId === userId)
  {
    dropDownMenuOptions.push({ label: '게시글 수정', path: './editpost' });
    dropDownMenuOptions.push({ label: '게시글 삭제', path: './deletepost' });
  }

  const fetchPost = async () =>
  {
    try
    {
      const response = await axios.get(`${API_URL}/v1/board/${postId}`);

      // 서버에서 받아온 데이터의 content 속성 확인
      if (response.data)
      {
        setPost(response.data); // 데이터 설정
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error)
    {
      console.error('글을 불러오는 중 오류 발생', error);
    }
  }

  const handleCommentChange = (e) =>
  {
    setCommentContent(e.target.value);
  };

  const fetchComment = async () =>
  {
    try
    {
      const response = await axios.get(`${API_URL}/v1/comment/${postId}`);

      // 서버에서 받아온 데이터의 content 속성 확인
      if (response.data)
      {
        console.log(response.data);
        setComment(response.data); // 데이터 설정
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error)
    {
      console.error('글을 불러오는 중 오류 발생', error);
    }
  }

  const handleComment = async () =>
  {
    try
    {
      const response = await axios.post(`${API_URL}/v1/comment/`,
        {
          "content": commentContent,
          "author": userId,
          "board": postId
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      // 서버에서 받아온 데이터의 content 속성 확인
      if (response.data)
      {
        console.log(response.data);
        setComment(response.data); // 데이터 설정
      } else
      {
        console.error('Unexpected data format:', response.data);
      }
    } catch (error)
    {
      console.error('글을 불러오는 중 오류 발생', error);
    }
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
    fetchPost();
    fetchComment();
  }, []); // postId가 변경될 때마다 fetchData 호출

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.backArrow} onClick={handleBack}><img src='/svgs/backArrow.svg' alt='backArrow' /></div>
        {dropDownMenuOptions.length > 0 && (
          <div className={styles.more} onClick={toggleDropdown}><img src='/svgs/more.svg' alt='more' /></div>
        )}
        <DropdownMenu isVisible={isDropdownVisible} options={dropDownMenuOptions} />
      </div>
      <div className={styles.postContent}>
        <div className={styles.title}>
          <p>{post.title}</p>
        </div>
        <div className={styles.info}>
          <p>{post.author}</p>
          <p>{post.createAt}</p>
          <p>조회 {post.hit}</p>
        </div>
        {post.imgUrl && <img className={styles.thumbnail} src={post.imgUrl} alt="post" />} {/* 이미지가 있을 경우에만 렌더링 */}
        <p>{post.content}</p>
      </div>
      <div className={styles.commentWrapper}>
        <div className={styles.commentInput}>
          <textarea onChange={handleCommentChange} type="text" placeholder="댓글을 입력하세요" />
          <button onClick={handleComment}>등록</button>
        </div>
        <div className={styles.commentList}>
          {comment.length > 0 ? (
            comment.map((comment, index) => (
              <div className={styles.comment} key={index}>
                <p className={styles.content}>{comment.content}</p>
                <div className={styles.commentInfo}>
                  <p className={styles.author}>{comment.author}</p>
                  <p className={styles.createAt}>{comment.createAt}</p>
                </div>
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
