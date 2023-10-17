import React, { useRef } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { NOTICE_BOARD_PATH } from 'constant';

//          component : 공지사항 작성하기         //
export default function NoticeBoardWrite() {
  //          state         //
  // description : textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //        event handler         //
  // description : 목록으로 가기 버튼 클릭 핸들러 //
  const onBackButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  };

  //          effect          //

  //          render          //
  return (
    <div className="notice-board-write-item-list">
        <div className="notice-board-write-title-container">
          <input className='notice-board-writer-title-input' type='text' placeholder='제목을 입력하세요'/>
        </div>
        <div className='divider'></div>
        <div className='notice-board-write-content-container'>
          <div className='notice-board-write-content-input-box'>
            <textarea ref={ textAreaRef } className='notice-board-write-content-textarea' placeholder='내용을 입력하세요.'></textarea>
          </div>
        </div>
        <div className="notice-board-write-image-box">
          <img className="notice-board-write-image" /> 이미지 입력란
        </div>


      <div className="back-button">
        <div className="black-button" onClick={onBackButtonClickHandler}> 목록 </div>
      </div>
    </div>
  )
}
