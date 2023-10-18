import React, { useRef, useState } from 'react'

import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { NOTICE_BOARD_PATH } from 'constant';
import { GetNoticeBoardResponseDto } from 'interfaces/response/noticeBoard';
import ResponseDto from 'interfaces/response/response.dto';

//          component : 공지사항 수정           //
export default function NoticeBoardUpdate() {

  //          state         //
  // description : textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // description : file input 요소에 대한 참조 상태 //
  const fileInputRef = useRef<HTMLInputElement>(null);

  // description : 게시물 번호 상태 //
  const { boardNumber } = useParams();

  // description : 게시물 제목을 저장할 상태 //
  const [noticeBoardTitle, setNoticeBoardTitle]  = useState<string>('');

  // description : 게시물 내용을 저장할 상태 //
  const [noticeBoardContent, setNoticeBoardContent] = useState<string>('');

  // description : 게시물 이미지를 저장할 상태 //
  const [noticeBoardImage, setNoticeBoardImage] = useState<File>();

  // description : 게시물 이미지 URL을 저장할 상태 //
  const [noticeBoardImageUrl, setNoticeBoardImageUrl] = useState<string>('');
  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //  description : 게시물 불러오기 응답 처리 함수 //
  const getNoticeBoardResponseHandler = (responseBody: GetNoticeBoardResponseDto | ResponseDto) => {
    const { code } = responseBody;

    if (code === "NA") return alert("관리자가 아닙니다.");
    if (code === "NB") return alert("존재하지 않는 게시물입니다.")
    if (code === "VF") return alert("잘못된 게시물 번호입니다.")
    if (code === "DE") return alert('데이터베이스 에러입니다.');
    if (code !== "SU") {
      navigator(NOTICE_BOARD_PATH);
      return;
    }
    const { title, contents, imageUrl } = responseBody as GetNoticeBoardResponseDto;
    setNoticeBoardTitle(title);
    setNoticeBoardContent(contents);
    setNoticeBoardImageUrl(imageUrl);
  }

  //          event handler         //
  // description : 뒤로가기 버튼 //
  const onBackButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  }

  // description : 제목이 바뀔 시 실행 될 이벤트 //
  //          effect          //

  //          render          //
  return (
    <div className="notice-board-update-item-list">
      <div className='notice-board-update-item'>
        <div className="notice-board-update-title-container">
          <input className='notice-board-update-title-input' type='text' placeholder='제목을 작성해주세요.'/>
        </div>
        <div className='divider'></div>
        <div className='notice-board-update-content-container'>
          <div className='notice-board-update-content-input-box'>
            <textarea ref={ textAreaRef } className='notice-board-update-content-textarea' placeholder='내용을 작성해주세요.'></textarea>
          </div>
          <div className='notice-board-update-content-button-box'>
            <div className='image-upload-button'>
              <div className='image-upload-icon'></div>
              <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}}/>
            </div>
          </div>
        </div>
          <div className="notice-board-update-image-box">
            <div className='notice-board-update-image'>
              <img className="notice-board-update-image" />
              <div className='notice-board-update-image-delete-button'>
                <div className='image-close-button'></div>
              </div>
            </div>
        </div>
      </div>
      <div className="back-button">
        <div className='black-button' > 수정 </div>
        <div className="black-button" onClick={onBackButtonClickHandler}> 목록 </div>
      </div>
    </div>
  )
}
