import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from 'views/Main';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import ReviewBoardListItem from 'components/ReviewBoardListItem';
import { Route, Routes } from 'react-router-dom';
import { MAIN_PATH, REVIEW_BOARD_PATH } from 'constant';
import ReviewBoard from 'views/ReviewBoard/Main';

function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path={MAIN_PATH} element={<Main />} />
          <Route path={REVIEW_BOARD_PATH} element={<ReviewBoard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
