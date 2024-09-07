import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../../../../utils/cookies';
import { toast, ToastContainer } from 'react-toastify';
import styles from './DeletePost.module.css';
import API_URL from "../../../../config";

const DeletePost = () =>
{
  const { postId } = useParams();
  const navigate = useNavigate();

  const memberCookie = getCookie('memberCookie');
  const decodedMemberCookie = decodeURIComponent(memberCookie);
  const userData = JSON.parse(decodedMemberCookie);

  const handleDelete = async () =>
  {
    const response = await axios.delete(`${API_URL}/v1/board/${postId}/${userData.id}`);
    if (response.data)
    {
      toast.success('게시글이 삭제되었습니다.');
      navigate('/community/openspace');
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
    <div className={styles.deletePost}>
      <div className={styles.container}>
        <p>정말로 게시글을 삭제하시겠습니까?</p>
        <div className={styles.warning}>
          <p>경고</p>
          <img className={styles.warningImg} src="/svgs/warning.svg" alt="warning" />
        </div>
        <p>한번 삭제한 게시글은</p><p> 되돌릴 수 없습니다.</p>
        <button className={styles.deleteButton} onClick={handleDelete}>삭제하기</button>
        <button className={styles.backButton} onClick={handleBack}>취소</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DeletePost;