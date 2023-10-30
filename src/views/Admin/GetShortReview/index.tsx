import { getAdminShortReviewListRequest } from "apis";
import AdminShortReviewBoardListItem from "components/AdminShortReviewBoardListItem";
import Pagination from "components/Pagination";
import {
  ADMIN_BANNER_PATH,
  ADMIN_GET_ADVERTISING_BOARD_LIST_PATH,
  ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH,
  ADMIN_GET_USER_LIST_PATH,
  ADMIN_PATH,
  COUNT_BY_PAGE,
} from "constant";
import { usePagination } from "hooks";
import GetShortReviewListResponseDto, { ShortReviewListResponseDto } from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";

import ResponseDto from "interfaces/response/response.dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "stores";
import "./style.css";

//          component : 관리자 한 줄 리뷰 불러오기 컴포넌트         //
export default function AdminGetShortReview() {
  //          state         //
  // description : 유저 정보 상태 //
  const { user, setUser } = useUserStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //

  //          component : 왼쪽 컴포넌트         //
  const AdminShortReviewLeft = () => {
    //          state         //

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PATH);
    };

    // description : 광고 게시글 목록 버튼 클릭 이벤트 //
    const onAdvertisingBoardButtonClickButton = () => {
      navigator(ADMIN_GET_ADVERTISING_BOARD_LIST_PATH());
    }
        
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
      <div className="admin-main-left">
        <div className="admin-short-review-left-button" onClick={onReviewButtonClickButton}> 기행기 목록</div>
        <div className='admin-main-left-button' onClick={onAdvertisingBoardButtonClickButton}>광고 게시글 목록</div>
        <div className="admin-short-review-left-button" onClick={onShortReviewButtonClickButton}> 한 줄 리뷰 목록 </div>
        <div className="admin-short-review-left-button" onClick={onUserButtonClickButton}> 유저 목록 </div>
        <div className="admin-short-review-left-button" onClick={onBannerButtonClickButton}> 배너 </div>
      </div>
    );
  };

  //          component : 오른쪽 컴포넌트         //
  const AdminShortReviewRight = () => {
    //          state         //
    // description : 페이지 네이션 관련 상태 및 함수 //
    const {
      totalPage,
      currentPage,
      currentSection,
      onPageClickHandler,
      onPreviusClickHandler,
      onNextClickHandler,
      changeSection,
    } = usePagination();

    // description : 전체 한 줄 리뷰 리스트 상태 //
    const [shortReviewBoardList, setShortReviewBoardList] = useState<ShortReviewListResponseDto[]>([]);

    // description : 전체 한 줄 리뷰 게시물 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 한 줄 리뷰 리스트 상태 //
    const [pageShortReviewBoardList, setPageShortReviewBoardList] = useState<ShortReviewListResponseDto[]>([]);

    //          function          //
    // description : 현재 페이지의 한 줄 리뷰 리스트 분류 함수 //
    const getShortReviewBoardList = (
      ShortReviewBoardList: ShortReviewListResponseDto[]
    ) => {
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const lastIndex =
        ShortReviewBoardList.length > COUNT_BY_PAGE * currentPage
          ? COUNT_BY_PAGE * currentPage
          : ShortReviewBoardList.length;
      const pageShortReviewBoardList = ShortReviewBoardList.slice(
        startIndex,
        lastIndex
      );

      setPageShortReviewBoardList(pageShortReviewBoardList);
    };

    // description : 한 줄 리뷰 불러오기 응답 처리 함수 //
    const getShortReviewListResponseHandler = (
      responseBody: GetShortReviewListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

      const { shortList } = responseBody as GetShortReviewListResponseDto;
      setShortReviewBoardList(shortList);
      setBoardCount(shortList.length);
      getShortReviewBoardList(shortList);
      changeSection(shortList.length, COUNT_BY_PAGE);
    };

    //          event handler         //

    //          effect          //
    // description : 한 줄 리뷰 불러오기 //
    useEffect(() => {
      getAdminShortReviewListRequest(
        user?.email as string,
        currentSection
      ).then(getShortReviewListResponseHandler);
    }, [currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    }, [currentSection]);

    useEffect(() => {
      getShortReviewBoardList(shortReviewBoardList);
    }, [currentPage]);

    //          render          //
    return (
      <div className="admin-short-review-right">
        <div className="admin-short-review-right-top">
          <div className="admin-short-review-list-name">
            <div className="admin-short-review-number"> 번호 </div>
            <div className="admin-short-review-contents"> 내용 </div>
            <div className="admin-short-review-score">별점</div>
            <div className="admin-short-review-writer"> 작성자 </div>
            <div className="admin-short-review-write-datetime"> 작성일자 </div>
          </div>
          <div className="divider"></div>
          {boardCount ? (
            <div className="short-review-list">
              {pageShortReviewBoardList.map((item) => (
                <AdminShortReviewBoardListItem item={item} />
              ))}
            </div>
          ) : (
            <div className="short-review-list-nothing">
              게시물이 존재하지 않습니다.
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
    );
  };

  //          effect          //

  //          render          //
  return (
    <div className="admin-short-review">
      <AdminShortReviewLeft />
      <AdminShortReviewRight />
    </div>
  );
}
