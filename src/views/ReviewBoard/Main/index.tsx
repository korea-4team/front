import { getCurrentReviewBoardListRequest } from "apis";
import { COUNT_BY_PAGE } from "constant";
import { usePagination } from "hooks"
import ResponseDto from "interfaces/response/response.dto";
import { ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import GetCurrentReviewBoardResponseDto from "interfaces/response/reviewBoard/get-current-review-board.response.dto";
import { useEffect, useState } from "react";
import './style.css';
import Pagination from "components/Pagination";
import ReviewBoardListItem from "components/ReviewBoardListItem";


//          component          //
export default function ReviewBoardList() {

  const ReviewBoardList = () => {

    //          state          //
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 게시물 리스트 상태 //
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);

    //          function          //
    const getReviewBoardListResponseHandler = (responseBody: GetCurrentReviewBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { reviewBoardList } = responseBody as GetCurrentReviewBoardResponseDto;
      changeSection(reviewBoardList.length, COUNT_BY_PAGE);
      setReviewBoardList(reviewBoardList);
    }

    //          effect          //
    useEffect(() => {
      getCurrentReviewBoardListRequest(currentSection).then(getReviewBoardListResponseHandler);
    },[currentSection])

    //          render          //
    return (
      <div className="review-board-list">
        <div className="review-board-container">
          <div className="review-board-list-top">
            <div className="board-number">번호</div>
            <div className="board-title">제목</div>
            <div className="board-writer">작성자</div>
            <div className="board-write-datetime">작성일자</div>
            <div className="board-favorite-count">추천</div>
            <div className="board-view-count">조회</div>
          </div>
          <div className="review-board-list-bottom">
            {reviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
          </div>
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
    <ReviewBoardList />
  )

}
