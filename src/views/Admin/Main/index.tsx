import "./style.css";
import Pagination from 'components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { usePagination } from 'hooks';
import { useUserStore } from 'stores';
import { useState,useEffect } from 'react';
import { GetReviewBoardListResponseDto, ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import { COUNT_BY_PAGE } from "constant";
import ResponseDto from "interfaces/response/response.dto";
import { getAdminReviewBoardListRequest } from "apis";
import ReviewBoardListItem from "components/ReviewBoardListItem";
import ReviewBoardList from "views/ReviewBoard/Main";
import { useCookies } from "react-cookie";

//          component          //
export default function AdminMain() {

  //          state         //
  
  //          function          //
  const navigator = useNavigate();
  //          event handler         //
  
  //           component : 관리자 메인 페이지 왼쪽         //
  const AdminMainLeft = () => {
    //          state         //

    //          function          //
    // description : 페이지 이동을 위한 네비게이트 함수 //
    

    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-main-left'>
        <div className='admin-main-left-button'>기행기 목록</div>
        <div className='admin-main-left-button'>한 줄 리뷰 목록</div>
        <div className='admin-main-left-button'>유저 목록</div>
        <div className='admin-main-left-button'>배너</div>
      </div>
    )
  };


  //           component : 관리자 메인 페이지 오른쪽         //
  const AdminMainRight = () => {
    //          state         //
    const { adminId } = useParams();

    // description : 페이지네이션 관련 상태 및 함수 //
    const {totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection} = usePagination();

    // description : 전체 기행기 게시물 리스트 상태 //
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);

    // description : 전체 기행기 게시물 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 기행기 게시물 리스트 상태 //
    const [pageReviewBoardList, setPageReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);

    //          function          //
    // description : 현재 페이지의 게시물 리스트 분류 함수 //
    const getReviewBoardList = (ReviewBoardList: ReviewBoardListResponseDto[]) => {
      const startIndex = COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = ReviewBoardList.length > COUNT_BY_PAGE *currentPage
                        ? COUNT_BY_PAGE * currentPage
                        : ReviewBoardList.length;
      const pageReviewBoardList = ReviewBoardList.slice(startIndex, lastIndex);

      setPageReviewBoardList(pageReviewBoardList);
    }

    // description : 기행기 게시글 불러오기 응답 처리 함수 //
    const getReviewBoardListResponseHandler = (
      responseBody: GetReviewBoardListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

      const { boardList } = responseBody as GetReviewBoardListResponseDto;
      setReviewBoardList(boardList);
      setBoardCount(boardList.length);
      getReviewBoardList(boardList);
      changeSection(boardList.length, COUNT_BY_PAGE);
    }

    //          event handler         //

    //          effect          //
    // description : 기행기 게시글 불러오기 //
    useEffect(() => {
      getAdminReviewBoardListRequest(adminId as string, currentSection).then(getReviewBoardListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getReviewBoardList(reviewBoardList);
    },[currentPage])

    //          render          //
    return (
      <div className='admin-main-right'>
        <div className='admin-main-right-top'>
          {boardCount ? (
            <div className="review-board-list">
            {pageReviewBoardList.map((item) => (
              <ReviewBoardListItem item={item} />
            ))}
          </div>
          ) : (
            <div className="review-board-list-nothing"> 게시물이 존재하지 않습니다.</div>
          )}
        </div>
        <div className='admin-main-right-bottom'>
          {boardCount !== 0 && (
            <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageClickHandler={onPageClickHandler}
            onPreviusClickHandler={onPreviusClickHandler}
            onNextClickHandler={onNextClickHandler} />
          )}
        </div>
      </div>
    )
  };

  //          effect          //

  //          render          //
  return (
    <div className='admin-main'>
      <AdminMainLeft />
      <AdminMainRight />
    </div>
  )
}
