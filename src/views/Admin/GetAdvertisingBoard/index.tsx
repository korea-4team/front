import { getAdminAdvertisingBoardListRequest, getAdminReviewBoardListRequest } from "apis";
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
import AdvertisingBoardListResponseDto from "interfaces/response/advertisingBoard/advertising-board-list.response.dto";
import GetUserListAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-user-list-advertising.response.dto";
import AdvertisingBoardListItem from "components/AdvertisingBoardListItem";
import AdminAdvertisingBoardListItem from "components/AdminAdvertisingBoardListItem";

//          component          //
export default function AdminAdvertising() {

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

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PATH);
    }

    // description : 광고 게시글 목록 버튼 클릭 이벤트 //
    const onAdvertisingBoardButtonClickButton = () => {
      navigator(ADMIN_GET_ADVERTISING_BOARD_LIST_PATH());
    }

    // description : 한 줄 목록 버튼 클릭 이벤트 //
    const onShortReviewButtonClickButton = () => {
      navigator(ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH());
    }

    // description : 유저 목록 버튼 클릭 이벤트 //
    const onUserButtonClickButton = () => {
      navigator(ADMIN_GET_USER_LIST_PATH());
    }

    // description : 배너 버튼 클릭 이벤트 //
    const onBannerButtonClickButton = () => {
      navigator(ADMIN_BANNER_PATH());
    }


    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-main-left'>
        <div className='admin-main-left-button' onClick={onReviewButtonClickButton}>기행기 목록</div>
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

    // description : 전체 광고 게시물 리스트 상태 //
    const [AdvertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);

    // description : 전체 광고 게시물 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 광고 게시물 리스트 상태 //
    const [pageAdvertisingBoardList, setPageAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);

    //          function          //
    // description : 현재 페이지의 게시물 리스트 분류 함수 //
    const getAdvertisingBoardList = (AdvertisingBoardList: AdvertisingBoardListResponseDto[]) => {
      const startIndex = COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = AdvertisingBoardList.length > COUNT_BY_PAGE *currentPage
                        ? COUNT_BY_PAGE * currentPage
                        : AdvertisingBoardList.length;
      const pageAdvertisingList = AdvertisingBoardList.slice(startIndex, lastIndex);

      setPageAdvertisingBoardList(pageAdvertisingList);
    }

    // description : 기행기 게시글 불러오기 응답 처리 함수 //
    const getAdvertisingBoardListResponseHandler = (
      responseBody: GetUserListAdvertisingBoardResponseDto| ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

      const { advertisingboardList } = responseBody as GetUserListAdvertisingBoardResponseDto;
      setAdvertisingBoardList(advertisingboardList);
      setBoardCount(advertisingboardList.length);
      getAdvertisingBoardList(advertisingboardList);
      changeSection(advertisingboardList.length, COUNT_BY_PAGE);
    }

    //          event handler         //

    //          effect          //
    // description : 기행기 게시글 불러오기 //
    useEffect(() => {
      getAdminAdvertisingBoardListRequest(user?.email as string, currentSection).then(getAdvertisingBoardListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getAdvertisingBoardList(AdvertisingBoardList);
    },[currentPage])

    //          render          //
    return (
      <div className='admin-main-right'>
        <div className='admin-main-right-top'>
          <div className="admin-main-list-name">
            <div className="admin-advertising-number"> 번호 </div>
            <div className="admin-advertising-title"> 제목 </div>
            <div className="admin-advertising-short-review"> 리뷰갯수 </div>
            <div className="admin-advertising-location"> 위치 </div>
            <div className="admin-advertising-business"> 업종 </div>
            <div className="admin-advertising-writer"> 작성자</div>
            <div className="admin-advertising-write-datetime"> 작성날짜</div>
          </div>
          <div className="divider"></div>
          {boardCount ? (
            <div className="review-board-list">
            {pageAdvertisingBoardList.map((item) => (
              <AdminAdvertisingBoardListItem item={item} />
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
