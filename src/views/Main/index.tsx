import { EventBoardListResponseDto } from 'interfaces/response/EventBoard';
import { NoticeBoardListResponseDto } from 'interfaces/response/noticeBoard';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import { GetReviewBoardListResponseDto, ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import ResponseDto from 'interfaces/response/response.dto';
import GetCurrentAdvertisingBoardResponeDto from 'interfaces/response/advertisingBoard/get-current-advertising-board-response.dto';
import { getReviewBoardListRequest } from 'apis';
import { usePagination } from 'hooks';
import { COUNT_BY_MAIN_BOARD_PAGE } from 'constant';
import ReviewBoardListItem from 'components/ReviewBoardListItem';

export default function Main() {

  const navigator = useNavigate();

  //          component          //
  // description: 메인화면 상단 (배너) //
  const MainTop = () => {

    //          state          //


    //          function          //

    //          event handler          //

    //          effect          //

    //          render          //
    return (
      <div className="main-banner">
        <div className="main-banner-image"></div>
      </div>
    )

  }

  //          component          //
  // description: 메인화면 중단 (공지사항, 이벤트, 분류선택) //
  const MainMiddle = () => {

    //          state          //
    const [noticeBoardList, setNoticeBoardList] = useState<NoticeBoardListResponseDto[]>([]);
    const [eventBoardList, setEventBoardList] = useState<EventBoardListResponseDto[]>([]);

    //          function          //

    //          event handler          //

    //          effect          //

    //          render          //
    return (
      <div className="main-middle-box">
        <div className="main-middle-left-box"></div>
        <div className="main-middle-right-box">
          <div className="main-middle-location-box"></div>
          <div className="main-middle-businesstype-box"></div>
        </div>
      </div>
    )

  }

  //          component          //
  // description: 메인화면 하단 (광고, 기행기 게시물 리스트) //
  const MainBottom = () => {

    //          state          //
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 전체 게시물 리스트 상태 //
    const [advertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageAdvertisingBoardList, setPageAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);
    const [pageReviewBoardList, setPageReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    // description: 게시물 수를 저장하는 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    //          function          //
    // description: 현재 페이지의 기행기 게시물 리스트 분류 함수 //
    const getPageReviewBoardList = (reviewBoardList: ReviewBoardListResponseDto[]) => {
      const lastIndex = reviewBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage ? COUNT_BY_MAIN_BOARD_PAGE * currentPage : reviewBoardList.length;
      const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage - 1);
      const pageReviewBoardList = reviewBoardList.slice(startIndex, lastIndex);

      setPageReviewBoardList(pageReviewBoardList);
    }


    // description: 광고 게시물 리스트 불러오기 응답 처리 함수 //
    const getAdvertisingBoardListResponseHandler = (responseBody: GetCurrentAdvertisingBoardResponeDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;
      
      const { advertisingboardList } = responseBody as GetCurrentAdvertisingBoardResponeDto;
      setAdvertisingBoardList(advertisingboardList);
      setBoardCount(advertisingboardList.length);
    }
    
    // description: 기행기 게시물 리스트 불러오기 응답 처리 함수 //
    const getReviewBoardListResponseHandler = (responseBody: GetReviewBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { boardList } = responseBody as GetReviewBoardListResponseDto;
      setReviewBoardList(boardList);
      setBoardCount(boardList.length);
      changeSection(boardList.length, COUNT_BY_MAIN_BOARD_PAGE);
      getPageReviewBoardList(boardList);
    }

    //          event handler          //

    //          effect          //
    useEffect(() => {
      getReviewBoardListRequest(currentSection).then(getReviewBoardListResponseHandler);
    },[currentSection]);

    //          render          //
    return (
      <div className="main-bottom-box">
        <div className="main-board-box">
          <div className="main-bottom-board-text">광고 게시판</div>
          <div className="main-bottom-board-list-box">
            <div className="main-bottom-board-list-item"></div>
          </div>
        </div>
        <div className="main-board-box">
          <div className="main-bottom-board-text">기행기 게시판</div>
          <div className="main-bottom-board-list-box">
            <div className="main-bottom-board-list-item">
              {boardCount ?
              (<div className="main-review-board-list">
              {pageReviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
              </div>) : (<div className="review-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
            </div>
          </div>
        </div>
      </div>
    )

  }


  return (
    <div id="main-wrapper">
      <MainTop />
      <MainMiddle />
      <MainBottom />
    </div>
  )
}
