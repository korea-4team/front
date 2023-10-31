import {
  ADMIN_BANNER_PATH,
  ADMIN_BANNER_UPDATE_PATH,
  ADMIN_BANNER_WRITE_PATH,
  ADMIN_GET_ADVERTISING_BOARD_LIST_PATH,
  ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH,
  ADMIN_GET_USER_LIST_PATH,
  ADMIN_ID_PATH_VARIABLE,
  ADMIN_PATH,
  ADMIN_USER_DETAIL_PATH,
  ADVERTISING_BOARD_PATH,
  ADVERTISING_BOARD_SEARCH_LIST_PATH,
  ADVERTISING_BOARD_WRITE_PATH,
  AUTH_PATH,
  BOARD_NUMBER_PATH_VARIABLE,
  DETAIL_PATH,
  EVENT_BOARD_PATH,
  MAIN_PATH,
  MY_PAGE_COMMENT_PATH,
  MY_PAGE_PATH,
  MY_PAGE_SHORT_REVIEW_PATH,
  NOTICE_BOARD_PATH,
  REVIEW_BOARD_DETAIL_PATH,
  REVIEW_BOARD_PATH,

  REVIEW_BOARD_SEARCH_LIST_PATH,

  REVIEW_BOARD_UPDATE_PATH,

  SEARCH_BOARD_PATH,

  SEARCH_LOCATION_PATH_VARIABLE,

  SEARCH_PATH,

  SEARCH_WORD_PATH_VARIABLE,

  UPDATE_PATH,
  USER_EMAIL_PATH_VARIABLE,
  WRITE_PATH,
} from "constant";
import Container from "layouts/Container";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useLocation } from "react-router-dom";
import Authentication from "views/Authentication";
import EventBoard from "views/EventBoard/Main";
import Main from "views/Main";
import NoticeBoardMain from "views/NoticeBoard/Main";
import NoticeBoardDetail from "views/NoticeBoard/Detail";
import NoticeBoardUpdate from "views/NoticeBoard/Update";
import NoticeBoardWrite from "views/NoticeBoard/Write";
import ReviewBoardList from "views/ReviewBoard/Main";
import "./App.css";
import AdvertisingBoardMain from "views/AdvertisingBoard/Main";
import Search from "views/Search/Main";
import { useUserStore } from "stores";
import { getSignInUserRequest } from "apis";
import GetUserResponseDto from "interfaces/response/admin/get-user.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { GetSignInUserResponseDto } from "interfaces/response/user";
import ReviewBoardDetail from "views/ReviewBoard/Detail";
import ReviewBoardWrite from "views/ReviewBoard/Write";
import AdvertisingBoardWrite from "views/AdvertisingBoard/Write";
import AdminMain from "views/Admin/Main";
import AdminGetShortReview from "views/Admin/GetShortReview";
import AdminGetUserList from "views/Admin/GetUser";
import AdminBanner from "views/Admin/Banner/Main";
import ReviewBoardUpdate from "views/ReviewBoard/Update";
import AdvertisingBoardDetail from "views/AdvertisingBoard/Detail";
import AdvertisingBoardSearchList from "views/Search/AdvertisingBoardSearch";
import ReviewBoardSearchList from "views/Search/ReviewBoardSearch";
import AdminBannerWrite from "views/Admin/Banner/Write";
import AdminGetUserDetail from "views/Admin/GetUserDetail";
import EventBoardDetail from "views/EventBoard/Detail";
import EventBoardWrite from "views/EventBoard/Write";
import EventBoardUpdate from "views/EventBoard/Update";
import AdminAdvertising from "views/Admin/GetAdvertisingBoard";
<<<<<<< HEAD
import AdvertisingBoardUpdate from "views/AdvertisingBoard/Update";
=======
import UserPage from "views/UserPage/Main";
import UserCommentPage from "views/UserPage/GetComment";
import UserShortReviewPage from "views/UserPage/GetShortReview";
>>>>>>> 8cb1faba860454ce2b429829f0e31bd2112c13c6

