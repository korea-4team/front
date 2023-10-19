import { deleteReviewBoardRequest, getReviewBoardRequest } from "apis";
import { REVIEW_BOARD_PATH, REVIEW_BOARD_UPDATE_PATH } from "constant";
import ResponseDto from "interfaces/response/response.dto";
import { GetReviewBoardResponseDto } from "interfaces/response/reviewBoard";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "stores";
import { dateFormat } from "utils";

export default function ReviewBoardDetail() {

  //          state          //
  const { boardNumber} = useParams();
  const { user } = useUserStore();
  const [cookies] = useCookies();

  //          function          //
  const navigator = useNavigate();

  //          component          //
  // description: 게시물 내용 컴포넌트 //
  const ReviewBoard = () => {

    //          state          //
    // description: 게시물 상태 //
    const [reviewBoard, setReviewBoard] = useState<GetReviewBoardResponseDto | null>(null);
    // description: 본인 게시물 여부 상태 //
    const [isWriter, setWriter] = useState<boolean>(false);

    //          function          //
    // description: 게시물 불러오기 응답 처리 //
    const getReviewBoardResponseHandler = (responseBody: GetReviewBoardResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'VF') alert('잘못된 게시물 번호입니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigator(REVIEW_BOARD_PATH);
        return;
      }

      const reivewBoard = responseBody as GetReviewBoardResponseDto;
      setReviewBoard(reviewBoard);
    }

    // description: 게시물 삭제 응답 처리 //
    const deleteReviewBoardResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'VF') alert('잘못된 게시물입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      alert('게시물 삭제에 성공했습니다.');
      navigator(REVIEW_BOARD_PATH);
    }

    //          event handler          //
    // description: 수정 버튼 클릭 이벤트 처리 //
    const onUpdateButtonClickHandler = () => {
      if (!boardNumber) return;
      navigator(REVIEW_BOARD_UPDATE_PATH(boardNumber));
    }

    // description: 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteButtonClickHandler = () => {
      const accessToken = cookies.accessToken;
      if(!boardNumber) return;
      deleteReviewBoardRequest(boardNumber, accessToken).then(deleteReviewBoardResponseHandler);
    }

    const onBackButtonClickHandler = () => {
      navigator(REVIEW_BOARD_PATH);
    }

    //          effect          //
    // description: 게시물 번호가 바뀔 때 마다 실행 //
    let boardNumberFlag = true;
    useEffect(() => {
      if (boardNumberFlag) {
        boardNumberFlag = false;
        return
      }
      if (!boardNumber) {
        alert('게시물 번호가 잘못되었습니다.');
        navigator(REVIEW_BOARD_PATH);
        return;
      }
      getReviewBoardRequest(boardNumber).then(getReviewBoardResponseHandler);
    },[boardNumber])

    // description: 게시물과 유저 정보가 바뀔 때 마다 실행 //
    useEffect(() => {
      const isWriter = user?.email === reviewBoard?.writerEmail;
      setWriter(isWriter);
    },[reviewBoard, user])
    
    //          render          //
    return (
      <div className="review-board-detail-container">
        <div className="review-board-detail-data">
          <div className="review-board-detail-title">{reviewBoard?.title}</div>
          <div className="review-board-detail-location-businesstype">[{reviewBoard?.location},{reviewBoard?.businessType}]</div>
        </div>
        <div className="review-board-detail-write-data">
          <div className="review-board-detail-writer-nickname">{reviewBoard?.writerNickname}</div>
          <div className="review-board-detail-divider">{'\|'}</div>
          <div className="review-board-detail-write-date">{dateFormat(reviewBoard?.writeDatetime as string)}</div>
        </div>
        <div className="divider"></div>
        <div className="review-board-detail-body">
          <div className="review-board-detail-contents">{reviewBoard?.contents}</div>
          <div className="review-board-detatil-image-box">
            <img className="review-board-detail-image" src={reviewBoard?.imageUrl ? reviewBoard.imageUrl : ''} />
          </div>
        </div>
        <div className="review-board-back-button" onClick={onBackButtonClickHandler}>돌아가기</div>
      </div>
    )
  }

  //          render          //
  return (
    <ReviewBoard />
  )
}
