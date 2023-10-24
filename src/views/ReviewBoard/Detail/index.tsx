import { deleteReviewBoardCommentRequest, deleteReviewBoardRequest, getReviewBoardCommentListRequest, getReviewBoardFavoriteListRequest, getReviewBoardRequest, postReviewBoardCommentRequest, putReviewBoardFavoriteRequest } from "apis";
import { COUNT_BY_PAGE, COUNT_BY_PAGE_COMMENT, REVIEW_BOARD_PATH, REVIEW_BOARD_UPDATE_PATH } from "constant";
import ResponseDto from "interfaces/response/response.dto";
import { GetReviewBoardResponseDto } from "interfaces/response/reviewBoard";
import { ChangeEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "stores";
import { dateFormat } from "utils";
import "./style.css";
import GetCommentListResponseDto, { CommentListResponseDto } from "interfaces/response/reviewBoard/get-comment-list.response.dto";
import { usePagination } from "hooks";
import { PostCommentRequestDto } from "interfaces/request/reviewBoard";
import CommentListItem from "components/CommentListItem";
import Pagination from "components/Pagination";
import GetFavoriteListResponseDto, { FavoriteListResponseDto } from "interfaces/response/reviewBoard/get-review-board-favorite-list-response.dto";

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
    // description: 댓글 리스트 상태 //
    const [commentList, setCommentList] = useState<CommentListResponseDto[]>([]);
    // description: 댓글 갯수 상태 //
    const [commentCount, setCommentCount] = useState<number>(0);
    // description: 현재 페이지에서 보여줄 댓글 리스트 상태 //
    const [viewCommentList, setViewCommentList] = useState<CommentListResponseDto[]>([]);
    // description: 댓글 상태 //
    const [comment, setComment] = useState<string>('');
    // description: 추천 리스트 상태 //
    const [favoriteList, setFavoriteList] = useState<FavoriteListResponseDto[]>([]);
    // description: 추천 갯수 상태 //
    const [favoriteCount, setFavoriteCount] = useState<number>(0);
    // description: 사용자 추천 상태//
    const [isFavorite, setFavorite] = useState<boolean>(false);
    // description: 페이지네이션 관련 상태 //
    const { totalPage, currentPage, currentSection, onNextClickHandler, onPreviusClickHandler, onPageClickHandler, changeSection } = usePagination();

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
      setReviewBoard(responseBody as GetReviewBoardResponseDto);
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

    // description: 좋아요 리스트 불러오기 응답 처리 함수 //
    const getFavoriteListResponseHandler = (responseBody: GetFavoriteListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 게시물번호입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') {
        setFavoriteList([]);
        setFavoriteCount(0);
        return;
      }

      const { favoriteList } = responseBody as GetFavoriteListResponseDto;
      setFavoriteList(favoriteList);
      setFavoriteCount(favoriteList.length);
    }

    // description: 좋아요 응답 처리 함수 //
    const putFavoriteResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'VF') alert('잘못된 게시물 번호입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      getReviewBoardFavoriteListRequest(boardNumber).then(getFavoriteListResponseHandler);
    }

    // description: 댓글 리스트 불러오기 응답 처리 함수 //
    const getCommentListResponseHandler = (responseBody: GetCommentListResponseDto | ResponseDto) => {
      const {code} = responseBody;
      if (code === 'VF') alert('잘못된 게시물 번호입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') {
        setCommentList([]);
        return;
      }

      const { commentList } = responseBody as GetCommentListResponseDto;
      setCommentList(commentList);
      setCommentCount(commentList.length);
      changeSection(commentList.length, COUNT_BY_PAGE_COMMENT);
      getViewCommentList(commentList);
    }

    // description: 댓글 작성 응답 처리 함수 //
    const postCommentResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      setComment('');
      if (!boardNumber) return
      getReviewBoardCommentListRequest(boardNumber).then(getCommentListResponseHandler);
    }

    // description: 댓글삭제 응답 처리 함수 //
    const deleteCommentResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'VF') alert('잘못된 게시물입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
  
      alert('댓글 삭제에 성공했습니다.');
      if (!boardNumber) return;
      getReviewBoardCommentListRequest(boardNumber).then(getCommentListResponseHandler);
    }

    // description: 현재 페이지의 댓글 리스트 분류 함수 //
    const getViewCommentList = (commentList: CommentListResponseDto[]) => {
      const lastIndex = commentList.length > COUNT_BY_PAGE_COMMENT * currentPage ? COUNT_BY_PAGE_COMMENT * currentPage : commentList.length;
      const startIndex = COUNT_BY_PAGE_COMMENT * (currentPage - 1);
      const viewCommentList = commentList.slice(startIndex, lastIndex);
      setViewCommentList(viewCommentList);
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

    // description: 목록 버튼 클릭 이벤트 처리 //
    const onBackButtonClickHandler = () => {
      navigator(REVIEW_BOARD_PATH);
    }

    // description: 댓글 변경 이벤트 처리 함수 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const comment = event.target.value;
      setComment(comment);
    }

    // description: 좋아요 클릭 이벤트 처리 함수 //
    const onFavoriteButtonClickHandler = () => {
      if (!boardNumber) return;
      const  token = cookies.accessToken;
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      putReviewBoardFavoriteRequest(boardNumber, token).then(putFavoriteResponseHandler);
    }

    // description: 댓글달기 버튼 클릭 이벤트 처리 함수 //
    const onPostCommentButtonclickHandler = () => {
      if (!boardNumber) return;
      const token = cookies.accessToken;
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      if (!comment) {
        alert('내용을 입력하세요');
        return;
      }
      const data: PostCommentRequestDto = {
        contents: comment
      }
      postReviewBoardCommentRequest(boardNumber, data, token).then(postCommentResponseHandler);
    }
  
    // description: 댓글삭제 버튼 클릭 이벤트 처리 함수 //
    const onDeleteCommentButtonClickHandler = (commentNumber: number) => {
      const accessToken = cookies.accessToken;
      console.log(commentNumber);
      if(!commentNumber) return;
      deleteReviewBoardCommentRequest(commentNumber, accessToken).then(deleteCommentResponseHandler);
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
      getReviewBoardCommentListRequest(boardNumber).then(getCommentListResponseHandler);
      getReviewBoardFavoriteListRequest(boardNumber).then(getFavoriteListResponseHandler);
    },[boardNumber])

    // description: 게시물과 유저 정보가 바뀔 때 마다 실행 //
    useEffect(() => {
      const isWriter = user?.email === reviewBoard?.writerEmail;
      setWriter(isWriter);
    },[reviewBoard, user])

    // description: favorite list가 변경될 때 마다 실행될 함수 //
    useEffect(() => {
      setFavorite(false);
      if (!user) return;
      favoriteList.forEach(item => {if(item.email === user.email) setFavorite(true)})
    }, [favoriteList]);

    // description: current page가 변경될 때 마다 실행될 함수 //
    useEffect(() => {
      getViewCommentList(commentList);
    }, [currentPage]);
    // description: current section이 변경될 때 마다 실행될 함수 //
    useEffect(() => {
      changeSection(commentCount, COUNT_BY_PAGE_COMMENT);
    }, [currentSection]);
    
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
        <div className="review-board-button-box">
          <div className="black-button" onClick={onBackButtonClickHandler}>목록</div>
          {isWriter &&
            <div className="review-board-writer-button-box">
              <div className="black-button" onClick={onUpdateButtonClickHandler}>수정</div>
              <div className="black-button" onClick={onDeleteButtonClickHandler}>삭제</div>
            </div>
          }
        </div>
        <div className="review-board-bottom-container">
          <div className="review-board-count-box">
            <div className="review-board-count-title">{'댓글 '}<span className="review-board-count-emphasis">{commentCount}</span></div>
            <div className="review-board-count-title">{'추천 '}<span className="review-board-count-emphasis">{favoriteCount}</span></div>
            <div className="review-board-favorite-button" onClick={onFavoriteButtonClickHandler}>
              {isFavorite ? (
                <div className="review-board-favorite-fill-icon"></div>
              ) : (
                <div className="review-board-favorite-icon"></div>
              )}
            </div>
          </div>
          <div className="review-board-comment-list">
            {viewCommentList.map(CommentItem => <CommentListItem item={CommentItem} onDelete={onDeleteCommentButtonClickHandler} />)}
          </div>
          <div className="review-board-comment-pagination-box">
            {commentCount !== 0 && (
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onPageClickHandler={onPageClickHandler}
                onNextClickHandler={onNextClickHandler}
                onPreviusClickHandler={onPreviusClickHandler}
              />
            )}
          </div>
          <div className="review-board-comment-input-box">
            <div className="review-board-comment-input-container">
              <textarea className="review-board-comment-input" placeholder="댓글을 작성해 주세요" value={comment} onChange={onCommentChangeHandler} />
              <div className="review-board-comment-button-box">
                {comment.length === 0 ? (
                  <div className="disable-button">댓글달기</div>
                ) : (
                  <div className="black-button" onClick={onPostCommentButtonclickHandler}>댓글달기</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //          render          //
  return (
    <ReviewBoard />
  )
}
