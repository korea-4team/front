import Pagination from 'components/Pagination'
import { usePagination } from 'hooks'
import { GetNoticeBoardListResponseDto, NoticeBoardListResponseDto } from 'interfaces/response/noticeBoard';
import NoticeBoardListItem from "components/NoticeBoardListItem";
import ResponseDto from 'interfaces/response/response.dto';
import { useState, useEffect } from "react";
import { getNoticeBoardListRequest } from 'apis';

import './style.css';
import { useNavigate } from 'react-router';
import { NOTICE_BOARD_WRITE_PATH } from 'constant';
import { useUserStore } from 'stores';

//          component : 공지사항 게시판         //
export default function NoticeBoardMain() {

  //          component : 공지사항 리스트 컴포넌트         //
  const NoticeBoardList = () => {
    
    //          state         //
    // description : 유저 상태 //
    const { user } = useUserStore();
    // description : 페이지 네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection}  = usePagination();

    // description : 게시물 리스트 상태 //
    const [ noticeBoardList, setNoticeList ] = useState<NoticeBoardListResponseDto[]>([]);

    // description : 작성 버튼 노출 상태 //
    const [ writeButton, setWriteButton ] = useState<boolean>(true);

    //          function          //
    // description : 페이지 이동을 위한 네비게이트 함수 //
    const navigator = useNavigate();

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
    // description : 컴포넌트 클릭 이벤트 //
    const onClickHandler = () => {
      navigator(NOTICE_BOARD_WRITE_PATH());
    }

    //          component         //
    
    //          effect          //
    // description : 첫 시작 시 공지사항 게시물 불러오기 //
    useEffect(() => {
      getNoticeBoardListRequest(1).then(getNoticeBoardListResponseHandler);

      if(user && user.role !== "admin") setWriteButton(false);
    },[]);

    //          render          //
    return (
      <div className='notice-board-list-box'>
        <div className='notice-board-list-top'>
          <div className='notice-board'>공지사항</div>
          { writeButton &&
            <div className='write-button'>
              <div className='black-button' onClick={onClickHandler}>작성하기</div>
            </div>
          }
        </div>
        <div className='divider'></div>
        <div className='notice-board-list-bottom'>
          <div className='notice-board-list-name'>
            <div className='notice-number'> 번호 </div>
            <div className='notice-title'> 제목 </div>
            <div className='notice-writer'> 작성자 </div>
            <div className='notice-write-datetime'> 작성일자 </div>
          </div>
          <div className='notice-board-list'>
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
