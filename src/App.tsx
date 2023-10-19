import {
  ADVERTISING_BOARD_PATH,
  ADVERTISING_BOARD_SEARCH_LIST_PATH,
  AUTH_PATH,
  BOARD_NUMBER_PATH_VARIABLE,
  DETAIL_PATH,
  EVENT_BOARD_PATH,
  MAIN_PATH,
  NOTICE_BOARD_PATH,
  REVIEW_BOARD_DETAIL_PATH,
  REVIEW_BOARD_PATH,

  SEARCH_PATH,

  SEARCH_WORD_PATH_VARIABLE,

  UPDATE_PATH,
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
import AdvertisingBoardSearchList from "views/Search/AdvertisingBoardSearch";
import ReviewBoardDetail from "views/ReviewBoard/Detail";

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
          
          <Route path={EVENT_BOARD_PATH} element={<EventBoard />} />
          <Route path={ADVERTISING_BOARD_PATH} element={<AdvertisingBoardMain />} />
          
          <Route path={SEARCH_PATH(SEARCH_WORD_PATH_VARIABLE)}>
            <Route path={SEARCH_PATH(SEARCH_WORD_PATH_VARIABLE)} element={<Search />} />
            <Route path={ADVERTISING_BOARD_SEARCH_LIST_PATH(SEARCH_WORD_PATH_VARIABLE)} element={<AdvertisingBoardSearchList />} />
          </Route>

          <Route path={REVIEW_BOARD_PATH}>
            <Route path={REVIEW_BOARD_PATH} element={<ReviewBoardList />} />
            <Route path={REVIEW_BOARD_DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<ReviewBoardDetail />} />
          </Route>


          <Route path={NOTICE_BOARD_PATH}>
            <Route path={NOTICE_BOARD_PATH} element={<NoticeBoardMain />} />
            <Route path={DETAIL_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={<NoticeBoardDetail />} />
            <Route path={WRITE_PATH} element={ <NoticeBoardWrite /> }/>
            <Route path={UPDATE_PATH(BOARD_NUMBER_PATH_VARIABLE)} element={ <NoticeBoardUpdate /> }/>
          </Route>

          <Route path={AUTH_PATH} element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
