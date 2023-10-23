import { useNavigate, useParams } from "react-router-dom"
import "./style.css"
import { useUserStore } from "stores";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import GetAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-advertising-board.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { ADVERTISING_BOARD_PATH, ADVERTISING_BOARD_UPDATE_PATH } from "constant";
import { deleteAdvertisingBoardRequest, getAdvertisingBoardRequest } from "apis";
import { dateFormat } from "utils";


export default function AdvertisingBoardDetail(){
  const { boardNumber } = useParams();

  const { user } = useUserStore();

  const [cookie] = useCookies();

  const [board, setBoard] = useState<GetAdvertisingBoardResponseDto | null>(null);

  const [ownerButton, setOwnerButton] = useState<boolean>(true);

  const navigator = useNavigate();

  const getBoardResponseHandler = (
    responseBody: GetAdvertisingBoardResponseDto | ResponseDto
  ) => {
    const { code } = responseBody;

    if ( code === "NB") alert("존재하지 않는 게시물입니다.");
    if ( code === "VF") alert("잘못된 입력입니다.");
    if ( code === "DE") alert("데이터 베이스 에러입니다.");
    if (code !== "SU"){

    navigator(ADVERTISING_BOARD_PATH);
    return;
    }

    setBoard(responseBody as GetAdvertisingBoardResponseDto);
  };

  const deleteBoardResponseHandler = (code: string) => {
    if (code === "NA") alert("자영업자 아이디가 아닙니다.");
    if (code === "NB") alert ("존재하지 않는 게시물입니다.");
    if (code === "NP") alert ("권한이 없습니다.");
    if (code === "VF") alert ("잘못된 입력입니다.");
    if (code === "DE") alert("데이터 베이스 에러입니다.");
    if (code !== "SU") return;

    alert("게시물 삭제에 성공했습니다.");
    navigator(ADVERTISING_BOARD_PATH);
  }


  const onUpdateButtonClickHandler = () => {
    if (!board) return;
    navigator(ADVERTISING_BOARD_UPDATE_PATH(board.boardNumber));
  };

  const onDeleteButtonClickHandler = () => {
    if(!boardNumber) return;
    const token = cookie.accesToken;
    deleteAdvertisingBoardRequest(boardNumber,token).then(
      deleteBoardResponseHandler
    );
  };

  const onBackButtonClickHandler = () => {
    navigator(ADVERTISING_BOARD_PATH);
  };

  useEffect(() => {
    if(!boardNumber) {
      alert("게시물 번호가 잘못되었습니다.");
      navigator(ADVERTISING_BOARD_PATH);
      return;
    }

    getAdvertisingBoardRequest(boardNumber).then(getBoardResponseHandler);

    if (user && user.role !== "owner") setOwnerButton(false);
  },[boardNumber]);


  return(
    <div className="advertising-board-detail-item-list">
      <div className="advertising-board-detail-header">
        <div className="advertising-board-detail-title">{board?.title}</div>
        <div className="advertising-board-detail-data">
          <div className="advertising-board-detail-writer">
            <div className="advertising-board-detail-nickname">{board?.writerNickname}</div>
            <div className="board-detail-meta-divider">{"|"}</div>
            <div className="advertising-board-detail-writedatetime">{dateFormat(board?.writeDatetime as string)}</div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="advertising-board-detail-footer">
        <div className="advertising-board-detail-contents">{board?.contents}</div>
        <div className="advertising-board-detial-image-box">
          <img className="advertising-board-detail-image" src={board?.imageUrl ? board.imageUrl : ""} />
        </div>
      </div>
      { ownerButton === true ? (
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