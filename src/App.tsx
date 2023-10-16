import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from 'views/Main';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import ReviewBoardListItem from 'components/ReviewBoardListItem';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATH, EVENT_BOARD_PATH, MAIN_PATH, REVIEW_BOARD_PATH } from 'constant';
import ReviewBoard from 'views/ReviewBoard/Main';
import ReviewBoardList from 'views/ReviewBoard/Main';
import EventBoard from 'views/EventBoard/Main';
import EventBoardListItem from 'components/EventBoardListItem';
import Authentication from 'views/Authentication';
import Container from 'layouts/Container';

function App() {
  return (
    <>
      {/* <EventBoardListItem /> */}
      <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={REVIEW_BOARD_PATH} element={<ReviewBoardList />} />
        <Route path={EVENT_BOARD_PATH} element={<EventBoard />} />
        <Route path={AUTH_PATH} element={<Authentication />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
