import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { NOTICE_BOARD_DEATIL_PATH, NOTICE_BOARD_PATH } from 'constant';
import { GetNoticeBoardResponseDto } from 'interfaces/response/noticeBoard';
import ResponseDto from 'interfaces/response/response.dto';
import { getNoticeBoardRequest, patchNoticeBoardRequest, uploadFileRequest } from 'apis';
import { useNoticeBoardWriteStore } from 'stores';
import { useCookies } from 'react-cookie';
import { PatchNoticeBoardRequestDto } from 'interfaces/request/noticeBoard';

//          component : 공지사항 수정           //
export default function NoticeBoardUpdate() {

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
  const [ noticeBoardNumber, setNoticeBoardNumber ] = useState<string>('');
  // description : 게시물 제목을 저장할 상태 //
  const [noticeBoardTitle, setNoticeBoardTitle]  = useState<string>('');

  // description : 게시물 내용을 저장할 상태 //
  const [noticeBoardContent, setNoticeBoardContent] = useState<string>('');

  // description : 게시물 이미지를 저장할 상태 //
  const [noticeBoardImage, setNoticeBoardImage] = useState<File | null>(null);

  // description : 게시물 이미지 URL을 저장할 상태 //
  const [noticeBoardImageUrl, setNoticeBoardImageUrl] = useState<string>('');

  // description : 게시물 초기화 상태 //
  const { resetNoticeBoard } = useNoticeBoardWriteStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 파일 업로드 함수 //
  const fileUpload = async () => {
    if (noticeBoardImage === null) return null;

    const data = new FormData();
    data.append("file", noticeBoardImage);

    const imageUrl = await uploadFileRequest(data);

    return imageUrl;
  }

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

  // description : 게시물 수정 요청 함수 //
  const patchNoticeBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자가 아닙니다.");
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code === "VF") alert("잘못된 게시물 번호입니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") {
      navigator(-1);
      return;
    }

    resetNoticeBoard();

    if (!boardNumber) return;
    navigator(NOTICE_BOARD_DEATIL_PATH(boardNumber));
    
  }

  //          event handler         //
  // description : 뒤로가기 버튼 //
  const onBackButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  }

  // description : 제목이 바뀔 시 실행 될 이벤트 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNoticeBoardTitle(event.target.value);
  };

  // description : 본문 내용이 바뀔 시 text area 높이 변경 이벤트 //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoticeBoardContent(event.target.value);

    if(!textAreaRef.current) return;

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  // description : 이미지 변경 시 이미지 미리보기 //
  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.isDefaultNamespace.length) return;

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
    if(!fileInputRef.current) return;

    fileInputRef.current.value = "";
    setNoticeBoardImageUrl("");
  }
  
  // description : 수정 버튼 클릭 이벤트 //
  const onUpdateButtonClickHandler = async () => {
    const token = cookies.accessToken;

    if (!boardNumber) return;

    const imageUrl = noticeBoardImage ? await fileUpload() : noticeBoardImageUrl;

    const data: PatchNoticeBoardRequestDto = {
      title: noticeBoardTitle,
      contents: noticeBoardContent,
      imageUrl,
    }
    patchNoticeBoardRequest(boardNumber, data, token).then(patchNoticeBoardResponseHandler);

  }
  //          effect          //
  useEffect(() => {
    if (!boardNumber) {
      alert("게시물 번호가 잘못되었습니다.");
      navigator(NOTICE_BOARD_PATH);
      return;
    }

    setNoticeBoardNumber(boardNumber);
    getNoticeBoardRequest(boardNumber).then(getNoticeBoardResponseHandler);
    
  }, [boardNumber])

  //          render          //
  return (
    <div className="notice-board-update-item-list">
      <div className='notice-board-update-item'>
        <div className="notice-board-update-title-container">
          <input className='notice-board-update-title-input' type='text' placeholder='제목을 작성해주세요.' onChange={onTitleChangeHandler} value={noticeBoardTitle}/>
        </div>
        <div className='divider'></div>
        <div className='notice-board-update-content-container'>
          <div className='notice-board-update-content-input-box'>
            <textarea ref={ textAreaRef } className='notice-board-update-content-textarea' placeholder='내용을 작성해주세요.' onChange={onContentChangeHandler} value={noticeBoardContent}></textarea>
          </div>
          <div className='notice-board-update-content-button-box'>
            <div className='image-upload-button' onClick={onImageUploadButtonClickHandler}>
              <div className='image-upload-icon'></div>
              <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
            </div>
          </div>
        </div>
        {noticeBoardImageUrl && (
          <div className="notice-board-update-image-box">
           <div className='notice-board-update-image'>
              <img className="notice-board-update-image" src={noticeBoardImageUrl}/>
              <div className='notice-board-update-image-delete-button' onClick={onImageCloseButtonClickHandler}>
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
