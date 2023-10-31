import { EventBoardListResponseDto, GetCurrentEventBoardResponseDto } from 'interfaces/response/EventBoard';
import { GetNoticeBoardListResponseDto, NoticeBoardListResponseDto } from 'interfaces/response/noticeBoard';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import { GetReviewBoardListResponseDto, ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import ResponseDto from 'interfaces/response/response.dto';
import GetCurrentAdvertisingBoardResponeDto from 'interfaces/response/advertisingBoard/get-current-advertising-board-response.dto';
import { getAdvertisingBoardRequest, getCurrentAdvertisingBoardListRequest, getCurrentEventBoardListRequest, getNoticeBoardListRequest, getReviewBoardListRequest } from 'apis';
import { usePagination } from 'hooks';
import { ADVERTISING_BOARD_PATH, COUNT_BY_MAIN_BOARD_PAGE } from 'constant';
import ReviewBoardListItem from 'components/ReviewBoardListItem';
import AdvertisingBoardListItem from 'components/AdvertisingBoardListItem';
import { useAdvertisingSearchStore } from 'stores';
import NoticeBoardListItem from 'components/NoticeBoardListItem';
import MainNoticeBoardListItem from 'components/MainNoticeBoardListItem';
import MainEventBoardListItem from 'components/MainEventBoardListItem';

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
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();

    const { setBusinessType, setLocation } = useAdvertisingSearchStore();

    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [noticeBoardList, setNoticeBoardList] = useState<NoticeBoardListResponseDto[]>([]);
    const [eventBoardList, setEventBoardList] = useState<EventBoardListResponseDto[]>([]);
    // description: 게시물 수를 저장하는 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    const [boardView, setBoardView] = useState<'notice-board' | 'event-board'>('notice-board');

    //          function          //
    // description: 현재 페이지의 공지사항 게시물 리스트 분류 함수 //
    const getPageNoticeBoardList = (noticeBoardList: NoticeBoardListResponseDto[]) => {
      const lastIndex = noticeBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage ? COUNT_BY_MAIN_BOARD_PAGE * currentPage : noticeBoardList.length;
      const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage - 1);
      const pageNoticeBoardList = noticeBoardList.slice(startIndex, lastIndex);

      setNoticeBoardList(pageNoticeBoardList);
    }

    // description: 현재 페이지의 이벤트 게시물 리스트 분류 함수 //
    const getPageEventBoardList = (eventBoardList: EventBoardListResponseDto[]) => {
      const lastIndex = eventBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage ? COUNT_BY_MAIN_BOARD_PAGE * currentPage : eventBoardList.length;
      const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage - 1);
      const pageEventBoardList = eventBoardList.slice(startIndex, lastIndex);

      setEventBoardList(pageEventBoardList);
    }
    
    // description: 공지사항 게시물 리스트 불러오기 응답 처리 함수 //
    const getNoticeBoardListResponseHandler = (responseBody: GetNoticeBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;
      
      const { noticeBoardList } = responseBody as GetNoticeBoardListResponseDto;
      setNoticeBoardList(noticeBoardList);
      setBoardCount(noticeBoardList.length);
      changeSection(noticeBoardList.length, COUNT_BY_MAIN_BOARD_PAGE);
      getPageNoticeBoardList(noticeBoardList);
    }

    // description: 이벤트 게시물 리스트 불러오기 응답 처리 함수 //
    const getEventBoardListResponseHandler = (responseBody: GetCurrentEventBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;
      
      const { eventBoardList } = responseBody as GetCurrentEventBoardResponseDto;
      setEventBoardList(eventBoardList);
      setBoardCount(eventBoardList.length);
      changeSection(eventBoardList.length, COUNT_BY_MAIN_BOARD_PAGE);
      getPageEventBoardList(eventBoardList);
    }

    //          event handler          //
    const onLocationClickHandler = (location: string) => {
      setLocation(location);
      navigator(ADVERTISING_BOARD_PATH);
    }

    const onBusinessTypeClickHandler = (businessType: string) => {
      setBusinessType(businessType);
      navigator(ADVERTISING_BOARD_PATH);
    }
    
    const onNoticeBoardViewClickHandler = () => {
      setBoardView('notice-board');
    }

    const onEventBoardViewClickHandler = () => {
      setBoardView('event-board');
    }

    //          effect          //
    useEffect(() => {
      getNoticeBoardListRequest(currentSection).then(getNoticeBoardListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      getCurrentEventBoardListRequest(currentSection).then(getEventBoardListResponseHandler);
    },[currentSection]);

    //          render          //
    return (
      <div className="main-middle-box">
        <div className="main-middle-left-box">
          <div className="main-middle-board-button-container">
            <div className="main-middle-board-button" onClick={onNoticeBoardViewClickHandler}>공지사항</div>
            <div className="main-middle-board-button" onClick={onEventBoardViewClickHandler}>이벤트</div>
          </div>
          {boardView === 'notice-board' ? (
            <div className="main-middle-notice-container">
            {boardCount ?
              (<div className="main-middle-board-list-top">
                  <div className="main-middle-board-number">번호</div>
                  <div className="main-middle-board-title">제목</div>
                  <div className="main-middle-board-writer">작성자</div>
                </div>) : null}
            {boardCount ?
              (<div className="main-notice-board-list">
              {noticeBoardList.map((item) => (<MainNoticeBoardListItem item={item} />))}
              </div>) : (<div className="review-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
          </div>
          ) : (
            <div className="main-middle-event-container">
            {boardCount ?
              (<div className="main-middle-board-list-top">
                  <div className="main-middle-board-number">번호</div>
                  <div className="main-middle-board-title">제목</div>
                  <div className="main-middle-board-writer">작성자</div>
                </div>) : null}
            {boardCount ?
              (<div className="main-event-board-list">
              {eventBoardList.map((item) => (<MainEventBoardListItem item={item} />))}
              </div>) : (<div className="review-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
            </div>
          )}

          
          
        </div>
        <div className="main-middle-right-box">
          <div className="main-middle-location-container">
            <div className="main-middle-button-text">광고 지역별 보러가기</div>
            <div className="main-middle-button-container">
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('서울')}>서울</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('대전')}>대전</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('대구')}>대구</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('부산')}>부산</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('인천')}>인천</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('광주')}>광주</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('울산')}>울산</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('제주')}>제주</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('경기')}>경기</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('충북')}>충북</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('충남')}>충남</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('전북')}>전북</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('전남')}>전남</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('경북')}>경북</div>
              <div className="main-middle-button-box" onClick={() => onLocationClickHandler('경남')}>경남</div>
            </div>
          </div>
          <div className="main-middle-businesstype-container">
            <div className="main-middle-button-text">광고 업종별 보러가기</div>
            <div className="main-middle-button-container">
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('음식점')}>음식점</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('음료')}>음료</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('문화')}>문화</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('의료')}>의료</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('미용')}>미용</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('편의시설')}>편의시설</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('교육')}>교육</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('관광')}>관광</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('건축')}>건축</div>
              <div className="main-middle-button-box" onClick={() => onBusinessTypeClickHandler('기타')}>기타</div>
            </div>
          </div>
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
    const [advertisingBoardCount, setAdvertisingBoardCount] = useState<number>(0);

    //          function          //
    // description: 현재 페이지의 기행기 게시물 리스트 분류 함수 //
    const getPageReviewBoardList = (reviewBoardList: ReviewBoardListResponseDto[]) => {
      const lastIndex = reviewBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage ? COUNT_BY_MAIN_BOARD_PAGE * currentPage : reviewBoardList.length;
      const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage - 1);
      const pageReviewBoardList = reviewBoardList.slice(startIndex, lastIndex);

      setPageReviewBoardList(pageReviewBoardList);
    }
    
    // description: 현재 페이지의 광고 게시물 리스트 분류 함수 //
    const getPageAdvertisingBoardList = (advertisingBoardList: AdvertisingBoardListResponseDto[]) => {
      const lastIndex = advertisingBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage ? COUNT_BY_MAIN_BOARD_PAGE * currentPage : advertisingBoardList.length;
      const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage - 1);
      const pageAdvertisingBoardList = advertisingBoardList.slice(startIndex, lastIndex);

      setPageAdvertisingBoardList(pageAdvertisingBoardList);
    }


    // description: 광고 게시물 리스트 불러오기 응답 처리 함수 //
    const getAdvertisingBoardListResponseHandler = (responseBody: GetCurrentAdvertisingBoardResponeDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;
      
      const { advertisingboardList } = responseBody as GetCurrentAdvertisingBoardResponeDto;
      setAdvertisingBoardList(advertisingboardList);
      setAdvertisingBoardCount(advertisingboardList.length);
      changeSection(advertisingboardList.length, COUNT_BY_MAIN_BOARD_PAGE);
      getPageAdvertisingBoardList(advertisingboardList);
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

    useEffect(() => {
      getCurrentAdvertisingBoardListRequest(currentSection).then(getAdvertisingBoardListResponseHandler);
    },[currentSection]);

    //          render          //
    return (
      <div className="main-bottom-box">
        <div className="main-board-box">
          <div className="main-bottom-board-text">광고 게시판</div>
          <div className="main-bottom-board-list-box">
            <div className="main-bottom-board-list-item">
              {advertisingBoardCount ?
              (<div className="main-review-board-list">
              {pageAdvertisingBoardList.map((item) => (<AdvertisingBoardListItem item={item} />))}
              </div>) : (<div className="main-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
            </div>
          </div>
        </div>
        <div className="main-board-box">
          <div className="main-bottom-board-text">기행기 게시판</div>
          <div className="main-bottom-board-list-box">
            <div className="main-bottom-board-list-item">
              {boardCount ?
              (<div className="review-board-list-top">
                  <div className="review-board-number">번호</div>
                  <div className="review-board-title">제목</div>
                  <div className="review-board-writer">작성자</div>
                  <div className="review-board-write-datetime">작성일자</div>
                  <div className="review-board-favorite-count">추천</div>
                  <div className="review-board-view-count">조회</div>
                </div>) : null}
              {boardCount ?
              (<div className="main-review-board-list">
              {pageReviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
              </div>) : (<div className="main-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
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
