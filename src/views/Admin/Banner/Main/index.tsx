import { getAdminBannerListRequest } from 'apis';
import AdminBannerListItem from 'components/AdminBannerListItem';
import Pagination from 'components/Pagination';
import { ADMIN_BANNER_PATH, ADMIN_BANNER_WRITE_PATH, ADMIN_GET_ADVERTISING_BOARD_LIST_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH, COUNT_BY_PAGE } from 'constant';
import { usePagination } from 'hooks';
import { GetMainBannerListResponseDto, MainBannerListResponseDto } from 'interfaces/response/banner';
import ResponseDto from 'interfaces/response/response.dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'stores';

import "./style.css";
//          component : 배너 컴포넌트         //
export default function AdminBanner() {
  //          state         //
  // description : 유저 정보 상태 //
  const {user, setUser} = useUserStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //

  //          component : 왼쪽 메뉴 컴포넌트         //
  const AdminBannerLeft = () => {
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

  //          component : 오른쪽 메뉴 컴포넌트         //
  const AdminBannerRight = () => {
    //          state         //
    // description : 페이지 네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onNextClickHandler, onPreviusClickHandler, changeSection } = usePagination();
    
    // description : 전체 배너 게시물 리스트 상태 //
    const [bannerList, setBannerList] = useState<MainBannerListResponseDto[]>([]);

    // description : 전체 배너 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 기행기 게시물 리스트 상태 //
    const [pageBannerList, setPageBannerList] = useState<MainBannerListResponseDto[]>([]);

    //          function          //
    // description : 현재 페이지에서 보여줄 배너 게시물 분류 함수 //
    const getBanenrList = (MainBanenrList: MainBannerListResponseDto[]) => {
      const startIndex = COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = MainBanenrList.length > COUNT_BY_PAGE * currentPage
                        ? COUNT_BY_PAGE * currentPage
                        : MainBanenrList.length;
      const pageBannerList = MainBanenrList.slice(startIndex, lastIndex);

      setPageBannerList(pageBannerList);
    }

    // description : 배너 게시물 불러오기 응답처리 함수 //
    const getBannerListResponseHandler = (
      responseBody: GetMainBannerListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

      const { mainBannerList } = responseBody as GetMainBannerListResponseDto;
      setBannerList(mainBannerList);
      setBoardCount(mainBannerList.length);
      getBanenrList(mainBannerList);
      changeSection(mainBannerList.length, COUNT_BY_PAGE);
    }
  
    //          event handler         //
    // description : 배너 등록 클릭 이벤트
    const onWriteButtonClickHandler = () => {
      navigator(ADMIN_BANNER_WRITE_PATH());
    }
    
    //          effect          //
    // description : 배너 게시물 불러오기 //
    useEffect(() => {
      getAdminBannerListRequest(user?.email as string).then(getBannerListResponseHandler);
    }, [currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getBanenrList(bannerList);
    },[currentPage])

    //          render          //
    return(
      <div className='admin-banner-list-item'>
        <div className='admin-banner-write-button'>
          <div className='black-button' onClick={onWriteButtonClickHandler}> 배너 등록 </div>
        </div>
        <div className='admin-banner-list'>
          { boardCount ? (
            <div className='banner-list'>
              { pageBannerList.map((item) => (
                <AdminBannerListItem item={item}/>
              ))}
            </div>
          ) : (
            <div className='banner-list-nothing'> 등록된 배너가 없습니다. </div>
          )}
        </div>
        { boardCount !== 0 && (
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageClickHandler={onPageClickHandler}
            onPreviusClickHandler={onPreviusClickHandler}
            onNextClickHandler={onNextClickHandler}
          />
        )}
      </div>
    )
  };
  
  //          effect          //

  //          render          //
  return (
    <div className='admin-banner-main'>
      <AdminBannerLeft />
      <AdminBannerRight />
    </div>
  )
}
