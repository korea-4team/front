import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from 'views/Main';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import { Route, Routes } from 'react-router-dom';
import { EVENT_BOARD_PATH, MAIN_PATH, REVIEW_BOARD_PATH } from 'constant';
import ReviewBoardList from 'views/ReviewBoard/Main';
import EventBoard from 'views/EventBoard/Main';

function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path={MAIN_PATH} element={<Main />} />
          <Route path={REVIEW_BOARD_PATH} element={<ReviewBoardList />} />
          <Route path={EVENT_BOARD_PATH} element={<EventBoard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
