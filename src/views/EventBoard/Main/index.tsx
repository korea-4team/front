import { usePagination } from 'hooks';
import './style.css';
import { useEffect, useState } from 'react';
import { EventBoardListResponseDto, GetCurrentEventBoardResponseDto } from 'interfaces/response/EventBoard';
import ResponseDto from 'interfaces/response/response.dto';
import { COUNT_BY_PAGE, EVENT_BOARD_WRITE_PATH } from 'constant';
import { getCurrentEventBoardListRequest } from 'apis';
import EventBoardListItem from 'components/EventBoardListItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'stores';

export default function EventBoardMain() {

  const EventBoardList = () => {

    //          state          //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    const [boardCount, setBoardCount] = useState<number>(0);
    const [eventBoardList, setEventBoardList] = useState<EventBoardListResponseDto[]>([]);
    const [pageEventBoardList, setPageEventBoardList] = useState<EventBoardListResponseDto[]>([]);
    const {user, setUser} = useUserStore();


    //          function          //
    const navigator = useNavigate();

    const getPageEventBoardList = (eventBoardList: EventBoardListResponseDto[]) => {
      const lastIndex = eventBoardList.length > COUNT_BY_PAGE * currentPage ? COUNT_BY_PAGE * currentPage : eventBoardList.length;
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const pageEventBoardList = eventBoardList.slice(startIndex, lastIndex);

      setPageEventBoardList(pageEventBoardList);
    }

    const getEventBoardListResponseHandler = (responseBody: GetCurrentEventBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { eventBoardList } = responseBody as GetCurrentEventBoardResponseDto;
      setEventBoardList(eventBoardList);
      setBoardCount(eventBoardList.length);
      getPageEventBoardList(eventBoardList);
      changeSection(eventBoardList.length, COUNT_BY_PAGE);
    }

    //          event handler          //
    const onEventBoardWriteButtonClickHandler = () => {
      navigator(EVENT_BOARD_WRITE_PATH());
    }
    

    //          effect          //
    useEffect(() => {
      getCurrentEventBoardListRequest(currentSection).then(getEventBoardListResponseHandler);
    },[currentSection])

    useEffect(() => {
      getPageEventBoardList(eventBoardList);
    },[currentPage])

    //          render          //
    return (
      <div className="event-board-main-list">
        <div className="event-board-write-button-box">
          {user?.role === 'admin' && <div className="event-board-write-button" onClick={onEventBoardWriteButtonClickHandler}>글쓰기</div>}
        </div>
        <div className="event-board-list-item-box">
          {boardCount ?
          (
            <div className="event-board-list-item">
              {pageEventBoardList.map((item) => (<EventBoardListItem item={item} />))}
            </div>
          ) : (<div className='event-board-list-nothing'>게시물이 존재하지 않습니다.</div>)}
          { boardCount !== 0 && (
            <Pagination
              totalPage= {totalPage}
              currentPage={currentPage}
              onPageClickHandler={onPageClickHandler}
              onNextClickHandler={onNextClickHandler}
              onPreviusClickHandler={onPreviusClickHandler} />
          )}
        </div>
      </div>
    )


  }

  return (
    <EventBoardList />
  )
}
