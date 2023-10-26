import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useNavigate } from 'react-router';
import { Cookies, useCookies } from 'react-cookie';
import { postEventBoardRequest, uploadFileRequest } from 'apis';
import { useUserStore } from 'stores';
import { EVENT_BOARD_PATH } from 'constant';
import { PostEventBoardRequestDto } from 'interfaces/request/EventBoard';

//          component : 공지사항 작성하기         //
export default function EventBoardWrite() {
  //          state         //
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();
  const { user, setUser } = useUserStore();
  // description : textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // description : file input 요소에 대한 참조 상태 //
  const fileInputRef = useRef<HTMLInputElement>(null);
  // description : 게시물 정보를 저장할 상태 //
  const [eventBoardImage, setEventBoardImage] = useState<File | null>();
  const [eventBoardTitle, setEventBoardTitle] = useState<string>('');
  const [eventBoardContents, setEventBoardContents] = useState<string>('');
  //  description : 이미지를 저장할 상태 //
  const [ evnetBoardImageUrl, setEventBoardImageUrl ] = useState<string>('');

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 파일 업로드 함수 //
  const fileUpload = async () => {
    if (!eventBoardImage) return null;

    const data = new FormData();
    data.append("file", eventBoardImage);

    const imageUrl = await uploadFileRequest(data);

    return imageUrl;
  }
  
  // description : 게시물 작성 요청 함수 //
  const postEventBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자 아이디가 아닙니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

    if(!user) return;
    navigator(EVENT_BOARD_PATH);

  }

  //        event handler         //
  // description : 제목이 바뀔 시 실행 될 이벤트 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEventBoardTitle(event.target.value);
  }

  // description : 본문 내용이 바뀔 시 text area 높이 변경 이벤트 //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEventBoardContents(event.target.value);
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  // description : 이미지 변경 시 이미지 미리보기 //
  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setEventBoardImageUrl(imageUrl);
    setEventBoardImage(event.target.files[0]);
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
    setEventBoardImageUrl('');
  }

  // description : 목록으로 가기 버튼 클릭 이벤트 //
  const onBackButtonClickHandler = () => {
    navigator(EVENT_BOARD_PATH);
  };

  // description : 작성 버튼 클릭 이벤트 //
  const onUploadButtonClickHandler = async () => {
    const token = cookies.accessToken;
    const imageUrl = await fileUpload();
    const data: PostEventBoardRequestDto = {
      title: eventBoardTitle,
      contents: eventBoardContents,
      imageUrl
    }
    postEventBoardRequest(data, token).then(postEventBoardResponseHandler);

    navigator(EVENT_BOARD_PATH);
  }

  //          effect          //
  

  //          render          //
  return (
    <div className="event-board-write-item-list">
      <div className='event-board-write-item'>
        <div className="event-board-write-title-container">
          <input className='event-board-writer-title-input' type='text' placeholder='제목을 작성해주세요.' onChange={onTitleChangeHandler} value={eventBoardTitle}/>
        </div>
        <div className='divider'></div>
        <div className='event-board-write-content-container'>
          <div className='event-board-write-content-input-box'>
            <textarea ref={ textAreaRef } className='event-board-write-content-textarea' placeholder='내용을 작성해주세요.' onChange={onContentChangeHandler} value={eventBoardContents}></textarea>
          </div>
          <div className='event-board-write-content-button-box'>
            <div className='image-upload-button' onClick={onImageUploadButtonClickHandler}>
              <div className='image-upload-icon'></div>
              <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
            </div>
          </div>
        </div>
        {evnetBoardImageUrl && (
          <div className="event-board-write-image-box">
            <div className='event-board-write-image'>
              <img className="event-board-write-image" src={evnetBoardImageUrl} />
              <div className='event-board-write-image-delete-button' onClick={onImageCloseButtonClickHandler}>
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