//          component: 메인 컴포넌트          //
function App() {
  //          state: path 상태          //
  const { pathname } = useLocation();
  //          state: user 상태          //
  const { user, setUser } = useUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: get sign in user response 처리 함수          //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if (code === 'NU') alert('존재하지 않는 유저입니다.');
    if (code === 'DE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;

    setUser({ ...responseBody as GetUserResponseDto });
  }

  //          effect: path가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      setUser(null);
      return;
    }
    getSignInUserRequest(accessToken).then(getSignInUserResponse);
  }, [pathname]);

  //          render: 메인 컴포넌트 렌더링          //
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH} element={<Main />} />
          
          <Route path={EVENT_BOARD_PATH}>
            <Route path={EVENT_BOARD_PATH} element={<EventBoard />} />
            <Route path={DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<EventBoardDetail />} />
            <Route path={WRITE_PATH} element={<EventBoardWrite />} />
            <Route path={UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<EventBoardUpdate />} />
          </Route>
          
          
          <Route path={SEARCH_PATH}>
            <Route path={SEARCH_BOARD_PATH(SEARCH_LOCATION_PATH_VARIABLE, SEARCH_WORD_PATH_VARIABLE)} element={<Search />} />
            <Route path={ADVERTISING_BOARD_SEARCH_LIST_PATH(SEARCH_LOCATION_PATH_VARIABLE, SEARCH_WORD_PATH_VARIABLE)} element={<AdvertisingBoardSearchList />} />
            <Route path={REVIEW_BOARD_SEARCH_LIST_PATH(SEARCH_LOCATION_PATH_VARIABLE, SEARCH_WORD_PATH_VARIABLE)} element={<ReviewBoardSearchList />} />
          </Route>

          <Route path={REVIEW_BOARD_PATH}>
            <Route path={REVIEW_BOARD_PATH} element={<ReviewBoardList />} />
            <Route path={REVIEW_BOARD_DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<ReviewBoardDetail />} />
            <Route path={WRITE_PATH} element={ <ReviewBoardWrite /> }/>
            <Route path={REVIEW_BOARD_UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<ReviewBoardUpdate />}/>
          </Route>

          <Route path={ADVERTISING_BOARD_PATH}>
            <Route path={ADVERTISING_BOARD_PATH} element={<AdvertisingBoardMain />} />
            <Route path={DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<AdvertisingBoardDetail />} />
            <Route path={WRITE_PATH} element={<AdvertisingBoardWrite />} />
            <Route path={UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={ <AdvertisingBoardUpdate /> }/>
          </Route>

          <Route path={NOTICE_BOARD_PATH}>
            <Route path={NOTICE_BOARD_PATH} element={<NoticeBoardMain />} />
            <Route path={DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<NoticeBoardDetail />} />
            <Route path={WRITE_PATH} element={ <NoticeBoardWrite /> }/>
            <Route path={UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={ <NoticeBoardUpdate /> }/>
          </Route>

          <Route path={ADMIN_PATH}>
            <Route path={ADMIN_PATH} element={<AdminMain />} />
            <Route path={ADMIN_GET_ADVERTISING_BOARD_LIST_PATH()} element={<AdminAdvertising />} />
            <Route path={ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH()} element={<AdminGetShortReview />} />
            <Route path={ADMIN_GET_USER_LIST_PATH()} element={<AdminGetUserList />} />
            <Route path={ADMIN_USER_DETAIL_PATH(ADMIN_ID_PATH_VARIABLE, USER_EMAIL_PATH_VARIABLE)} element = {<AdminGetUserDetail />} />
            <Route path={ADMIN_BANNER_PATH()} element={<AdminBanner />} />
            <Route path={ADMIN_BANNER_WRITE_PATH()} element={<AdminBannerWrite />} />
          </Route>

          <Route path={MY_PAGE_PATH(USER_EMAIL_PATH_VARIABLE)}>
            <Route path={MY_PAGE_PATH(USER_EMAIL_PATH_VARIABLE)} element={ <UserPage /> }/>
            <Route path={MY_PAGE_COMMENT_PATH(USER_EMAIL_PATH_VARIABLE)} element={ <UserCommentPage /> } />
            <Route path={MY_PAGE_SHORT_REVIEW_PATH(USER_EMAIL_PATH_VARIABLE)} element={ <UserShortReviewPage /> } />
          </Route>

          <Route path={AUTH_PATH} element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
