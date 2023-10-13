import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';

// interface Props {
//   item: ReviewBoardListResponseDto;
// }{item}: Props

//          component          //
export default function ReviewBoardListItem() {

  //          state          //
  // const { boardNumber, commentCount, favoriteCount, title, viewCount, writeDatetime, writerNickname } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    
  }

  //          effect          //

  //          render          //
  return (
    <div className="review-board-list-item-box">
      <div className="review-board-list-top">
        <div className="board-number">번호</div>
        <div className="board-title">제목</div>
        <div className="board-writer">작성자</div>
        <div className="board-write-datetime">작성일자</div>
        <div className="board-favorite-count">추천</div>
        <div className="board-view-count">조회</div>
      </div>
      <div className="review-board-list-bottom">
        {/* <div className="reivew-board-number">{boardNumber}</div>
        <div className="reivew-board-title">{title}</div>
        <div className="reivew-board-comment-count">{commentCount}</div>
        <div className="reivew-board-writer">{writerNickname}</div>
        <div className="reivew-board-write-datetime">{writeDatetime}</div>
        <div className="reivew-board-favorite-count">{favoriteCount}</div>
        <div className="reivew-board-view-count">{viewCount}</div> */}
      </div>
    </div>
  )
}
