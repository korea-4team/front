import { useCookies } from 'react-cookie';
import './style.css';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADVERTISING_BOARD_PATH } from 'constant';
import { PostAdvertisingBoardDto } from 'interfaces/request/advertisingBoard';
import { postAdvertisingBoardRequest } from 'apis';

export default function AdvertisingBoardWrite(){

  // state //

  // description //
  const[cookies,setCooke] = useCookies();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const[advertisingBoardBusinessType,setAdvertisingBoardBusinessType] = useState<string>('');
  const[advertisingBoardTitle, setAdvertisingBoardTitle] = useState<string>('');
  const[advertisingBoardImageUrl,setAdvertisingBoardImageUrl] = useState<string | null>('');
  const[advertisingBoardContent, setAdvertisingBoardContent] = useState<string>('');
  const[advertisingBoardImage, setAdvertisingBoardImage] = useState<File | null>();
  const[advertisingBoardLocation, setAdvertisingBoardLocation] = useState<string>('');



  const navigator = useNavigate();


  const fileUpload = async() => {
    if (!advertisingBoardImage) return;

    const data = new FormData();
    data.append("file", advertisingBoardImage);
  }

  const postAdvertisingBoardResponseHandler = (code : string) => {
    if (code === "NA") alert("자영업자 아이디가 아닙니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

  }


  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAdvertisingBoardTitle(event.target.value);
  }

  const onContenthandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAdvertisingBoardContent(event.target.value);

    if (!textAreaRef.current) return;

    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }

  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const imageUrl = URL.createObjectURL(event.target.files[0]);

    setAdvertisingBoardImageUrl(imageUrl);
    setAdvertisingBoardImage(event.target.files[0]);
  }


  const onImageUploadButtonClickHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }


  const onImageCloseButtonClickHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = '';
    setAdvertisingBoardImageUrl('');
  }

  const onBackButtonClickHandler =() => {
    navigator(ADVERTISING_BOARD_PATH);
  };

  const onUploadButtonClickHandler = async () => {
    const token = cookies.accessToken;

    const imageUrl = await fileUpload();

    const data: PostAdvertisingBoardDto = {
      title: advertisingBoardTitle,
      contents: advertisingBoardContent,
      location: advertisingBoardLocation,
      businessType: advertisingBoardBusinessType,
      imageUrl : advertisingBoardImageUrl
    }
    postAdvertisingBoardRequest(data,token).then(postAdvertisingBoardResponseHandler);

    navigator(ADVERTISING_BOARD_PATH);
  }

  return(
    <div className='advertising-board-write-item-list'>
      <div className='advertising-board-write-item'>
        <div className='advertising-board-write-title-container'>
          <input className='advertising-board-writer-title-input' type='text' placeholder='제목을 작성해주세요' onChange={onTitleChangeHandler} value={advertisingBoardTitle}/>
        </div>
        <div className='divider'></div>
        <div className='advertising-board-write-content-container'>
          <div className='advertising-board-write-content-input-box'>
            <textarea ref ={textAreaRef} className='advertising-board-write-content-textarea' placeholder='내용을 작성해주세요' onChange={onContenthandler} value={advertisingBoardContent}></textarea>
        </div>
        <div className='advertising-board-write-content-button-box'>
          <div className='image-upload-icon' onClick={onImageUploadButtonClickHandler}></div>
          <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
        </div>
      </div>
    </div>
    {advertisingBoardImageUrl && (
      <div className='advertising-board-write-image-box'>
        <div className='advertising-board-write-image'>
          <img className='advertising-board-write-image' src={advertisingBoardImageUrl} />
          <div className='advertising-board-write-image-delete-button' onClick={onImageCloseButtonClickHandler}>
            <div className='image-close-button'></div>       
        </div>
      </div>
    </div>
    )}
    <div className='back-button'>
      <div className='black-button' onClick={onUploadButtonClickHandler}>작성</div>
      <div className='black-button' onClick={onBackButtonClickHandler}>목록</div>
    </div>
    
    </div>
    
    
  )
}