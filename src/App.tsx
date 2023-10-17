import {
  AUTH_PATH,
  EVENT_BOARD_PATH,
  MAIN_PATH,
  NOTICE_BOARD_PATH,
  REVIEW_BOARD_PATH,
} from "constant";
import Container from "layouts/Container";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useLocation } from "react-router-dom";
import Authentication from "views/Authentication";
import EventBoard from "views/EventBoard/Main";
import Main from "views/Main";
import NoticeBoard from "views/NoticeBoard/Main";
import ReviewBoardList from "views/ReviewBoard/Main";
import "./App.css";

//          component: 메인 컴포넌트          //
function App() {
  //          state: path 상태          //
  const { pathname } = useLocation();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  //          effect: path가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    // TODO: accessToken이 존재하지 않으면 user 정보 초기화
    if (!accessToken) return;
    // TODO: accessToken이 존재하면서 user가 존재하지 않으면 user 정보 저장
  }, [pathname]);

  //          render: 메인 컴포넌트 렌더링          //
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH} element={<Main />} />
          <Route path={REVIEW_BOARD_PATH} element={<ReviewBoardList />} />
          <Route path={EVENT_BOARD_PATH} element={<EventBoard />} />
          <Route path={NOTICE_BOARD_PATH} element={<NoticeBoard />} />
          <Route path={AUTH_PATH} element={<Authentication />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
