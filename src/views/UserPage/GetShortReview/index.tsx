import React from 'react'
import "./style.css";
import { useEffect, useState } from "react";
import { GetUserResponseDto } from 'interfaces/response/admin';
import { GetSignInUserResponseDto } from 'interfaces/response/user';
import ResponseDto from 'interfaces/response/response.dto';
import { useNavigate } from 'react-router-dom';
import { getMyPageBoardListRequest, getMyPageShortReviewRequest, getSignInUserRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { COUNT_BY_MAIN_BOARD_PAGE, MY_PAGE_COMMENT_PATH, MY_PAGE_PATH, MY_PAGE_SHORT_REVIEW_PATH } from 'constant';
import { useStore } from 'zustand';
import { useUserStore } from 'stores';
import { usePagination } from 'hooks';
import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import GetBoardListResponseDto from 'interfaces/response/mypage/get-board-list.response.dto';
import AdminUserReviewBoardListItem from 'components/AdminUserReviewBoardListItem';
import Pagination from 'components/Pagination';
import GetMyShortReviewListResponseDto, { userShortReviewDto } from 'interfaces/response/mypage/get-my-short-review-list.response.dto';
import MyPageShortReviewListItem from 'components/MyPageShortReviewBoardListItem';
import MyPageTop from 'layouts/MyPageTop';
import MyPageMenu from 'layouts/MyPageMenu';

//          component : 마이페이지 메인        //
export default function UserShortReviewPage() {
  //          state         //
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // description: 유저 정보 상태 //
  const {user} = useUserStore();

  //          function          //
  // description : 네비게이트 함수//
  const navigator = useNavigate();

  //          event handler         //

    //          component : 마이페이지 하단 오른쪽 컴포넌트 //
    const UserInfoBottomright = () => {
      //          state         //
      // description : 페이지 네이션 관련 상태 및 함수 //
      const {totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection} = usePagination();

      // description : 전체 기행기 게시물 리스트 상태 //
      const [shortReviewBoardList, setShortReviewBoardList] = useState<userShortReviewDto[]>([]);

      // description : 전체 기행기 게시물 갯수 상태 //
      const [boardCount, setBoardCount] = useState<number>(0);

      // description : 현재 페이지에서 보여줄 기행기 게시물 리스트 상태 //
      const [pageShortReviewBoardList, setPageShortReviewBoardList] = useState<userShortReviewDto[]>([]);

      //          function          //
      // description : 현재 페이지의 게시물 리스트 분류 함수 //
      const getShortReviewBoardList = (ShortReviewBoardList: userShortReviewDto[]) => {
        const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage -1);
        const lastIndex = ShortReviewBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          ? COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          : ShortReviewBoardList.length;
        const pageShortReviewBoardList = ShortReviewBoardList.slice(startIndex, lastIndex);

        setPageShortReviewBoardList(pageShortReviewBoardList);
      }

      // description : 기행기 게시글 불러오기 응답 처리 함수 //
      const getShortReviewBoardListResponseHandler = (
        responseBody: GetMyShortReviewListResponseDto | ResponseDto
      ) => {
        const { code } = responseBody;
        if (code === "DE") alert("데이터 베이스 에러입니다.");
        if (code !== "SU") return;

        const { myShortReviewList } = responseBody as GetMyShortReviewListResponseDto;
        setShortReviewBoardList(myShortReviewList);
        setBoardCount(myShortReviewList.length);
        getShortReviewBoardList(myShortReviewList);
        changeSection(myShortReviewList.length, COUNT_BY_MAIN_BOARD_PAGE);
      }
    
      //          event handler         //
    
      //          effect          //
      // description : 기행기 게시글 불러오기 //
      useEffect(() => {
        const token = cookies.accessToken;

        getMyPageShortReviewRequest(token).then(getShortReviewBoardListResponseHandler);

        if(!boardCount) changeSection(boardCount, COUNT_BY_MAIN_BOARD_PAGE);
      },[currentSection]);

      useEffect(() => {
        getShortReviewBoardList(shortReviewBoardList);
      },[currentPage]);

      //          render          //
      return (
        <div className='user-info-bottom-right-item'>
          <div className='user-info-bottom-right-name-list'>
            <div className='user-info-bottom-right-number'>번호</div>
            <div className='user-info-bottom-right-title'>내용</div>
            <div className='user-info-bottom-right-score'> 평점 </div>
            <div className='user-info-bottom-right-write-datetime'>작성일자</div>
            <div className='user-info-bottom-right-favorite'>제목</div>
          </div>
          <div className='user-info-bottom-right-name-list'>
            {boardCount ? (
              <div>
                {pageShortReviewBoardList.map((item) => (
                  <MyPageShortReviewListItem item={item} />
                ))}
              </div>
            ) : (
              <div className="user-review-list-nothing">
              {" "}
              작성한 한줄 리뷰가 없습니다.{" "}
            </div>
            )}
          </div>
          {boardCount !== 0 && (
            <Pagination
              totalPage={totalPage}
              currentPage={currentPage}
              onPageClickHandler={onPageClickHandler}
              onPreviusClickHandler={onPreviusClickHandler}
              onNextClickHandler={onNextClickHandler} />
          )}
        </div>
      );
    };

  //          effect          //

  //          render          //
  return (
    <div className='user-info-wrapper'>
      <div className='user-info-top'>
        <MyPageTop />
      </div>
      <div className='user-info-bottom'>
        <MyPageMenu />
        <UserInfoBottomright />
      </div>
    </div>
    
  )

}
