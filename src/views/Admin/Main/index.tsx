import { getAdminReviewBoardListRequest } from "apis";
import AdminReviewBoardListItem from "components/AdminReviewBoardListItem";
import Pagination from 'components/Pagination';
import { ADMIN_BANNER_PATH, ADMIN_GET_ADVERTISING_BOARD_LIST_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH, COUNT_BY_PAGE } from "constant";
import { usePagination } from 'hooks';
import ResponseDto from "interfaces/response/response.dto";
import { GetReviewBoardListResponseDto, ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "stores";
import "./style.css";

//          component          //
export default function AdminMain() {

  //          state         //
  // description : 유저 정보 상태 //
  const {user, setUser} = useUserStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //
  
  //           component : 관리자 메인 페이지 왼쪽         //
  const AdminMainLeft = () => {
    //          state         //
    // description : 기행기 버튼 클릭 상태 //
    const [reviewButton, setReviewButton] = useState<boolean>(true);

    // description : 광고 버튼 클릭 상태 //
    const [advertisingButton, setAdvertisingButton] = useState<boolean>(false);

    // description : 한줄리뷰 버튼 클릭 상태 //
    const [shortReviewButton, setShortReviewButton] = useState<boolean>(false);

    // description : 유저목록 버튼 클릭 상태 //
    const [userButton, setUserButton] = useState<boolean>(false);

    // description : 배너 버튼 클릭 상태 //
    const [bannerButton, setBannerButton] = useState<boolean>(false);

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PATH);

      setReviewButton(true);
      setAdvertisingButton(false);
      setShortReviewButton(false);
      setUserButton(false);
      setBannerButton(false);
    }

    // description : 광고 게시글 목록 버튼 클릭 이벤트 //
    const onAdvertisingBoardButtonClickButton = () => {
      navigator(ADMIN_GET_ADVERTISING_BOARD_LIST_PATH());

      setReviewButton(false);
      setAdvertisingButton(true);
      setShortReviewButton(false);
      setUserButton(false);
      setBannerButton(false);
    }

    // description : 한 줄 목록 버튼 클릭 이벤트 //
    const onShortReviewButtonClickButton = () => {
      navigator(ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH());

      setReviewButton(false);
      setAdvertisingButton(false);
      setShortReviewButton(true);
      setUserButton(false);
      setBannerButton(false);
    }

    // description : 유저 목록 버튼 클릭 이벤트 //
    const onUserButtonClickButton = () => {
      navigator(ADMIN_GET_USER_LIST_PATH());

      setReviewButton(false);
      setAdvertisingButton(false);
      setShortReviewButton(false);
      setUserButton(true);
      setBannerButton(false);
    }

    // description : 배너 버튼 클릭 이벤트 //
    const onBannerButtonClickButton = () => {
      navigator(ADMIN_BANNER_PATH());

      setReviewButton(false);
      setAdvertisingButton(false);
      setShortReviewButton(false);
      setUserButton(false);
      setBannerButton(true);
    }

    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-main-left'>
        <div className='admin-main-left-button' onClick={onReviewButtonClickButton}>
         { reviewButton ? (<div className="main-menu-button-true"> 기행기 목록 </div>)  : (<div className="menu-button-false"> 기행기 목록 </div>)}
        </div>
        <div className='admin-main-left-button' onClick={onAdvertisingBoardButtonClickButton}>광고 게시글 목록</div>
        <div className='admin-main-left-button' onClick={onShortReviewButtonClickButton}>한 줄 리뷰 목록</div>
        <div className='admin-main-left-button' onClick={onUserButtonClickButton}>유저 목록</div>
        <div className='admin-main-left-button' onClick={onBannerButtonClickButton}>배너</div>
      </div>
    )
  };

  //           component : 관리자 메인 페이지 오른쪽         //
  const AdminMainRight = () => {
    //          state         //
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
      getAdminReviewBoardListRequest(user?.email as string, currentSection).then(getReviewBoardListResponseHandler);
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
          <div className="admin-main-list-name">
            <div className="admin-main-number"> 번호 </div>
            <div className="admin-main-title"> 제목 </div>
            <div className="admin-main-writer"> 작성자 </div>
            <div className="admin-main-write-datetime"> 작성일자 </div>
            <div className="admin-main-favorite-count">추천</div>
            <div className="admin-main-view-count">조회</div>
          </div>
          <div className="divider"></div>
          {boardCount ? (
            <div className="review-board-list">
            {pageReviewBoardList.map((item) => (
              <AdminReviewBoardListItem item={item} />
            ))}
          </div>
          ) : (
            <div className="review-board-list-nothing"> 게시물이 존재하지 않습니다.</div>
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
