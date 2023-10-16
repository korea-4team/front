import { usePagination } from 'hooks';
import './style.css';
import { useEffect, useState } from 'react';
import { EventBoardListResponseDto, GetCurrentEventBoardResponseDto } from 'interfaces/response/EventBoard';
import ResponseDto from 'interfaces/response/response.dto';
import { COUNT_BY_PAGE } from 'constant';
import { getCurrentEventBoardListRequest } from 'apis';
import EventBoardListItem from 'components/EventBoardListItem';
import Pagination from 'components/Pagination';

export default function EventBoardMain() {

  const EventBoardList = () => {

    //          state          //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    const [eventBoardList, setEventBoardList] = useState<EventBoardListResponseDto[]>([]);

    const getEventBoardListResponseHandler = (responseBody: GetCurrentEventBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { eventBoardList } = responseBody as GetCurrentEventBoardResponseDto;
      changeSection(eventBoardList.length, COUNT_BY_PAGE);
      setEventBoardList(eventBoardList);
    }

    //          effect          //
    useEffect(() => {
      getCurrentEventBoardListRequest(currentSection).then(getEventBoardListResponseHandler);
    },[currentSection])

    //          render          //
    return (
      <div className="event-board-list-item-box">
        <div className="event-board-list-item">
          {eventBoardList.map((item) => (<EventBoardListItem item={item} />))}
        </div>
        <Pagination
          totalPage= {totalPage}
          currentPage={currentPage}
          onPageClickHandler={onPageClickHandler}
          onNextClickHandler={onNextClickHandler}
          onPreviusClickHandler={onPreviusClickHandler} />
      </div>
    )


  }

  return (
    <EventBoardList />
  )
}
