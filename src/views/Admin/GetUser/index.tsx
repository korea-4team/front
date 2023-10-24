import { ADMIN_BANNER_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH, COUNT_BY_PAGE } from 'constant';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useUserStore } from 'stores';
import "./style.css";
import { usePagination } from 'hooks';
import { GetUserListResponseDto, UserListResponseDto } from 'interfaces/response/admin';
import ResponseDto from 'interfaces/response/response.dto';
import { getAdminUserListRequest } from 'apis';
import AdminUserListItem from 'components/AdminUserListItem';
import Pagination from 'components/Pagination';

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
    // description : 페이지 네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection} = usePagination();

    // description : 전체 유저 리스트 상태 //
    const [userList, setUserList] = useState<UserListResponseDto[]>([]);

    // description : 전체 유저 리스트 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 유저 리스트 상태 //
    const [pageUserList, setPageUserList] = useState<UserListResponseDto[]>([]);
    
    //          function          //
    // description : 현재 페이지의 유저 리스트 분류 함수 //
    const getUserList = (
      UserList: UserListResponseDto[]
    ) => {
      const startIndex = COUNT_BY_PAGE * (currentPage -1);
      const lastIndex = UserList.length > COUNT_BY_PAGE * currentPage
                        ? COUNT_BY_PAGE * currentPage
                        : UserList.length;
      const pageUserList = UserList.slice(startIndex, lastIndex);

      setPageUserList(pageUserList);
    }

    // description : 유저 리스트 불러오기 응답 처리 함수 //
    const getUserListResponseHandler = (
      responseBody: GetUserListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

      const { userList } = responseBody as GetUserListResponseDto;
      setUserList(userList);
      setBoardCount(userList.length);
      getUserList(userList);
      changeSection(userList.length, COUNT_BY_PAGE);

    };

    //          event handler         //

    //          effect          //
    // description : 유저 리스트 불러오기 //
    useEffect(() => {
      getAdminUserListRequest(user?.email as string, currentSection).then(getUserListResponseHandler);
    },[currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    }, [currentSection]);

    useEffect(() => {
      getUserList(userList);
    },[currentPage]);

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
          {boardCount ? (
            <div className='user-list'>
              {pageUserList.map((item) => (
                <AdminUserListItem item={item} />
              ))}
            </div>
          ) : (
            <div className='user-list-nothing'> 회원이 존재하지 않습니다. </div>
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
    <div className='admin-user-list'>
      <AdminUserListLeft />
      <AdminUserListRight />
    </div>
  )
}
