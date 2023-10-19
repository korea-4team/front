import { postReviewBoardRequest, uploadFileRequest } from "apis";
import { MAIN_PATH, REVIEW_BOARD_PATH } from "constant";
import { PostReviewBoardRequestDto } from "interfaces/request/reviewBoard";
import { ChangeEvent, useRef, useState } from "react"
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "stores";

export default function ReviewBoardWrite() {

  //          state          //
  // description: textarea 요소에 대한 참조 상태 //
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // description: file input 요소에 대한 참조 상태 //
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie] = useCookies();
  // description: 이미지를 저장할 상태 //
  const [reviewBoardImageUrl, setReviewBoardImageUrl] = useState<string | null>('');
  const [reviewBoardImage, setReviewBoardImage] = useState<File | null>();
  const [reviewBoardTitle, setReviewBoardTitle] = useState<string>('');
  const [reviewBoardContents, setReviewBoardContents] = useState<string>('');
  const [reviewBoardLocation, setReviewBoardLocation] = useState<string>('');
  const [reviewBoardBusinessType, setReviewBoardBusinessType] = useState<string>('');
  // description: 로그인 유저 정보 상태 //
  const { user, setUser } = useUserStore();

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 파일 업로드 함수 //
  const fileUpload = async () => {
    if (!reviewBoardImage) return;

    const data = new FormData();
    data.append("file", reviewBoardImage);

    const imageUrl = await uploadFileRequest(data);
    return imageUrl;
  }

  // description : 게시물 작성 요청 함수 //
  const postReviewBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("존재하지 않는 회원입니다.");
    if (code === "VF") alert("필수 데이터를 입력하지 않았습니다.");
    if (code === 'AF') alert('로그인이 필요합니다.');
    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code !== "SU") return;

    if (!user) return;
    navigator(MAIN_PATH);
  }

  //          event handler          //
  // description: 본문 내용이 바뀔시 textarea 높이 변경 이벤트 //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }
  // description: 이미지 변경 시 이미지 미리보기 //
  const onImageInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setReviewBoardImageUrl(imageUrl);
  }
  // description: 이미지 업로드 버튼 클릭 이벤트 //
  const onImageUploadButtonClickHandler = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }
  // description: 이미지 닫기 버튼 클릭 이벤트 //
  const onImageCloseButtonClickHandler = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    setReviewBoardImageUrl('');
  }

  // description : 목록으로 가기 버튼 클릭 이벤트 //
  const onBackButtonClickHandler = () => {
    navigator(REVIEW_BOARD_PATH);
  };

  // description: 작성버튼 클릭 이벤트 //
  const onWriteButtonClickHandler = async () => {
    const token = cookies.accessToken;

    const imageUrl = await fileUpload();

    const data: PostReviewBoardRequestDto ={
      title: reviewBoardTitle,
      contents: reviewBoardContents,
      location: reviewBoardLocation,
      businessType: reviewBoardBusinessType,
      imageUrl
    }
    postReviewBoardRequest(data, token).then(postReviewBoardResponseHandler);
  }

  //          render          //
  return (
    <div className="review-board-write-wrapper">
      <div className="review-board-write-container">
        <div className="review-board-title-container">
          <input type="text" className="review-board-write-title-input" placeholder="제목을 작성해 주세요." />
        </div>
      <div className="divider"></div>
      <div className="review-board-write-content-container">
        <div className="review-board-write-content-input-box">
          <textarea ref={textAreaRef} className="review-board-write-content-textarea" placeholder="본문을 작성해주세요." value={reviewBoardContents}></textarea>
        </div>
        <div className="review-board-write-content-button-box">
          <div className="review-board-image-upload-button" onClick={onImageUploadButtonClickHandler}>
            <div className="review-board-image-upload-icon"></div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{display: 'none'}} onChange={onImageInputChangeHandler} />
        </div>
      </div>
      {reviewBoardImageUrl && (
        <div className="review-board-write-image-container">
          <img className="review-board-write-image" src={reviewBoardImageUrl} />
          <div className="review-board-write-image-delete-button" onClick={onImageCloseButtonClickHandler}>
            <div className="review-board-image-close-icon"></div>
          </div>
        </div>
      )}
      </div>
      <div className="review-board-write-button-box">
        <div className="reivew-board-write-button"></div>
        <div className="review-board-back-button"></div>
      </div>
    </div>
  )
}
