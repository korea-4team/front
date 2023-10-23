import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { REVIEW_BOARD_DETAIL_PATH } from 'constant';
import { dateFormat } from 'utils';

interface Props {
  item: ReviewBoardListResponseDto;
}

//          component          //
export default function AdminReviewBoardListItem({item}: Props) {

  //          state          //
  const { boardNumber, commentCount, favoriteCount, title, viewCount, writeDatetime, writerNickname } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    navigator(REVIEW_BOARD_DETAIL_PATH(boardNumber));
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-review-board-list-item-box">
      <div className="admin-review-board-list-box">
        <div className="admin-review-board-item-number">{boardNumber}</div>
        <div className="admin-review-board-item-title-box" >
          <div className="admin-review-board-item-title" onClick={onClickHandler}>
            { title.length > 30 ? title.substring(0, 30) + '...' : title }
          </div>
          <div className="admin-review-board-item-comment-count">[{commentCount}]</div>
        </div>
        <div className="admin-review-board-item-writer">{writerNickname}</div>
        <div className="admin-review-board-item-write-datetime">{dateFormat(writeDatetime)}</div>
        <div className="admin-review-board-item-favorite-count">{favoriteCount}</div>
        <div className="admin-review-board-item-view-count">{viewCount}</div>
      </div>
    </div>
  )
}
