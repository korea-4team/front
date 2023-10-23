import { useCookies } from 'react-cookie';
import './style.css';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADVERTISING_BOARD_PATH } from 'constant';
import { PostAdvertisingBoardDto } from 'interfaces/request/advertisingBoard';
import { postAdvertisingBoardRequest, uploadFileRequest } from 'apis';
import { useUserStore } from 'stores';

export default function AdvertisingBoardWrite(){

  // state //

  // description //
  const[cookies,setCooke] = useCookies();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefmiri = useRef<HTMLInputElement>(null);

  const[advertisingBoardBusinessType,setAdvertisingBoardBusinessType] = useState<string>('');
  const[advertisingBoardTitle, setAdvertisingBoardTitle] = useState<string>('');
  const[advertisingBoardImageUrls,setAdvertisingBoardImageUrls] = useState<string[]>([]);
  const[advertisingBoardImagemiriUrls,setAdvertisingBoardImagemiriUrls] = useState<string[]>([]);
  const[advertisingBoardContent, setAdvertisingBoardContent] = useState<string>('');
  const[advertisingBoardImages, setAdvertisingBoardImages] = useState<File[]>([]);
  const[advertisingBoardImagesmiri, setAdvertisingBoardImagesmiri] = useState<File[]>([]);
  const[advertisingBoardLocation, setAdvertisingBoardLocation] = useState<string>('');
  const[showMore, setShowMore] = useState<boolean>(false);
  const {user, setUser} = useUserStore();
  const [locationShowMore, setLocationShowMore] = useState<boolean>(false);
  const [businessTypeShowMore,setBusinessTypeShowMore] = useState<boolean>(false);



  const navigator = useNavigate();


  const fileUpload = async() => {
    if (!advertisingBoardImages.length) return [];

    const imageUrls = [];

    for (const file of advertisingBoardImages) {
      const data = new FormData();
      data.append("file", file);
  
      const imageUrl = await uploadFileRequest(data);
      if (!imageUrl) continue;
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  }

  const postAdvertisingBoardResponseHandler = (code : string) => {
    if (code === "NA") alert("자영업자 아이디가 아닙니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

    if(!user) return;
    navigator(ADVERTISING_BOARD_PATH);

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

    const newImageUrls = advertisingBoardImageUrls.map(item => item);
    newImageUrls.push(imageUrl);
    setAdvertisingBoardImageUrls(newImageUrls);

    const newIamges = advertisingBoardImages.map(item => item);
    newIamges.push(event.target.files[0]);
    setAdvertisingBoardImages(newIamges);
  }

  const onImageInputChangeHandlermiri = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const imageUrl = URL.createObjectURL(event.target.files[0]);

    const newImageUrls = advertisingBoardImagemiriUrls.map(item => item);
    newImageUrls.push(imageUrl);
    setAdvertisingBoardImagemiriUrls(newImageUrls);

    const newIamges = advertisingBoardImagesmiri.map(item => item);
    newIamges.push(event.target.files[0]);
    setAdvertisingBoardImagesmiri(newIamges);
  }


  const onImageUploadButtonClickHandler = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  const onImageUploadButtonClickHandlermiri = () => {
    if (!fileInputRefmiri.current) return;

    fileInputRefmiri.current.click();
  }




  const onImageCloseButtonClickHandler = (index: number) => {
    if (!fileInputRef.current) return;

    fileInputRef.current.value = '';

    const newAdvertisingBoardImageUrls = advertisingBoardImageUrls.filter((item, itenIndex) => index !== itenIndex);
    setAdvertisingBoardImageUrls(newAdvertisingBoardImageUrls);

    const newIamges = advertisingBoardImages.filter((item, itenIndex) => index !== itenIndex);
    setAdvertisingBoardImages(newIamges);
  }

  const onImageCloseButtonClickHandlermiri = (index: number) => {
    if (!fileInputRefmiri.current) return;

    fileInputRefmiri.current.value = '';
    
    const newAdvertisingBoardImagemiriUrls = advertisingBoardImagemiriUrls.filter((item, itenIndex) => index !== itenIndex);
    setAdvertisingBoardImagemiriUrls(newAdvertisingBoardImagemiriUrls);

    const newIamges = advertisingBoardImages.filter((item, itenIndex) => index !== itenIndex);
    setAdvertisingBoardImages(newIamges);
  }


  const onBackButtonClickHandler =() => {
    navigator(ADVERTISING_BOARD_PATH);
  };

  const onUploadButtonClickHandler = async () => {
    const token = cookies.accessToken;

    const imageUrls = await fileUpload();

    const data: PostAdvertisingBoardDto = {
      title: advertisingBoardTitle,
      contents: advertisingBoardContent,
      location: advertisingBoardLocation,
      businessType: advertisingBoardBusinessType,
      imageUrls
    }
    postAdvertisingBoardRequest(data,token).then(postAdvertisingBoardResponseHandler);

    navigator(ADVERTISING_BOARD_PATH);
  }

  const onLocationMoreButtonClickHandler = () => {
    setLocationShowMore(!locationShowMore);
  }

  const onBusinessTypeMoreButtonClickHandler = () => {
    setBusinessTypeShowMore(!businessTypeShowMore);
  }

  const onLocationButtonClickHandler = (advertisingBoardLocation: string) => {
    setAdvertisingBoardLocation(advertisingBoardLocation);
    setLocationShowMore(false);
  }

  const onBusinessTypeButtonClickHandler = (advertisingBoardBusinessType : string) => {
    setAdvertisingBoardBusinessType(advertisingBoardBusinessType);
    setBusinessTypeShowMore(false);
  }

  return(
    <div className='advertising-board-write-wrapper'>
      <div className='advertising-board-write-container'>
        <div className='advertising-board-title-container'>
          <div className='advertising-board-location-group'>
            <div className='advertising-board-location-top' onClick={onLocationMoreButtonClickHandler}>{advertisingBoardLocation ? advertisingBoardLocation: '지역'}</div>
            {locationShowMore && (
              <div className='advertising-board-location-button-group'>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('서울')}>{'서울'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('대전')}>{'대전'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('대구')}>{'대구'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('부산')}>{'부산'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('인천')}>{'인천'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('광주')}>{'광주'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('울산')}>{'울산'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('제주')}>{'제주'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('경기')}>{'경기'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('강원')}>{'강원'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('충북')}>{'충북'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('충남')}>{'충남'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('전북')}>{'전북'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('전남')}>{'전남'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('경북')}>{'경북'}</div>
                <div className="advertising-board-location-button" onClick={() => onLocationButtonClickHandler('경남')}>{'경남'}</div>
              </div>
            )}
          </div>
          <div className='advertising-board-location-group'>
            <div className='advertising-board-location-top' onClick={onBusinessTypeMoreButtonClickHandler}>{advertisingBoardBusinessType ? advertisingBoardBusinessType : '업종선택'}</div>
            {businessTypeShowMore && (
              <div className='advertising-board-location-button-group'>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('음식점')}>{'음식점'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('음료')}>{'음료'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('문화')}>{'문화'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('의료')}>{'의료'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('미용')}>{'미용'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('편의시설')}>{'편의시설'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('교육')}>{'교육'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('관광')}>{'관광'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('건축')}>{'건축'}</div>
                <div className="advertising-board-location-button" onClick={() => onBusinessTypeButtonClickHandler('기타')}>{'기타'}</div>
              </div>
            )}
          </div>
          <input type='text' className='advertising-board-write-title-input' placeholder='제목을 입력해주십시오.' onChange={onTitleChangeHandler} value={advertisingBoardTitle} />
        </div>
        <div className='divider'></div>
        <div className='advertising-board-image-miri-container'>
          <div className='advertising-board-img-miri'>
            <div className='advertising-board-image-upload-button-miri' onClick={onImageUploadButtonClickHandlermiri}>
              <div className='advertising-board-image-upload-icon-miri'></div>
            </div>
            <input ref={fileInputRefmiri} type='file' accept='image/*' style={{display:'none'}} onChange={onImageInputChangeHandlermiri} />
          </div>
        </div>
        <div className='miri-image-miri'>
        {advertisingBoardImagemiriUrls.map( (url, index) =>
          <div className='advertising-board-write-image-miri-container'>
            <img className='advertising-board-write-image-miri' src={url} />
            <div className='advertising-board-write-image-delete-button-miri' onClick={() => onImageCloseButtonClickHandlermiri(index)}>
              <div className='advertising-board-image-close-icon-miri'></div>
            </div>
          </div>
        )}
        </div>
        
        <div className='advertising-board-write-content-container'>
          <div className='advertising-board-write-content-input-box'>
            <textarea ref={textAreaRef} className='advertising-board-write-content-textarea' placeholder='본문을 작성해주십시오' value={advertisingBoardContent} onChange={onContenthandler}></textarea>
          </div>
          <div className='advertising-board-write-content-button-box'>
            <div className='advertising-board-image-upload-button' onClick={onImageUploadButtonClickHandler}>
              <div className='advertising-board-image-upload-icon'></div>
            </div>
            <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler} />
          </div>
        </div>
        <div className='image-image'>
        {advertisingBoardImageUrls.map( (url, index) =>
          <div className='advertising-board-write-image-container'>
            <img className='advertising-board-write-image' src={url} />
            <div className='advertising-board-write-image-delete-button' onClick={() => onImageCloseButtonClickHandler(index)}>
              <div className='advertising-board-image-close-icon'></div>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className='advertising-board-write-button-box'>
        <div className='black-button' onClick={onBackButtonClickHandler}>목록</div>
        <div className='black-button' onClick={onUploadButtonClickHandler}>작성</div>
      </div>
    </div>
  )
  
}