import React from 'react'
import "./style.css";
import { useEffect, useState } from "react";
import { GetUserResponseDto } from 'interfaces/response/admin';
import { GetSignInUserResponseDto } from 'interfaces/response/user';
import ResponseDto from 'interfaces/response/response.dto';
import { useNavigate } from 'react-router-dom';
import { getMyPageBoardListRequest, getSignInUserRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { COUNT_BY_MAIN_BOARD_PAGE, MY_PAGE_PATH } from 'constant';
import { useStore } from 'zustand';
import { useUserStore } from 'stores';
import { usePagination } from 'hooks';
import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import GetBoardListResponseDto from 'interfaces/response/mypage/get-board-list.response.dto';
import AdminUserReviewBoardListItem from 'components/AdminUserReviewBoardListItem';
import Pagination from 'components/Pagination';

//          component : 마이페이지 메인        //
export default function UserPage() {
  //          state         //
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // description: 유저 정보 상태 //
  const {user} = useUserStore();

  //          function          //
  // description : 네비게이트 함수//
  const navigator = useNavigate();

  //          event handler         //

  //          component : 상단 내 정보 컴포넌트          //
  const UserInfoTop = () => {
    //          state         //
    const [userDetail, setUserDetail] = useState<GetSignInUserResponseDto | null>(null);

    //          function          //
    // description : 유저 정보 불러오기 요청 함수 //
    const getUserResponseHandler = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
      const { code } = responseBody;

      if (code === "DE") alert("데이터베이스 에러입니다.");
      if (code === "NE") alert("유저 정보가 업습니다.")
      if (code !== "SU") {
        navigator("/");
        return;
      }

      setUserDetail(responseBody as GetSignInUserResponseDto);
    }

    //          event handler         //
    
    //          effect          //
    useEffect(() => {
      const token = cookies.accessToken;

      getSignInUserRequest(token).then(getUserResponseHandler);

    },[])

    //          render          //
    return (
      <div className='user-info-top-item'>
        <div className='user-info-top-left'>
          <div className='user-info-email'>{userDetail?.email}</div>
          <div className='user-info-nickname'>{userDetail?.nickname}</div>
          <div className='user-info-telnumber'>{userDetail?.telNumber}</div>
        </div>
        <div className='user-info-top-right'>
          <div className='user-info-top-update'> 수정하기 </div>
          <div className='user-info-top-store-info'> 사업자등록증 등록하기</div>
        </div>
      </div>
    );
  };

  //          component : 마이페이지 하단 왼쪽 컴포넌트 //
  const UserInfoBottomLeft = () => {
  //          state         //

  //          function          //

  //          event handler         //
  // description : 내 게시글 클릭 이벤트 //
  const onMyBoardClickButton = () => {
    navigator(MY_PAGE_PATH(user?.email as string));
  }

  //          effect          //

  //          render          //
  return (
    <div className='user-info-bottom-left-item'>
      <div className='user-info-bottom-left-menu-button' onClick={onMyBoardClickButton}> 내 게시글 </div>
      <div className='user-info-bottom-left-menu-button'> 내 댓글 </div>
      <div className='user-info-bottom-left-menu-button'> 내 한줄리뷰 </div>
      <div className='user-info-bottom-left-menu-button'> 내 예약내역 </div>
      <div className='user-info-bottom-left-menu-button'> 내 가게 </div>
      <div className='user-info-bottom-left-menu-button'> 내 가게예약정보</div>
    </div>
  );
  };

    //          component : 마이페이지 하단 오른쪽 컴포넌트 //
    const UserInfoBottomright = () => {
      //          state         //
      // description : 페이지 네이션 관련 상태 및 함수 //
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
        const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage -1);
        const lastIndex = ReviewBoardList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          ? COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          : ReviewBoardList.length;
        const pageReviewBoardList = ReviewBoardList.slice(startIndex, lastIndex);

        setPageReviewBoardList(pageReviewBoardList);
      }

      // description : 기행기 게시글 불러오기 응답 처리 함수 //
      const getReviewBoardListResponseHandler = (
        responseBody: GetBoardListResponseDto | ResponseDto
      ) => {
        const { code } = responseBody;
        if (code === "DE") alert("데이터 베이스 에러입니다.");
        if (code !== "SU") return;

        const { boardList } = responseBody as GetBoardListResponseDto;
        setReviewBoardList(boardList);
        setBoardCount(boardList.length);
        getReviewBoardList(boardList);
        changeSection(boardList.length, COUNT_BY_MAIN_BOARD_PAGE);
      }
    
      //          event handler         //
    
      //          effect          //
      // description : 기행기 게시글 불러오기 //
      useEffect(() => {
        const token = cookies.accessToken;

        getMyPageBoardListRequest(token).then(getReviewBoardListResponseHandler);

        if(!boardCount) changeSection(boardCount, COUNT_BY_MAIN_BOARD_PAGE);
      },[currentSection]);

      useEffect(() => {
        getReviewBoardList(reviewBoardList);
      },[currentPage]);

      //          render          //
      return (
        <div className='user-info-bottom-right-item'>
          <div className='user-info-bottom-right-name-list'>
            <div className='user-info-bottom-right-number'>번호</div>
            <div className='user-info-bottom-right-title'>제목</div>
            <div className='user-info-bottom-right-write-datetime'>작성일자</div>
            <div className='user-info-bottom-right-comment-count'> 댓글 </div>
            <div className='user-info-bottom-right-favorite'>추천</div>
            <div className='user-info-bottom-right-view-count'>조회</div>
          </div>
          <div className='user-info-bottom-right-name-list'>
            {boardCount ? (
              <div>
                {pageReviewBoardList.map((item) => (
                  <AdminUserReviewBoardListItem item={item} />
                ))}
              </div>
            ) : (
              <div className="user-review-list-nothing">
              {" "}
              작성한 게시글이 없습니다.{" "}
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
        <UserInfoTop />
      </div>
      <div className='user-info-bottom'>
        <UserInfoBottomLeft />
        <UserInfoBottomright />
      </div>
    </div>
    
  )

}
