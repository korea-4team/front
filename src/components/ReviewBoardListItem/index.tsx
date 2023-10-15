import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { REVIEW_BOARD_DETAIL_PATH } from 'constant';

interface Props {
  item: ReviewBoardListResponseDto;
}

//          component          //
export default function ReviewBoardListItem({item}: Props) {

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
    <div className="review-board-list-item-box">
      <div className="review-board-list-box">
        <div className="review-board-number">{boardNumber}</div>
        <div className="review-board-title-box" onClick={onClickHandler}>
          <div className="review-board-title">{title}</div>
          <div className="review-board-comment-count">[{commentCount}]</div>
        </div>
        <div className="review-board-writer">{writerNickname}</div>
        <div className="review-board-write-datetime">{writeDatetime}</div>
        <div className="review-board-favorite-count">{favoriteCount}</div>
        <div className="review-board-view-count">{viewCount}</div>
      </div>
    </div>
  )
}
