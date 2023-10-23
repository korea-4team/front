import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { REVIEW_BOARD_DETAIL_PATH } from 'constant';
import { dateFormat } from 'utils';
import ShortReivewResponseDto from 'interfaces/response/advertisingBoard/short-review.response.dto';

interface Props {
  item: ShortReivewResponseDto;
}

//          component          //
export default function AdminShortReviewBoardListItem({item}: Props) {

  //          state          //
  const { shortReviewNumber, contents, writeDatetime, writerNickname, writerEmail, score } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-review-board-list-item-box">
      <div className="admin-short-review-board-list-box">
        <div className="admin-short-review-board-item-number">{shortReviewNumber}</div>
        <div className="admin-short-review-board-item-content-box" >
          <div className="admin-short-review-board-item-content" onClick={onClickHandler}>
            { contents.length > 30 ? contents.substring(0, 30) + '...' : contents }
          </div>
        </div>
        <div className="admin-short-review-board-item-score">{score}</div>
        <div className="admin-short-review-board-item-writer">{writerNickname}</div>
        <div className="admin-short-review-board-item-write-datetime">{dateFormat(writeDatetime)}</div>
      </div>
    </div>
  )
}
