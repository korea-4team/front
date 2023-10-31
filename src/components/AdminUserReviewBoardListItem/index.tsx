import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { REVIEW_BOARD_DETAIL_PATH } from 'constant';

interface Props {
  item: ReviewBoardListResponseDto;
}

//          component          //
export default function AdminUserReviewBoardListItem({item}: Props) {

  //          state          //
  const { boardNumber, commentCount, favoriteCount, title, viewCount, writeDatetime } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onReviewBoardButton = () => {
    navigator(REVIEW_BOARD_DETAIL_PATH(boardNumber));
  }
  //          effect          //

  //          render          //
  return (
    <div className="admin-user-review-board-list-item-box" onClick={onReviewBoardButton}>
      <div className="admin-user-review-board-list-box">
        <div className="admin-user-review-board-item-number">{boardNumber}</div>
        <div className="admin-user-review-board-item-title-box" >
          <div className="admin-user-review-board-item-title">
            { title.length > 30 ? title.substring(0, 30) + '...' : title }
          </div>
        </div>
        <div className="admin-user-review-board-item-write-datetime">{dateFormat(writeDatetime)}</div>
        <div className="admin-user-review-board-item-comment-count">{commentCount}</div>
        <div className="admin-user-review-board-item-favorite-count">{favoriteCount}</div>
        <div className="admin-user-review-board-item-view-count">{viewCount}</div>
      </div>
    </div>
  )
}
