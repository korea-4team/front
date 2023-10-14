import { getCurrentReviewBoardListRequest } from "apis";
import { COUNT_BY_PAGE } from "constant";
import { usePagination } from "hooks"
import ResponseDto from "interfaces/response/response.dto";
import { ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import GetCurrentReviewBoardResponseDto from "interfaces/response/reviewBoard/get-current-review-board.response.dto";
import { useEffect, useState } from "react";


//          component          //
export default function ReviewBoard() {

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
      <div className="review-board">
        <div className=""></div>
      </div>
    )
  }

  return (
    <ReviewBoardList />
  )

}
