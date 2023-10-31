import React from 'react'
import "./style.css";
import { useEffect, useState } from "react";
import { GetUserResponseDto } from 'interfaces/response/admin';
import { GetSignInUserResponseDto } from 'interfaces/response/user';
import ResponseDto from 'interfaces/response/response.dto';
import { useNavigate } from 'react-router-dom';
import { getMyPageBoardListRequest, getMyPageCommentListRequest, getSignInUserRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { COUNT_BY_MAIN_BOARD_PAGE, MY_PAGE_COMMENT_PATH, MY_PAGE_PATH, MY_PAGE_SHORT_REVIEW_PATH } from 'constant';
import { useStore } from 'zustand';
import { useUserStore } from 'stores';
import { usePagination } from 'hooks';
import { ReviewBoardListResponseDto } from 'interfaces/response/reviewBoard';
import GetBoardListResponseDto from 'interfaces/response/mypage/get-board-list.response.dto';
import AdminUserReviewBoardListItem from 'components/AdminUserReviewBoardListItem';
import Pagination from 'components/Pagination';
import { CommentListResponseDto } from 'interfaces/response/reviewBoard/get-comment-list.response.dto';
import GetMyCommentListResponseDto, { userCommentList } from 'interfaces/response/mypage/get-my-comment-list.response.dto';
import AdminUserCommentListItem from 'components/AdminUserCommentListItem';
import MyPageCommentListItem from 'components/MyPageCommentListItem';
import MyPageTop from 'layouts/MyPageTop';
import MyPageMenu from 'layouts/MyPageMenu';

//          component : 마이페이지 메인        //
export default function UserCommentPage() {
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

      // description : 전체 댓글 리스트 상태 //
      const [commentList, setCommentList] = useState<userCommentList[]>([]);

      // description : 전체 댓글 게시물 갯수 상태 //
      const [boardCount, setBoardCount] = useState<number>(0);

      // description : 현재 페이지에서 보여줄 댓글 게시물 리스트 상태 //
      const [pageCommentList, setPageCommentList] = useState<userCommentList[]>([]);

      //          function          //
      // description : 현재 페이지의 댓글 리스트 분류 함수 //
      const getCommentList = (CommentList: userCommentList[]) => {
        const startIndex = COUNT_BY_MAIN_BOARD_PAGE * (currentPage -1);
        const lastIndex = CommentList.length > COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          ? COUNT_BY_MAIN_BOARD_PAGE * currentPage
                          : CommentList.length;
        const pageCommentList = CommentList.slice(startIndex, lastIndex);

        setPageCommentList(pageCommentList);
      }

      // description : 댓글 불러오기 응답 처리 함수 //
      const getCommentListResponseHandler = (
        responseBody: GetMyCommentListResponseDto | ResponseDto
      ) => {
        const { code } = responseBody;
        if (code === "DE") alert("데이터베이스 에러입니다.");
        if(code === "NE") alert("존재하지 않는 유저입니다.");
        if (code !== "SU") return;
        
        const { myCommentList } = responseBody as GetMyCommentListResponseDto;
        setCommentList(myCommentList);
        setBoardCount(myCommentList.length);
        getCommentList(myCommentList);
        changeSection(myCommentList.length, COUNT_BY_MAIN_BOARD_PAGE);
      }
    
      //          event handler         //
    
      //          effect          //
      // description : 댓글 게시글 불러오기 //
      useEffect(() => {
        const token = cookies.accessToken;

        getMyPageCommentListRequest(token).then(getCommentListResponseHandler);

        if(!boardCount) changeSection(boardCount, COUNT_BY_MAIN_BOARD_PAGE);
      },[currentSection])

      useEffect(() => {
        getCommentList(commentList);
      },[currentPage])

      //          render          //
      return (
        <div className='user-info-bottom-right-item'>
          <div className='user-info-bottom-right-name-list'>
            <div className='user-info-bottom-right-number'>번호</div>
            <div className='user-info-bottom-right-title'> 내용 </div>
            <div className='user-info-bottom-right-write-datetime'>작성일자</div>
            <div className='user-info-bottom-right-board-title'> 글제목 </div>
          </div>
          <div className='user-info-bottom-right-name-list'>
            {boardCount ? (
              <div>
                {pageCommentList.map((item) => (
                  <MyPageCommentListItem item={item} />
                ))}
              </div>
            ) : (
              <div className="user-review-list-nothing"> 작성한 댓글이 없습니다. </div>
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
