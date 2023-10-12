import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from 'views/Main';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import NoticeBoardListItem from 'components/NoticeBoardListItem';

function App() {
  return (
    <>
      <Header />
      <Main />
      <NoticeBoardListItem />
      <Footer />
    </>
  );
}

export default App;
