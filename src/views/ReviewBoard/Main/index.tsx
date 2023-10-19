import { getReviewBoardBusinessTypeListRequest, getReviewBoardListRequest, getReviewBoardLocationListRequest, getReviewBoardRequest } from "apis";
import { COUNT_BY_PAGE, REVIEW_BOARD_WRITE_PATH } from "constant";
import { usePagination } from "hooks"
import ResponseDto from "interfaces/response/response.dto";
import { GetReviewBoardBusinessTypeListResponseDto, GetReviewBoardLocationListResponseDto, ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import { useEffect, useState } from "react";
import './style.css';
import Pagination from "components/Pagination";
import ReviewBoardListItem from "components/ReviewBoardListItem";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "stores";
import GetReviewBoardListResponseDto from "interfaces/response/reviewBoard/get-review-board-list.response.dto";


//          component          //
export default function ReviewBoardList() {

  const ReviewBoardList = () => {

    //          state          //
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 게시물 수를 저장하는 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);
    // description: 전체 게시물 리스트 상태 //
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageReviewBoardList, setPageReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    const { user , setUser} = useUserStore();

    //          function          //
    const navigator = useNavigate();
    // description: 현재 페이지의 게시물 리스트 분류 함수 //
    const getPageReviewBoardList = (reviewBoardList: ReviewBoardListResponseDto[]) => {
      const lastIndex = reviewBoardList.length > COUNT_BY_PAGE * currentPage ? COUNT_BY_PAGE * currentPage : reviewBoardList.length;
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const pageReviewBoardList = reviewBoardList.slice(startIndex, lastIndex);

      setPageReviewBoardList(pageReviewBoardList);
    }

    // description: 게시물 리스트 불러오기 응답 처리 함수 //
    const getReviewBoardListResponseHandler = (responseBody: GetReviewBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardList } = responseBody as GetReviewBoardListResponseDto;
      setReviewBoardList(reviewBoardList);
      setBoardCount(reviewBoardList.length);
      getPageReviewBoardList(reviewBoardList);
      changeSection(reviewBoardList.length, COUNT_BY_PAGE);
    }
    
    // description: 기행기 게시물 지역별 리스트 불러오기 //
    const getReviewBoardLocationListResponseHandler = (responseBody: GetReviewBoardLocationListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardLocationList } = responseBody as GetReviewBoardLocationListResponseDto;
      setReviewBoardList(reviewBoardLocationList);
      setBoardCount(reviewBoardLocationList.length)
      getPageReviewBoardList(reviewBoardLocationList);
      changeSection(reviewBoardLocationList.length, COUNT_BY_PAGE);
    }

    // description: 기행기 게시물 업종별 리스트 불러오기 //
    const getReviewBoardBusinessTypeListResponseHandler = (responseBody: GetReviewBoardBusinessTypeListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardBusinessTypeList } = responseBody as GetReviewBoardBusinessTypeListResponseDto;
      setReviewBoardList(reviewBoardBusinessTypeList);
      setBoardCount(reviewBoardBusinessTypeList.length);
      getPageReviewBoardList(reviewBoardBusinessTypeList);
      changeSection(reviewBoardBusinessTypeList.length, COUNT_BY_PAGE);
    }

    //          event handler          //
    // description: 지역분류 클릭 이벤트 //
    const onLocationClickHandler = (location: string) => {
      getReviewBoardLocationListRequest(location).then(getReviewBoardLocationListResponseHandler);
    }
    // description: 업종분류 클릭 이벤트 //
    const onBusinessTypeClickHandler = (businessType: string) => {
      getReviewBoardBusinessTypeListRequest(businessType).then(getReviewBoardBusinessTypeListResponseHandler);
    }

    // description: 게시물 작성 버튼 클릭 이벤트//
    const onReviewBoardWriteButtonClickHandler = () => {
      navigator(REVIEW_BOARD_WRITE_PATH());
    }

    //          effect          //
    useEffect(() => {
      getReviewBoardListRequest(currentSection).then(getReviewBoardListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getPageReviewBoardList(reviewBoardList);
    },[currentPage])

    //          render          //
    return (
      <div id="review-board-wrapper">
        <div className="review-board-container">
          <div className="review-board-location-container">
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('서울')}>서울</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('대전')}>대전</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('대구')}>대구</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('부산')}>부산</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('인천')}>인천</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('광주')}>광주</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('울산')}>울산</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('제주')}>제주</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('경기')}>경기</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('강원')}>강원</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('충북')}>충북</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('충남')}>충남</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('전북')}>전북</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('전남')}>전남</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('경북')}>경북</div>
            <div className="review-board-location-list" onClick={() => onLocationClickHandler('경남')}>경남</div>
          </div>
          <div className="review-board-businesstype-container">
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('음식점')}>음식점</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('음료')}>음료</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('문화')}>문화</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('의료')}>의료</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('미용')}>미용</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('편의시설')}>편의시설</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('교육')}>교육</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('관광')}>관광</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('건축')}>건축</div>
            <div className="review-board-businesstype-list" onClick={() => onBusinessTypeClickHandler('기타')}>기타</div>
          </div>
          {user != null && <div className="review-board-write-button" onClick={onReviewBoardWriteButtonClickHandler}>글쓰기</div>}
          {boardCount ?
          (<div className="review-board-list-top">
              <div className="review-board-number">번호</div>
              <div className="review-board-title">제목</div>
              <div className="review-board-writer">작성자</div>
              <div className="review-board-write-datetime">작성일자</div>
              <div className="review-board-favorite-count">추천</div>
              <div className="review-board-view-count">조회</div>
            </div>) : (<></>)}
          {boardCount ?
          (<div className="review-board-list-bottom">
          {pageReviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
          </div>) : (<div className="reivew-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
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
    <ReviewBoardList />
  )

}
