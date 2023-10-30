import { useEffect, useState } from "react";

import ResponseDto from "interfaces/response/response.dto";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { useUserStore } from "stores";
import { dateFormat } from "utils";
import "./style.css";
import { GetEventBoardResponseDto } from "interfaces/response/EventBoard";
import { EVENT_BOARD_PATH, EVENT_BOARD_UPDATE_PATH } from "constant";
import { deleteEventBoardRequest, getEventBoardRequest } from "apis";

//          component : 이벤트 게시물 상세보기          //
export default function EventBoardDetail() {
  //          state         //
  // description : 게시물 번호 상태 //
  const { boardNumber } = useParams();
  //  description : 로그인 유저 정보 상태 //
  const { user } = useUserStore();
  // description : Cookie 상태 //
  const [cookie] = useCookies();
  // description : 게시물 정보 상태 //
  const [board, setBoard] = useState<GetEventBoardResponseDto | null>(null);
  // description : 수정, 삭제 버튼 출력 상태 //
  const [adminButton, setAdminButton] = useState<boolean>(false);

  //          function          //
  // description : 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  // description : 게시물 불러오기 요청 함수 //
  const getEventBoardResponseHandler = (
    responseBody: GetEventBoardResponseDto | ResponseDto
  ) => {
    const { code } = responseBody;

    if (code === "DE") alert("데이터 베이스 에러입니다.");
    if (code === "VF") alert("게시물 번호가 잘못되었습니다.");
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code !== "SU") {
      navigator(EVENT_BOARD_PATH);
      return;
    }

    setBoard(responseBody as GetEventBoardResponseDto);
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
    navigator(EVENT_BOARD_PATH);
  };

  //          event handler         //
  // description : 수정 버튼 클릭 이벤트 //
  const onUpdateButtonClickHandler = () => {
    if (!board) return;
    navigator(EVENT_BOARD_UPDATE_PATH(board.boardNumber));
  };

  // description : 삭제 버튼 클릭 이벤트 //
  const onDeleteButtonClickHandler = () => {
    if (!boardNumber) return;
    const token = cookie.accessToken;
    deleteEventBoardRequest(boardNumber, token).then(
      deleteBoardResponseHandler
    );
  };

  const onBackButtonClickHandler = () => {
    navigator(EVENT_BOARD_PATH);
  };

  //          effect          //
  // description : 게시물 번호가 바뀔 때마다 새로운 정보 받아오기 //
  useEffect(() => {
    if (!boardNumber) {
      alert("게시물 번호가 잘못되었습니다.");
      navigator(EVENT_BOARD_PATH);
      return;
    }

    getEventBoardRequest(boardNumber).then(getEventBoardResponseHandler);

    if (user && user.role === "admin") setAdminButton(true);
  }, [boardNumber]);

  //          render          //
  return (
    <div className="event-board-detail-item-list">
      <div className="event-board-detail-header">
        <div className="event-board-detail-title"> {board?.title} </div>
        <div className="event-board-detail-data">
          <div className="event-board-detail-writer">
            <div className="event-board-detail-nickname">{board?.adminNickname} </div>
            <div className="board-detail-meta-divider">{"|"}</div>
            <div className="event-board-detail-writedatetime"> {dateFormat(board?.writeDatetime as string)}</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="event-board-detail-footer">
        <div className="event-board-detail-contents"> {board?.contents} </div>
        <div className="event-board-detail-image-box">
          <img className="event-board-detail-image" src={board?.imageUrl ? board.imageUrl : ""} />
        </div>
      </div>
      { adminButton === true ? (
        <div className="back-button">
          <div className="black-button" onClick={onUpdateButtonClickHandler}>수정</div>
          <div className="black-button" onClick={onDeleteButtonClickHandler}>삭제</div>
          <div className="black-button" onClick={onBackButtonClickHandler}>목록</div>
        </div>
      ) : (
        <div className="back-button">
          <div className="black-button" onClick={onBackButtonClickHandler}>목록</div>
        </div>)
      }
    </div>
  );
}
