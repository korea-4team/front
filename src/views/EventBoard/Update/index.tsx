import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import ResponseDto from 'interfaces/response/response.dto';
import { getEventBoardRequest, patchEventBoardRequest, uploadFileRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { GetEventBoardResponseDto } from 'interfaces/response/EventBoard';
import { EVENT_BOARD_DETAIL_PATH, EVENT_BOARD_PATH } from 'constant';
import { PatchEventBoardRequestDto } from 'interfaces/request/EventBoard';

//          component : 공지사항 수정           //
export default function EventBoardUpdate() {

  //          state         //
  // description : textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // description : file input 요소에 대한 참조 상태 //
  const fileInputRef = useRef<HTMLInputElement>(null);
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();
  // description : 게시물 번호 상태 //
  const { boardNumber } = useParams();
  // description : 게시물 번호를 저장할 상태 //
  const [ eventBoardNumber, setEventBoardNumber ] = useState<string>('');
  // description : 게시물 제목을 저장할 상태 //
  const [eventBoardTitle, setEventBoardTitle]  = useState<string>('');
  // description : 게시물 내용을 저장할 상태 //
  const [eventBoardContent, setEventBoardContent] = useState<string>('');
  // description : 게시물 이미지를 저장할 상태 //
  const [eventBoardImage, setEventBoardImage] = useState<File | null>(null);
  // description : 게시물 이미지 URL을 저장할 상태 //
  const [eventBoardImageUrl, setEventBoardImageUrl] = useState<string>('');

  // description : 게시물 초기화 상태 //

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 파일 업로드 함수 //
  const fileUpload = async () => {
    if (eventBoardImage === null) return null;

    const data = new FormData();
    data.append("file", eventBoardImage);

    const imageUrl = await uploadFileRequest(data);

    return imageUrl;
  }

  //  description : 게시물 불러오기 응답 처리 함수 //
  const getEventBoardResponseHandler = (responseBody: GetEventBoardResponseDto | ResponseDto) => {
    const { code } = responseBody;

    if (code === "NA") return alert("관리자가 아닙니다.");
    if (code === "NB") return alert("존재하지 않는 게시물입니다.")
    if (code === "VF") return alert("잘못된 게시물 번호입니다.")
    if (code === "DE") return alert('데이터베이스 에러입니다.');
    if (code !== "SU") {
      navigator(EVENT_BOARD_PATH);
      return;
    }
    
    const { title, contents, imageUrl } = responseBody as GetEventBoardResponseDto;
    setEventBoardTitle(title);
    setEventBoardContent(contents);
    setEventBoardImageUrl(imageUrl);
  }

  // description : 게시물 수정 요청 함수 //
  const patchEventBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자가 아닙니다.");
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code === "VF") alert("잘못된 게시물 번호입니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") {
      navigator(-1);
      return;
    }

    if (!boardNumber) return;
    navigator(EVENT_BOARD_DETAIL_PATH(boardNumber));
    
  }

  //          event handler         //
  // description : 뒤로가기 버튼 //
  const onBackButtonClickHandler = () => {
    navigator(EVENT_BOARD_PATH);
  }

  // description : 제목이 바뀔 시 실행 될 이벤트 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEventBoardTitle(event.target.value);
  };

  // description : 본문 내용이 바뀔 시 text area 높이 변경 이벤트 //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEventBoardContent(event.target.value);

    if(!textAreaRef.current) return;

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  // description : 이미지 변경 시 이미지 미리보기 //
  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.isDefaultNamespace.length) return;

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
    if(!fileInputRef.current) return;

    fileInputRef.current.value = "";
    setEventBoardImageUrl("");
  }
  
  // description : 수정 버튼 클릭 이벤트 //
  const onUpdateButtonClickHandler = async () => {
    const token = cookies.accessToken;

    if (!boardNumber) return;

    const imageUrl = eventBoardImage ? await fileUpload() : eventBoardImageUrl;

    const data: PatchEventBoardRequestDto = {
      title: eventBoardTitle,
      contents: eventBoardContent,
      imageUrl,
    }
    patchEventBoardRequest(boardNumber, data, token).then(patchEventBoardResponseHandler);

  }
  //          effect          //
  useEffect(() => {
    if (!boardNumber) {
      alert("게시물 번호가 잘못되었습니다.");
      navigator(EVENT_BOARD_PATH);
      return;
    }

    setEventBoardNumber(boardNumber);
    getEventBoardRequest(boardNumber).then(getEventBoardResponseHandler);
    
  }, [boardNumber])

  //          render          //
  return (
    <div className="event-board-update-item-list">
      <div className='event-board-update-item'>
        <div className="event-board-update-title-container">
          <input className='event-board-update-title-input' type='text' placeholder='제목을 작성해주세요.' onChange={onTitleChangeHandler} value={eventBoardTitle}/>
        </div>
        <div className='divider'></div>
        <div className='event-board-update-content-container'>
          <div className='event-board-update-content-input-box'>
            <textarea ref={ textAreaRef } className='event-board-update-content-textarea' placeholder='내용을 작성해주세요.' onChange={onContentChangeHandler} value={eventBoardContent}></textarea>
          </div>
          <div className='event-board-update-content-button-box'>
            <div className='image-upload-button' onClick={onImageUploadButtonClickHandler}>
              <div className='image-upload-icon'></div>
              <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
            </div>
          </div>
        </div>
        {eventBoardImageUrl && (
          <div className="event-board-update-image-box">
           <div className='event-board-update-image-container'>
              <img className="event-board-update-image" src={eventBoardImageUrl}/>
              <div className='event-board-update-image-delete-button' onClick={onImageCloseButtonClickHandler}>
                <div className='image-close-button'></div>
              </div>
            </div>
          </div>
        )}
          
      </div>
      <div className="back-button">
        <div className='black-button' onClick={onUpdateButtonClickHandler}> 수정 </div>
        <div className="black-button" onClick={onBackButtonClickHandler}> 목록 </div>
      </div>
    </div>
  )
}
