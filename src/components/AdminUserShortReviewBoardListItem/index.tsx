import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { ShortReviewListResponseDto } from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";
interface Props {
  item: ShortReviewListResponseDto;
}

//          component          //
export default function AdminUserShortReviewBoardListItem({item}: Props) {

  //          state          //
  const { shortReviewNumber, contents, writeDatetime, score } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-user-short-review-board-list-item-box" onClick={onClickHandler}>
      <div className="admin-user-short-review-board-list-box">
        <div className="admin-user-short-review-board-item-number">{shortReviewNumber}</div>
        <div className="admin-user-short-review-board-item-content-box" >
          <div className="admin-user-short-review-board-item-content" >
            { contents.length > 30 ? contents.substring(0, 30) + '...' : contents }
          </div>
        </div>
        <div className="admin-user-short-review-board-item-score">{score}</div>
        <div className="admin-user-short-review-board-item-write-datetime">{dateFormat(writeDatetime)}</div>
      </div>
    </div>
  )
}
