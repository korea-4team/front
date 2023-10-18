import React, { ChangeEvent, useRef, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { NOTICE_BOARD_PATH } from 'constant';
import { useNoticeBoardWriteStore } from 'stores';
import { Cookies, useCookies } from 'react-cookie';
import { PostNoticeBoardRequestDto } from 'interfaces/request/noticeBoard';
import { postNoticeBoardRequest, uploadFileRequest } from 'apis';

//          component : 공지사항 작성하기         //
export default function NoticeBoardWrite() {
  //          state         //
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // description : textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // description : file input 요소에 대한 참조 상태 //
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // description : 게시물 정보를 저장할 상태 //
  const { noticeBoardTitle, noticeBoardContent, noticeBoardImage, setNoticeBoardTitle, setNoticeBoardContent, setNoticeBoardImage, resetNoticeBoard } = useNoticeBoardWriteStore();

  //  description : 이미지를 저장할 상태 //
  const [ noticeBoardImageUrl, setNoticeBoardImageUrl ] = useState<string>('');

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 파일 업로드 함수 //
  const fileUpload = async () => {
    if (noticeBoardImage === null) return null;

    const data = new FormData();  // 이미지 생성을 위한 폼데이터 객체 생성
    data.append("file", noticeBoardImage);

    const imageUrl = await uploadFileRequest(data);

    return imageUrl;
  }
  
  // description : 게시물 작성 요청 함수 //
  const postNoticeBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자 아이디가 아닙니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

    resetNoticeBoard();

  }

  //        event handler         //
  // description : 제목이 바뀔 시 실행 될 이벤트 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNoticeBoardTitle(event.target.value);
  }

  // description : 본문 내용이 바뀔 시 text area 높이 변경 이벤트 //
  const onContentChandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeBoardContent(event.target.value);

    if (!textAreaRef.current) return;

    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  // description : 이미지 변경 시 이미지 미리보기 //
  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const imageUrl = URL.createObjectURL(event.target.files[0]);

    setNoticeBoardImageUrl(imageUrl);
    setNoticeBoardImage(event.target.files[0]);
  }

  // description : 이미지 업로드 버튼 클릭 이벤트 //
  const onImageUploadButtonClickHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  // description : 이미지 닫기 버튼 클릭 이벤트 //
  const onImageCloseButtonClickHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = '';
    setNoticeBoardImageUrl('');
  }

  // description : 목록으로 가기 버튼 클릭 이벤트 //
  const onBackButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  };

  // description : 작성 버튼 클릭 이벤트 //
  const onUploadButtonClickHandler = async () => {
    const token = cookies.accessToken;

    const imageUrl = await fileUpload();

    const data: PostNoticeBoardRequestDto = {
      title: noticeBoardTitle,
      contents: noticeBoardContent,
      imageUrl,
    }
    postNoticeBoardRequest(data, token).then(postNoticeBoardResponseHandler);

    navigator(NOTICE_BOARD_PATH);
  }

  //          effect          //

  //          render          //
  return (
    <div className="notice-board-write-item-list">
      <div className='notice-board-write-item'>
        <div className="notice-board-write-title-container">
          <input className='notice-board-writer-title-input' type='text' placeholder='제목을 작성해주세요.' onChange={onTitleChangeHandler} value={noticeBoardTitle}/>
        </div>
        <div className='divider'></div>
        <div className='notice-board-write-content-container'>
          <div className='notice-board-write-content-input-box'>
            <textarea ref={ textAreaRef } className='notice-board-write-content-textarea' placeholder='내용을 작성해주세요.' onChange={onContentChandler} value={noticeBoardContent}></textarea>
          </div>
          <div className='notice-board-write-content-button-box'>
            <div className='image-upload-button' onClick={onImageUploadButtonClickHandler}>
              <div className='image-upload-icon'></div>
              <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
            </div>
          </div>
        </div>
        {noticeBoardImageUrl && (
          <div className="notice-board-write-image-box">
            <div className='notice-board-write-image'>
              <img className="notice-board-write-image" src={noticeBoardImageUrl} />
              <div className='notice-board-write-image-delete-button' onClick={onImageCloseButtonClickHandler}>
                <div className='image-close-button'></div>
              </div>
            </div>
        </div>
        )}
      </div>
      <div className="back-button">
        <div className='black-button' onClick={onUploadButtonClickHandler}> 작성 </div>
        <div className="black-button" onClick={onBackButtonClickHandler}> 목록 </div>
      </div>
    </div>
  )
}
