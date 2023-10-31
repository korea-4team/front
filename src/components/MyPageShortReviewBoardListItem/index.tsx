import './style.css';
import { dateFormat } from 'utils';
import { userShortReviewDto } from 'interfaces/response/mypage/get-my-short-review-list.response.dto';

interface Props {
  item: userShortReviewDto;
}

export default function MyPageShortReviewListItem({item}: Props) {
  //          state         //
  const { writeDatetime, contents, score, shortReviewNumber, boardTitle } = item;

  //          render          //
  return (
    <div className="admin-short-review-list-item-box">
      <div className="admin-short-review-list-box">
        <div className='admin-short-review-item-number'>{shortReviewNumber}</div>
        <div className='admin-short-review-item-contents'> {contents} </div>
        <div className='admin-short-review-item-score'> {score} </div>
        <div className='admin-short-review-item-write-datetime'> {dateFormat(writeDatetime)} </div>
        <div className='admin-short-review-item-title'> {boardTitle} </div>
      </div>
    </div>
  )
}
