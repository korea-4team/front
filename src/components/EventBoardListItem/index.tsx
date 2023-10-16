import { EventBoardListResponseDto } from 'interfaces/response/EventBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { EVENT_BOARD_DETAIL_PATH } from 'constant';

interface Props {
  item: EventBoardListResponseDto;
}

//          component          //
export default function EventBoardListItem({item}: Props) {

  //          state          //
  const { boardNumber, title, writerNickname, writeDatetime, imageUrl } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    navigator(EVENT_BOARD_DETAIL_PATH(boardNumber));
  }

  //          effect          //

  //          render          //
  return (
    <div className="event-board-list-box">
      <div className="event-board-image">{imageUrl}</div>
      <div className="event-board-title" onClick={onClickHandler}>{title}</div>
      <div className="event-board-writer">{writerNickname}</div>
      <div className="event-board-write-datetime">{writeDatetime}</div>
    </div>
  )
}