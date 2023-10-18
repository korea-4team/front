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

  const{advertisingBoardTitle, advertisingContent, advertisingBoardImage, advertisingBoardLocation,advertisingBoardBusinessType,setAdvertisingBoardTitle,setAdvertisingBoardContent, setAdvertisingBoardImage, setAdvertisingBoardLocation,setAdvertisingBoardBusinessType,resetAdvertisingBoard} = useAdvertisingWriteStore();

  const[ advertisingBoardImageUrl,setAdvertisingBoardImageUrl] = useState<string>('');

  const navigator = useNavigate();


  const fileUpload = async() => {
    if (advertisingBoardImage === null) return null;

    const data = new FormData();
    data.append("file", advertisingBoardImage);
  }

  const postAdvertisingBoardResponseHandler = (code : string) => {
    if (code === "NA") alert("자영업자 아이디가 아닙니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

    resetAdvertisingBoard();
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
      contents: advertisingContent,
      location: advertisingBoardLocation,
      businessType: advertisingBoardBusinessType,
      imageUrl,
    }
    postAdvertisingBoardRequest(data,token).then(postAdvertisingBoardResponseHandler);
  }

  return(
    <div></div>
  )



}