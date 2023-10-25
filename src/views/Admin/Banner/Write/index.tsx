import { postAdminBannerRequest, uploadFileRequest } from 'apis';
import { ADMIN_BANNER_PATH, ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH, ADMIN_GET_USER_LIST_PATH, ADMIN_PATH, BANNER_PATH, COUNT_BY_PAGE } from 'constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from 'stores';

import "./style.css";
import { useCookies } from 'react-cookie';
import PostMainBannerRequestDto from 'interfaces/request/banner/post-main-banner.request.dto';
import { GetMainBannerResponseDto } from 'interfaces/response/banner';
import ResponseDto from 'interfaces/response/response.dto';
//          component : 배너 컴포넌트         //
export default function AdminBannerWrite() {
  //          state         //
  // description : 유저 정보 상태 //
  const {user, setUser} = useUserStore();
  
  // description : 쿠키 상태 //
  const [cookies, setCookie] = useCookies();
  
  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          event handler         //

  //          component : 왼쪽 메뉴 컴포넌트         //
  const AdminBannerLeft = () => {
    //          state         //

    //          function          //
    // description : 기행기 목록 버튼 클릭 이벤트 //
    const onReviewButtonClickButton = () => {
      navigator(ADMIN_PATH);
    }

    // description : 한 줄 목록 버튼 클릭 이벤트 //
    const onShortReviewButtonClickButton = () => {
      navigator(ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH());
    }

    // description : 유저 목록 버튼 클릭 이벤트 //
    const onUserButtonClickButton = () => {
      navigator(ADMIN_GET_USER_LIST_PATH());
    }

    // description : 배너 버튼 클릭 이벤트 //
    const onBannerButtonClickButton = () => {
      navigator(ADMIN_BANNER_PATH());
    }


    //          event handler         //

    //          effect          //

    //          render          //
    return (
      <div className='admin-banner-write-left'>
        <div className='admin-banner-write-left-button' onClick={onReviewButtonClickButton}>기행기 목록</div>
        <div className='admin-banner-write-left-button' onClick={onShortReviewButtonClickButton}>한 줄 리뷰 목록</div>
        <div className='admin-banner-write-left-button' onClick={onUserButtonClickButton}>유저 목록</div>
        <div className='admin-banner-write-left-button' onClick={onBannerButtonClickButton}>배너</div>
      </div>
    )
  };

  //          component : 오른쪽 메뉴 컴포넌트         //
  const AdminBannerRight = () => {
    //          state         //
    // description : file input 요소에 대한 참조 상태 //
    const fileInputRef = useRef<HTMLInputElement>(null);

    // description : 배너 번호를 저장할 상태 //
    const { bannerNumber } = useParams();

    // description : 배너 정보를 저장할 상태 //
    const [bannerSequence, setSequence] = useState<string>('');
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState<string>('');
    const [eventBoardNumber, setEventBoardNumber] = useState<string>('');

    //          function          //
    // description : 파일 업로드 함수 //
    const fileUpload = async () => {
      if (bannerImage === null) return null;

      const data = new FormData();
      data.append("file", bannerImage);

      const imageUrl = await uploadFileRequest(data);

      return imageUrl;
    }

    // description : 배너 작성 요청 함수 //
    const postBannerResponseHandler = (code: string) => {
      if (code === "NA") alert("관리자 아이디가 아닙니다.");
      if (code === "NB") alert("해당하는 이벤트 게시물이 없습니다.");
      if (code === "DE") alert("데이터 베이스 에러입니다.");
      if (code !== "SU") return;

    }
  
    //          event handler         //
    // description : 순서가 바뀔 시 실행 될 이벤트 //
    const onSequenceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setSequence(event.target.value);
    }

    // description : 이벤트 번호가 바뀔 시 실행 될 이벤트 //
    const onEventBoardChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setEventBoardNumber(event.target.value);
    }

    // description : 이미지 변경 시 이미지 미리보기 //
    const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files || !event.target.files.length) return;

      const imageUrl = URL.createObjectURL(event.target.files[0]);

      setBannerImageUrl(imageUrl);
      setBannerImage(event.target.files[0]);
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
      setBannerImageUrl('');
    }

    // description : 배너 등록 클릭 이벤트 //
    const onUploadButtonClickHandler = async () => {
      const token = cookies.accessToken;

      const imageUrl = await fileUpload();

      const data: PostMainBannerRequestDto = {
        sequence: bannerSequence,
        imageUrl,
      }
      postAdminBannerRequest(eventBoardNumber,data, token).then(postBannerResponseHandler);
      
      navigator(ADMIN_BANNER_PATH());
    }

    // description : 목록 버튼 클릭 이벤트 //
    const onBackButtonClickButton = () => {
      navigator(-1);
    }
    
    //          effect          //

    //          render          //
    return(
      <div className='admin-banner-write-right'>
        <div className='admin-banner-write-item-box'>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 순서 </div>
            <div className='admin-banner-write-content'>
              <input className='notice-board-writer-title-input' type='text' placeholder='순서 입력' onChange={onSequenceChangeHandler} value={bannerSequence}/>
            </div>
          </div>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 연결 event board </div>
            <div className='admin-banner-write-content'>
              <input className='notice-board-writer-title-input' type='text' placeholder='이벤트 게시글 번호' onChange={onEventBoardChangeHandler} value={eventBoardNumber}/>
            </div>
          </div>
          <div className='admin-banner-write-box'>
            <div className='admin-banner-write-name'> 사진 등록
              <div className='image-upload-button' onClick={onImageUploadButtonClickHandler}>
                <div className='image-upload-icon'></div>
                <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onImageInputChangeHandler}/>
              </div>
            </div>
          </div>
          
          {bannerImageUrl && (
            <div className="admin-banner-image-box">
              <div className='admin-banner-write-image'>
                <img className="admin-banner-write-image" src={bannerImageUrl} />
                <div className='admin-banner-write-image-delete-button' onClick={onImageCloseButtonClickHandler}>
                  <div className='image-close-button'></div>
                </div>
              </div>
          </div>
          )}

        </div>
        <div className='admin-banner-write-button'>
          <div className='black-button' onClick={onUploadButtonClickHandler}> 등록 </div>
          <div className='black-button' onClick={onBackButtonClickButton}> 목록 </div>
        </div>
      </div>
    )
  };
  
  //          effect          //

  //          render          //
  return (
    <div className='admin-banner-write-main'>
      <AdminBannerLeft />
      <AdminBannerRight />
    </div>
  )
}
