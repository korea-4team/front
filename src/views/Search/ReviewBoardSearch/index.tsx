import { getSearchReviewBoardListRequest } from 'apis';
import Pagination from 'components/Pagination';
import ReviewBoardListItem from 'components/ReviewBoardListItem';
import { COUNT_BY_PAGE, MAIN_PATH } from 'constant';
import { usePagination } from 'hooks';
import ResponseDto from 'interfaces/response/response.dto';
import { GetSearchReviewBoardListResponseDto, ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ReviewBoardSearchList() {

  const ReviewBoardSearchList = () => {

    //          state          //
    const { searchWord, searchLocation } = useParams();
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 게시물 수를 저장하는 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);
    // description: 전체 게시물 리스트 상태 //
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

    // description: 기행기 게시물 지역 및 검색단어 리스트 불러오기 //
    const getReviewBoardSearchListResponseHandler = (responseBody: GetSearchReviewBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { boardList } = responseBody as GetSearchReviewBoardListResponseDto;
      setReviewBoardList(boardList);
      setBoardCount(boardList.length);
      getPageReviewBoardList(boardList);
      changeSection(boardList.length, COUNT_BY_PAGE);
    }

    //          event handler          //

    //          effect          //
    useEffect(() => {
      if(!searchWord || !searchLocation) {
        alert('검색어가 올바르지 않습니다.')
        navigator(MAIN_PATH);
        return;
      }
      getSearchReviewBoardListRequest(searchWord, searchLocation, currentSection).then(getReviewBoardSearchListResponseHandler);
    },[searchWord, searchLocation])

    useEffect(() => {
      if(boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getPageReviewBoardList(reviewBoardList);
    },[currentPage])

    //          render          //
    return (
      <div id="review-board-wrapper">
        <div className="review-board-container">
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
          (<div className="review-board-list-bottom">
          {pageReviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
          </div>) : (<div className="review-board-list-nothing">게시물이 존재하지 않습니다.</div>)}
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
    <ReviewBoardSearchList />
  )
}
