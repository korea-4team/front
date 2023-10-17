import Pagination from 'components/Pagination'
import { usePagination } from 'hooks'
import { GetNoticeBoardListResponseDto, NoticeBoardListResponseDto } from 'interfaces/response/noticeBoard';
import NoticeBoardListItem from "components/NoticeBoardListItem";
import ResponseDto from 'interfaces/response/response.dto';
import { useState, useEffect } from "react";
import { getNoticeBoardListRequest } from 'apis';

import './style.css';

//          component : 공지사항 게시판         //
export default function NoticeBoardMain() {

  //          state         //

  //          function          //

  //          event handler          //

  //          component : 공지사항 리스트 컴포넌트         //
  const NoticeBoardList = () => {
    
    //          state         //
    // description : 페이지 네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection}  = usePagination();

    // description : 게시물 리스트 상태 //
    const [ noticeBoardList, setNoticeList ] = useState<NoticeBoardListResponseDto[]>([]);

    //          function          //
    // description : 공지사항 불러오기 응답 처리 함수 //
    const getNoticeBoardListResponseHandler = (
      responseBody: GetNoticeBoardListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if(code === "DE") alert("데이터베이스 에러입니다.");
      if(code !== "SU") return;

      const { noticeBoardList } = responseBody as GetNoticeBoardListResponseDto;
      setNoticeList(noticeBoardList);
    }


    //          event handler          //

    //          component         //
    
    //          effect          //
    // description : 첫 시작 시 공지사항 게시물 불러오기 //
    useEffect(() => {
      getNoticeBoardListRequest(1).then(getNoticeBoardListResponseHandler);
    },[]);

    //          render          //
    return (
      <div className='notice-board-list'>
        <div className='notice-board-list-top'>
          <div className='notice-board'>공지사항</div>
        </div>
        <div className='divider'></div>
        <div className='notice-board-list-bottom'>
          <div className='notice-board-list-name'>
            <div className='notice-number'> 번호 </div>
            <div className='notice-title'> 제목 </div>
            <div className='notice-writer'> 작성자 </div>
            <div className='notice-write-datetime'> 작성일자 </div>
          </div>
          <div className='notice-board-list-box'>
            {noticeBoardList.map((item) => (
              <NoticeBoardListItem item={item} />
            ))}
          </div>
        </div>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageClickHandler={onPageClickHandler}
          onPreviusClickHandler={onPreviusClickHandler}
          onNextClickHandler={onNextClickHandler} />
      </div>
    )
  }

  //          effect          //

  //          render          //
  return (
    <NoticeBoardList />
  )
}
