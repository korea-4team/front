import { ADMIN_BANNER_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PAGE_PATH } from 'constant';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'stores';
import "./style.css";

//          component : 유저 목록 불러오기          //
export default function AdminGetUserList() {

  //          state         //
  // description : 유저 정보 상태 //
  const {user, setUser} = useUserStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //

  //          component : 왼쪽 메뉴 컴포넌트         //
  const AdminUserListLeft = () => {
    //          state         //

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PAGE_PATH(user?.email as string));
    }

    // description : 한 줄 목록 버튼 클릭 이벤트 //
    const onShortReviewButtonClickButton = () => {
      navigator(ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH(user?.email as string));
    }

    // description : 유저 목록 버튼 클릭 이벤트 //
    const onUserButtonClickButton = () => {
      navigator(ADMIN_GET_USER_LIST_PATH(user?.email as string));
    }

    // description : 베너 버튼 클릭 이벤트 //
    const onBannerButtonClickButton = () => {
      navigator(ADMIN_BANNER_PATH(user?.email as string));
    }


    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-user-list-left'>
        <div className='admin-user-list-left-button' onClick={onReviewButtonClickButton}>기행기 목록</div>
        <div className='admin-user-list-left-button' onClick={onShortReviewButtonClickButton}>한 줄 리뷰 목록</div>
        <div className='admin-user-list-left-button' onClick={onUserButtonClickButton}>유저 목록</div>
        <div className='admin-user-list-left-button' onClick={onBannerButtonClickButton}>배너</div>
      </div>
    )
  };

  //          component : 오른쪽 메뉴 컴포넌트         //
  const AdminUserListRight = () => {
    //          state         //

    //          function          //


    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-user-list-right'>
        <div className='admin-user-list-right-top'>
          <div className='admin-user-list-name'>
            <div className="admin-main-email"> 이메일 </div>
            <div className="admin-main-password"> 비밀번호 </div>
            <div className="admin-main-nickname"> 닉네임 </div>
            <div className="admin-main-address"> 주소 </div>
            <div className="admin-main-address-detail"> 상세 주소 </div>
            <div className="admin-main-telnumber"> 전화번호 </div>
            <div className="admin-main-role"> 권한 </div>
          </div>
          <div className='divider'></div>
        </div>
      </div>
    )
  };


  //          effect          //

  //          render          //
  return (
    <div className='admin-user-list'>
      <AdminUserListLeft />
      <AdminUserListRight />
    </div>
  )
}
