import './style.css';
import { dateFormat } from 'utils';
import { userCommentList } from 'interfaces/response/mypage/get-my-comment-list.response.dto';

interface Props {
  item: userCommentList;
}

export default function MyPageCommentListItem({item}: Props) {
  //          state         //
  const { writeDatetime, contents, commentNumber, title } = item;

  //          render          //
  return (
    <div className="admin-comment-list-item-box">
      <div className="admin-comment-list-box">
        <div className='admin-comment-item-number'>{commentNumber}</div>
        <div className='admin-comment-item-contents'> {contents} </div>
        <div className='admin-comment-item-write-datetime'> {dateFormat(writeDatetime)} </div>
        <div className='admin-comment-item-title'> {title} </div>
      </div>
    </div>
  )
}
