import GetCommentListResponseDto, { CommentListResponseDto } from 'interfaces/response/reviewBoard/get-comment-list.response.dto';
import './style.css';
import { useUserStore } from 'stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARD_NUMBER_PATH_VARIABLE, REVIEW_BOARD_DETAIL_PATH } from 'constant';
import { deleteReviewBoardCommentRequest } from 'apis';
import { useState } from 'react';
import { dateFormat } from 'utils';

interface Props {
  item: CommentListResponseDto;
}

export default function AdminUserCommentListItem({item}: Props) {
  //          state         //
  const { writeDatetime, contents, commentNumber } = item;

  //          render          //
  return (
    <div className="admin-comment-list-item-box">
      <div className="admin-comment-list-box">
        <div className='admin-comment-item-number'>{commentNumber}</div>
        <div className='admin-comment-item-user-contents'> {contents} </div>
        <div className='admin-comment-item-write-datetime'> {dateFormat(writeDatetime)} </div>
      </div>
    </div>
  )
}
