import { getAdminBannerListRequest } from 'apis';
import AdminBannerListItem from 'components/AdminBannerListItem';
import Pagination from 'components/Pagination';
import { ADMIN_BANNER_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH, COUNT_BY_PAGE } from 'constant';
import { usePagination } from 'hooks';
import { GetMainBannerListResponseDto, MainBannerListResponseDto } from 'interfaces/response/banner';
import ResponseDto from 'interfaces/response/response.dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'stores';

import "./style.css";
//          component : 배너 컴포넌트         //
export default function AdminBannerWrite() {
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
      <div className='admin-banner-write-left'>
        <div className='admin-banner-write-left-button' onClick={onReviewButtonClickButton}>기행기 목록</div>
        <div className='admin-banner-write-left-button' onClick={onShortReviewButtonClickButton}>한 줄 리뷰 목록</div>
        <div className='admin-banner-write-left-button' onClick={onUserButtonClickButton}>유저 목록</div>
        <div className='admin-banner-write-left-button' onClick={onBannerButtonClickButton}>배너</div>
      </div>
    )
  };

  //          component : 오른쪽 메뉴 컴포넌트         //
  const AdminBannerRight = () => {
    //          state         //

    //          function          //
  
    //          event handler         //
    // description : 배너 등록 클릭 이벤트
    const onWriteButtonClickHandler = () => {
    }

    const onBackButtonClickButton = () => {
      navigator(-1);
    }
    
    //          effect          //

    //          render          //
    return(
      <div className='admin-banner-write-right'>
        <div className='admin-banner-write-item-box'>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 순서 </div>
            <div className='admin-banner-write-content'></div>
          </div>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 이미지 </div>
            <div className='admin-banner-write-content'></div>
          </div>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 연결 evnet board </div>
            <div className='admin-banner-write-content'></div>
          </div>
        </div>
        <div className='admin-banner-write-button'>
          <div className='black-button'> 수정 </div>
          <div className='black-button' onClick={onBackButtonClickButton}> 목록 </div>
        </div>
      </div>
    )
  };
  
  //          effect          //

  //          render          //
  return (
    <div className='admin-banner-write-main'>
      <AdminBannerLeft />
      <AdminBannerRight />
    </div>
  )
}
