import './style.css';
import { dateFormat } from 'utils';
import { userCommentList } from 'interfaces/response/mypage/get-my-comment-list.response.dto';
import { useNavigate } from 'react-router-dom';
import { REVIEW_BOARD_DETAIL_PATH } from 'constant';

interface Props {
  item: userCommentList;
}

export default function MyPageCommentListItem({item}: Props) {
  //          state         //
  const { writeDatetime, contents, commentNumber, title, boardNumber } = item;

  //          function          //
  // description : 네비게이트함수 //
  const navigator = useNavigate();

  // event handler //
  const oncommentClickbutton = () => {
    navigator(REVIEW_BOARD_DETAIL_PATH(boardNumber));
  }

  //          render          //
  return (
    <div className="admin-comment-list-item-box" onClick={oncommentClickbutton}>
      <div className="admin-comment-list-box">
        <div className='admin-comment-item-number'>{commentNumber}</div>
        <div className='admin-comment-item-contents'> {contents} </div>
        <div className='admin-comment-item-write-datetime'> {dateFormat(writeDatetime)} </div>
        <div className='admin-comment-item-title'> {title} </div>
      </div>
    </div>
  )
}
