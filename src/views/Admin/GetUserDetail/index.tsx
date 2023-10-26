import {
  ADMIN_BANNER_PATH,
  ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH,
  ADMIN_GET_USER_LIST_PATH,
  ADMIN_PATH,
  COUNT_BY_PAGE,
} from "constant";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "stores";

import {
  getAdminStoreInfoRequest,
  getAdminUserDetailRequest,
  getAdminUserReviewBoardListRequest,
} from "apis";
import AdminUserReviewBoardListItem from "components/AdminUserReviewBoardListItem";
import Pagination from "components/Pagination";
import { usePagination } from "hooks";
import { GetUserResponseDto } from "interfaces/response/admin";
import getUserStoreInfoResponseDto from "interfaces/response/admin/get-user-store-info.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import {
  GetReviewBoardListResponseDto,
  ReviewBoardListResponseDto,
} from "interfaces/response/reviewBoard";
import "./style.css";

//          component : 유저 정보 상세 컴포넌트         //
export default function AdminGetUserDetail() {
  //          state         //
  // description : 유저 이메일 정보 상태 //
  const { userEmail, adminId } = useParams();

  // description : 로그인 유저 정보 상태 //
  const { user } = useUserStore();

  // description : 유저 정보 상태 //
  const [userDetail, setUserDetail] = useState<GetUserResponseDto | null>(null);
  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //

  //          component : 왼쪽 메뉴 컴포넌트         //
  const AdminUserDetailLeft = () => {
    //          state         //

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PATH);
    };

    // description : 한 줄 목록 버튼 클릭 이벤트 //
    const onShortReviewButtonClickButton = () => {
      navigator(ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH());
    };

    // description : 유저 목록 버튼 클릭 이벤트 //
    const onUserButtonClickButton = () => {
      navigator(ADMIN_GET_USER_LIST_PATH());
    };

    // description : 배너 버튼 클릭 이벤트 //
    const onBannerButtonClickButton = () => {
      navigator(ADMIN_BANNER_PATH());
    };

    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className="admin-user-detail-left">
        <div
          className="admin-user-detail-left-button"
          onClick={onReviewButtonClickButton}
        >
          기행기 목록
        </div>
        <div
          className="admin-user-detail-left-button"
          onClick={onShortReviewButtonClickButton}
        >
          한 줄 리뷰 목록
        </div>
        <div
          className="admin-user-detail-left-button"
          onClick={onUserButtonClickButton}
        >
          유저 목록
        </div>
        <div
          className="admin-user-detail-left-button"
          onClick={onBannerButtonClickButton}
        >
          배너
        </div>
      </div>
    );
  };

  //          component : 오른쪽 컴포넌트        //
  const AdminUserDetailRight = () => {
    //          state         //

    // description : 사업자 등록증 정보 상태 //
    const [userStoreInfo, setUserStoreInfo] =
      useState<getUserStoreInfoResponseDto | null>(null);

    //          function          //
    // description : 유저 정보 불러오기 요청 함수 //
    const getUserResponseHandler = (
      responseBody: GetUserResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;

      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code === "VF") alert("게시물 번호가 잘못되었습니다.");
      if (code === "NE") alert("유저 정보가 없습니다.");
      if (code !== "SU") {
        navigator(ADMIN_GET_USER_LIST_PATH());
        return;
      }

      // setUserDetail({ ...(responseBody as GetUserResponseDto) });
    };

    // description : 사업자 등록증 정보 불러오기 요청 함수 //
    const getUserStoreInfoResponseHandler = (
      responseBody: getUserStoreInfoResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;

      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code === "NA") alert("관리자 아이디가 아닙니다.");
      if (code === "NE") alert("유저 정보가 없습니다.");
      if (code !== "SU") {
        return;
      }

      setUserStoreInfo({ ...(responseBody as getUserStoreInfoResponseDto) });
    };

    //          event handler         //
    // description : 목록 버튼 클릭 이벤트 //
    const onBackButtonClickHandler = () => {
      navigator(-1);
    };

    //          effect          //
    // description : 유저 이메일이 바뀔 때마다 새로운 정보 받아오기 //
    useEffect(() => {
      if (!userEmail || adminId !== "admin") {
        alert("관리자 아이디가 아닙니다.");
        navigator(ADMIN_GET_USER_LIST_PATH());
        return;
      }

      getAdminUserDetailRequest(adminId, userEmail).then(
        getUserResponseHandler
      );
      getAdminStoreInfoRequest(adminId as string, userEmail).then(
        getUserStoreInfoResponseHandler
      );
    }, [userEmail]);

    //          render          //
    return (
      <div className="admin-user-detail-right">
        <div className="admin-user-detail-right-top">
          <div className="admin-user-detail-right-item-box">
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 이메일 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.email}{" "}
              </div>
            </div>
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 닉네임 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.nickname}{" "}
              </div>
            </div>
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 주소 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.address}{" "}
              </div>
            </div>
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 상세주소 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.addressDetail}
              </div>
            </div>
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 전화번호 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.telNumber}{" "}
              </div>
            </div>
            <div className="admin-user-detail-box">
              <div className="admin-user-detail-name"> 권한 </div>
              <div className="admin-user-detail-content">
                {" "}
                {userDetail?.role}
              </div>
            </div>
          </div>

          {user && userDetail?.role === "owner" && userStoreInfo !== null && (
            <div className="admin-user-detail-right-owner-item-box">
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name">
                  {" "}
                  사업자 등록증 번호{" "}
                </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.storeNumber}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 가게 이름 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.storeName}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 주소 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.address}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 상세주소 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.addressDetail}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 업종 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.businessType}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name">
                  {" "}
                  사장님 이름{" "}
                </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.ownerName}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 시작 시간 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.startHours}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name"> 종료 시간 </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.finishHours}{" "}
                </div>
              </div>
              <div className="admin-user-detail-box">
                <div className="admin-user-detail-owner-name">
                  {" "}
                  가게 전화번호{" "}
                </div>
                <div className="admin-user-detail-owner-content">
                  {" "}
                  {userStoreInfo?.telNumber}{" "}
                </div>
              </div>
            </div>
          )}
          {user && userDetail?.role === "owner" && userStoreInfo === null && (
            <div className="user-detail-bottom-list-nothing">
              {" "}
              사업자 등록증 정보가 없습니다.
            </div>
          )}
        </div>
      </div>
    );
  };

  // component : 유저의 기행기 게시글 불러오기 컴포넌트 //
  const UserReviewList = () => {
    //           state            //
    // description : 페이지네이션 관련 상태 //
    const {
      totalPage,
      currentPage,
      currentSection,
      onPageClickHandler,
      onPreviusClickHandler,
      onNextClickHandler,
      changeSection,
    } = usePagination();

    // description : 전체 기행기 게시물 리스트 상태 //
    const [reviewBoardList, setReviewBoardList] = useState<
      ReviewBoardListResponseDto[]
    >([]);

    // description : 전체 기행기 게시물 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 기행기 게시물 리스트 상태 //
    const [pageReviewBoardList, setPageReviewBoardList] = useState<
      ReviewBoardListResponseDto[]
    >([]);

    //            function           //
    // description : 현재 페이지의 게시글 리스트 분류 함수 //
    const getReviewBoardList = (
      ReviewBoardList: ReviewBoardListResponseDto[]
    ) => {
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const lastIndex =
        ReviewBoardList.length > COUNT_BY_PAGE * currentPage
          ? COUNT_BY_PAGE * currentPage
          : ReviewBoardList.length;
      const pageReviewBoardList = ReviewBoardList.slice(startIndex, lastIndex);

      setPageReviewBoardList(pageReviewBoardList);
    };

    // description : 기행기 게시글 불러오기 응답 처리 함수 //
    const getReviewBoardListResponseHandler = (
      responseBody: GetReviewBoardListResponseDto | ResponseDto
    ) => {
      const { boardList } = responseBody as GetReviewBoardListResponseDto;
      setReviewBoardList(boardList);
      setBoardCount(boardList.length);
      getReviewBoardList(boardList);
      changeSection(boardList.length, COUNT_BY_PAGE);
    };

    //          event handler         //
    // description : 목록 버튼 클릭 이벤트 //
    const onBackButtonClickHandler = () => {
      navigator(-1);
    };

    //           effect           //
    useEffect(() => {
      if (!user || !userEmail) return;
      getAdminUserReviewBoardListRequest(
        user.email,
        userEmail,
        currentSection
      ).then(getReviewBoardListResponseHandler);
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    }, [currentSection]);

    useEffect(() => {
      getReviewBoardList(reviewBoardList);
    }, [currentSection]);

    // render //
    return (
      <div className="admin-user-detail-right-bottom-item">
        <div className="admin-user-detail-right-bottom">
          <div className="menu-button-box">
            <div className="menu-button"> 기행기 </div>
            <div className="menu-button"> 한줄리뷰 </div>
            <div className="menu-button"> 댓글 </div>
          </div>

          <div className="admin-user-board-list-review-board">
            <div className="admin-user-board-list-name-list">
              <div className="admin-user-board-list-name"> 번호 </div>
              <div className="admin-user-board-list-title"> 제목 </div>
              <div className="admin-user-board-list-write-datetime">
                {" "}
                작성일자{" "}
              </div>
              <div className="admin-user-board-list-favorite"> 추천 </div>
              <div className="admin-user-board-list-view-count"> 조회 </div>
            </div>

            <div className="admin-user-board-list-name-list">
              {boardCount ? (
                <div>
                  {pageReviewBoardList.map((item) => (
                    <AdminUserReviewBoardListItem item={item} />
                  ))}
                </div>
              ) : (
                <div className="user-review-list-nothing">
                  {" "}
                  작성된 게시글이 없습니다.{" "}
                </div>
              )}
            </div>
            {boardCount !== 0 && (
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onPageClickHandler={onPageClickHandler}
                onPreviusClickHandler={onPreviusClickHandler}
                onNextClickHandler={onNextClickHandler}
              />
            )}
          </div>
        </div>
        <div className="back-button">
          <div className="black-button" onClick={onBackButtonClickHandler}>
            {" "}
            목록{" "}
          </div>
        </div>
      </div>
    );
  };

  //          effect          //

  //          render          //
  return (
    <div className="admin-user-detail">
      <div className="admin-user-detail-list">
        <AdminUserDetailLeft />
      </div>
      <div className="admin-user-board-list">
        <AdminUserDetailRight />
        <UserReviewList />
      </div>
    </div>
  );
}
