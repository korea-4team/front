import { getCurrentReviewBoardListRequest, getReviewBoardLocationListRequest } from "apis";
import { COUNT_BY_PAGE, REVIEW_BOARD_BUSINESS_TYPE_PATH, REVIEW_BOARD_LOCATION_PATH, REVIEW_BOARD_PATH } from "constant";
import { usePagination } from "hooks"
import ResponseDto from "interfaces/response/response.dto";
import { GetReviewBoardLocationListResponseDto, ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import GetCurrentReviewBoardResponseDto from "interfaces/response/reviewBoard/get-current-review-board.response.dto";
import { useEffect, useState } from "react";
import './style.css';
import Pagination from "components/Pagination";
import ReviewBoardListItem from "components/ReviewBoardListItem";
import { useNavigate, useParams } from "react-router-dom";


//          component          //
export default function ReviewBoardList() {

  const ReviewBoardList = () => {

    //          state          //
    const { location } = useParams();
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 게시물 리스트 상태 //
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageReviewBoardList, setPageReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);

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
    const getReviewBoardListResponseHandler = (responseBody: GetCurrentReviewBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardList } = responseBody as GetCurrentReviewBoardResponseDto;
      changeSection(reviewBoardList.length, COUNT_BY_PAGE);
      setReviewBoardList(reviewBoardList);
    }
    
    // description: 기행기 게시물 지역별 리스트 불러오기 //
    const getReviewBoardLocationListResponseHandler = (responseBody: GetReviewBoardLocationListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardLocationList } = responseBody as GetReviewBoardLocationListResponseDto;
      setReviewBoardList(reviewBoardLocationList);
      getPageReviewBoardList(reviewBoardLocationList);
    }

    //          event handler          //
    // description: 지역분류 클릭 이벤트 //
    const onLocationClickHandler = (location: string) => {
      navigator(REVIEW_BOARD_LOCATION_PATH(location));
    }
    // description: 업종분류 클릭 이벤트 //
    const onBusinessTypeClickHandler = (businessType: string) => {
      navigator(REVIEW_BOARD_BUSINESS_TYPE_PATH(businessType));
    }

    //          effect          //
    useEffect(() => {
      getCurrentReviewBoardListRequest(currentSection).then(getReviewBoardListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      if (!location) {
        alert('지역을 선택해 주세요.')
        navigator(REVIEW_BOARD_PATH);
        return;
      }
      getReviewBoardLocationListRequest(location).then(getReviewBoardLocationListResponseHandler);
    },[location])

    //          render          //
    return (
      <div id="review-board-wrapper">
        <div className="review-board-location-list"></div>
        <div className="review-board-container">
          <div className="review-board-list-top">
            <div className="board-number">번호</div>
            <div className="board-title">제목</div>
            <div className="board-writer">작성자</div>
            <div className="board-write-datetime">작성일자</div>
            <div className="board-favorite-count">추천</div>
            <div className="board-view-count">조회</div>
          </div>
          <div className="review-board-businesstype-list"></div>
          <div className="review-board-list-bottom">
            {reviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
          </div>

          <Pagination
          totalPage= {totalPage}
          currentPage={currentPage}
          onPageClickHandler={onPageClickHandler}
          onNextClickHandler={onNextClickHandler}
          onPreviusClickHandler={onPreviusClickHandler} />
        </div>
        

          
      </div>
    )
  }

  return (
    <ReviewBoardList />
  )

}
