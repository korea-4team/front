import { EventBoardListResponseDto } from 'interfaces/response/EventBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { EVENT_BOARD_DETAIL_PATH } from 'constant';
import { dateFormat } from 'utils';

interface Props {
  item: EventBoardListResponseDto;
}

//          component          //
export default function MainEventBoardListItem({item}: Props) {

  //          state          //
  const { boardNumber, title, writeDatetime, imageUrl, adminNickname } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    navigator(EVENT_BOARD_DETAIL_PATH(boardNumber));
  }

  //          effect          //

  //          render          //
  return (
    <div className="main-event-board-list-box" >
      <div className="divider"></div>
      <div className="main-event-board-list-item">
        <div className="main-event-board-number">{boardNumber}</div>
        <div className="main-event-board-title-box">
          <div className="main-event-board-title" onClick={onClickHandler}>{ title.length > 30 ? title.substring(0, 30) + '...' : title }</div>
        </div>
        <div className="main-event-board-writer">{adminNickname}</div>
      </div>
    </div>
  )
}