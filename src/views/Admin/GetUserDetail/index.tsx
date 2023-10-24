import { ADMIN_BANNER_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH } from 'constant';

import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'stores';
import { useState, useEffect } from 'react'

import "./style.css";
import { GetUserResponseDto } from 'interfaces/response/admin';
import ResponseDto from 'interfaces/response/response.dto';

//          component : 유저 정보 상세 컴포넌트         //
export default function AdminGetUserDetail() {
  //          state         //
  // description : 유저 정보 상태 //
  const {user, setUser} = useUserStore();

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
      <div className='admin-user-detail-left'>
        <div className='admin-user-detail-left-button' onClick={onReviewButtonClickButton}>기행기 목록</div>
        <div className='admin-user-detail-left-button' onClick={onShortReviewButtonClickButton}>한 줄 리뷰 목록</div>
        <div className='admin-user-detail-left-button' onClick={onUserButtonClickButton}>유저 목록</div>
        <div className='admin-user-detail-left-button' onClick={onBannerButtonClickButton}>배너</div>
      </div>
    )
  };

  //          component : 오른쪽 컴포넌트        //
  const AdminUserDetailRight = () => {
    //          state         //
    // description : 유저 이메일 정보 상태 //
    const { userEmail } = useParams();

    // description : 유저 상태 //
    const [user, setUser] = useState<GetUserResponseDto | null>(null);

    //          function          //
    // description : 유저 정보 불러오기 요청 함수 //
    const getUserDetailListHandler = (responseBody: GetUserResponseDto | ResponseDto) => {
      const { code } = responseBody;

      if (code === "NA") alert("관리자 아이디가 아닙니다.");
      if (code === "NE") alert("유저 정보가 없습니다.");
      if (code === "VF") alert("유저 이메일이 잘못되었습니다.");
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") {
        navigator(ADMIN_GET_USER_LIST_PATH());
        return;
      }

      setUser(responseBody as GetUserResponseDto);
    }

    //          event handler         //
    // description : 목록 버튼 클릭 이벤트 //
    const onBackButtonClickHandler = () => {
      navigator(-1);
    }

    //          effect          //

    //          render          //
    return (
      <div className='admin-user-detail-right'>
        <div className='admin-user-detail-right-top'>
          <div className='admin-user-detail-right-item-box'>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 이메일 </div>
              <div className='admin-user-detail-content'> {user?.email} </div>
            </div>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 비밀번호 </div>
              <div className='admin-user-detail-content'> {user?.password} </div>
            </div>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 주소 </div>
              <div className='admin-user-detail-content'> 부산시 </div>
            </div>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 상세주소 </div>
              <div className='admin-user-detail-content'> 부산진구</div>
            </div>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 전화번호 </div>
              <div className='admin-user-detail-content'> 010-1234-1234 </div>
            </div>
            <div className='admin-user-detail-box'>
              <div className='admin-user-detail-name'> 권한 </div>
              <div className='admin-user-detail-content'> user</div>
            </div>
          </div>
        </div>
        <div className='admin-user-detail-right-bottom'>
          <div className='menu-button-box'>
            <div className='menu-button'> 기행기 </div>
            <div className='menu-button'> 한줄리뷰 </div>
            <div className='menu-button'> 댓글 </div>
          </div>
        </div>
        <div className='back-button'>
          <div className='black-button' onClick={onBackButtonClickHandler}> 목록 </div>
        </div>
      </div>
    )
  };

  //          effect          //

  //          render          //
  return (
    <div className='admin-user-detail'>
      <AdminUserDetailLeft />
      <AdminUserDetailRight />
    </div>
  )
}
