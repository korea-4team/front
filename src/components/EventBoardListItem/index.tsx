import { EventBoardListResponseDto } from 'interfaces/response/EventBoard';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { EVENT_BOARD_DETAIL_PATH } from 'constant';

// interface Props {
//   item: EventBoardListResponseDto;
// }{item}: Props

//          component          //
export default function EventBoardListItem() {

  //          state          //
  // const { boardNumber, title, writerNickname, writeDatetime } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
    // navigator(EVENT_BOARD_DETAIL_PATH(boardNumber));
  }

  //          effect          //

  //          render          //
  return (
    <div className="event-board-list-box">
      <div className="event-board-image"></div>
      <div className="event-board-title" onClick={onClickHandler}>안녕하세요 이벤트게시판 제목입니다.</div>
      <div className="event-board-writer">작성자닉네임</div>
      <div className="event-board-write-datetime">작성일자</div>
    </div>
  )
}