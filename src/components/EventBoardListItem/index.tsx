import { EventBoardListResponseDto } from 'interfaces/response/EventBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { EVENT_BOARD_DETAIL_PATH } from 'constant';
import { dateFormat } from 'utils';

interface Props {
  item: EventBoardListResponseDto;
}

//          component          //
export default function EventBoardListItem({item}: Props) {

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
    <div className="event-board-list-box" onClick={onClickHandler}>
      <div className="event-board-image" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: `100% 100%`, backgroundRepeat: `no-repeat`, backgroundPosition: `50% 50%` }}></div>
      <div className="event-board-title">{title}</div>
      <div className="event-board-writer">{adminNickname}</div>
      <div className="event-board-write-datetime">{dateFormat(writeDatetime)}</div>
    </div>
  )
}