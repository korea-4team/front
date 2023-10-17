import { useEffect, useState } from "react";

import { deleteNoticeBoardRequest, getNoticeBoardRequest } from "apis";
import { NOTICE_BOARD_PATH, NOTICE_BOARD_UPDATE_PATH } from "constant";
import { GetNoticeBoardResponseDto } from "interfaces/response/noticeBoard";
import ResponseDto from "interfaces/response/response.dto";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "stores";
import { dateFormat } from "utils";
import "./style.css";

//          component : 공지사항 게시물 상세보기          //
export default function NoticeBoardDetail() {
  //          state         //
  // description : 게시물 번호 상태 //
  const { boardNumber } = useParams();

  //  description : 로그인 유저 정보 상태 //
  const { user } = useUserStore();

  // description : Cookie 상태 //
  const [cookie] = useCookies();

  // description : 게시물 정보 상태 //
  const [board, setBoard] = useState<GetNoticeBoardResponseDto | null>(null);

  // description : more 버튼 출력 상태 //
  const [viewMore, setViewMore] = useState<boolean>(true);

  // description : more 버튼 클릭 상태 //
  const [openMore, setOpenMore] = useState<boolean>(false);

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 게시물 불러오기 요청 함수 //
  const getBoardResponseHandler = (
    responseBody: GetNoticeBoardResponseDto | ResponseDto
  ) => {
    const { code } = responseBody;

    if (code === "DE") alert("데이터 베이스 에러입니다.");
    if (code === "VF") alert("게시물 번호가 잘못되었습니다.");
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code !== "SU") {
      navigator(NOTICE_BOARD_PATH);
      return;
    }

    setBoard(responseBody as GetNoticeBoardResponseDto);
  };

  // description : 게시물 삭제 응답 처리 함수 //
  const deleteBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자 아이디가 아닙니다.");
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code === "NP") alert("권한이 없습니다.");
    if (code === "VF") alert("잘못된 입력입니다.");
    if (code === "DE") alert("데이터 베이스 에러입니다.");
    if (code !== "SU") return;

    alert("게시물 삭제에 성공했습니다.");
    navigator(NOTICE_BOARD_PATH);
  };

  //          event handler         //
  // description : more 버튼 클릭 이벤트 //
  const onMoreButtonClickHandler = () => {
    setOpenMore(!openMore);
  };
  // description : 수정 버튼 클릭 이벤트 //
  const onUpdateButtonClickHandler = () => {
    if (!board) return;
    navigator(NOTICE_BOARD_UPDATE_PATH(board.boardNumber));
  };

  // description : 삭제 버튼 클릭 이벤트 //
  const onDeleteButtonClickHandler = () => {
    if (!boardNumber) return;
    const token = cookie.accessToken;
    deleteNoticeBoardRequest(boardNumber, token).then(
      deleteBoardResponseHandler
    );
  };

  const onBackButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  };

  //          effect          //
  // description : 게시물 번호가 바뀔 때마다 새로운 정보 받아오기 //
  useEffect(() => {
    if (!boardNumber) {
      alert("게시물 번호가 잘못되었습니다.");
      navigator(NOTICE_BOARD_PATH);
      return;
    }

    getNoticeBoardRequest(boardNumber).then(getBoardResponseHandler);

    if (user && user.role === "admin") setViewMore(false);
    
  }, [boardNumber]);

  //          render          //
  return (
    <div className="notice-board-detail-item-list">
      <div className="notice-board-detail-header">
        <div className="notice-board-detail-title"> {board?.title} </div>
        <div className="notice-board-detail-data">
          <div className="notice-board-detail-writer">
            <div className="notice-board-detail-nickname"> {board?.adminNickname} </div>
            <div className="board-detail-meta-divider">{"|"}</div>
            <div className="notice-board-detail-writedatetime"> {dateFormat(board?.writeDatetime as string)} </div>
          </div>
          <div className="notice-board-more-buttons">
            {openMore && (
              <div className="more-button-group">
                <div className="update-button" onClick={onUpdateButtonClickHandler}> 수정 </div>
                <div className="divider"></div>
                <div className="delete-button" onClick={onDeleteButtonClickHandler}> 삭제 </div>
              </div>
            )}
            {viewMore && (
              <div className="notice-board-detail-more-button" onClick={onMoreButtonClickHandler}>
                <div className="more-icon"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="notice-board-detail-footer">
        <div className="notice-board-detail-contents"> {board?.contents} </div>
        <div className="notice-board-detail-image-box">
          <img className="notice-board-detail-image" src={board?.imageUrl ? board.imageUrl : ""} />
        </div>
      </div>
      <div className="back-button">
        <div className="black-button" onClick={onBackButtonClickHandler}> 목록 </div>
      </div>
    </div>
  );
}
