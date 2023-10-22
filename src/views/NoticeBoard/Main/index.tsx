import { getNoticeBoardListRequest } from "apis";
import NoticeBoardListItem from "components/NoticeBoardListItem";
import Pagination from "components/Pagination";
import { usePagination } from "hooks";
import {
  GetNoticeBoardListResponseDto,
  NoticeBoardListResponseDto,
} from "interfaces/response/noticeBoard";
import ResponseDto from "interfaces/response/response.dto";
import { useEffect, useState } from "react";

import { COUNT_BY_PAGE, NOTICE_BOARD_WRITE_PATH } from "constant";
import { useNavigate } from "react-router";
import { useUserStore } from "stores";
import "./style.css";

//          component : 공지사항 게시판         //
export default function NoticeBoardMain() {
  //          component : 공지사항 리스트 컴포넌트         //
  const NoticeBoardList = () => {
    //          state         //
    // description : 유저 상태 //
    const { user } = useUserStore();

    // description : 페이지 네이션 관련 상태 및 함수 //
    const {
      totalPage,
      currentPage,
      currentSection,
      onPageClickHandler,
      onPreviusClickHandler,
      onNextClickHandler,
      changeSection,
    } = usePagination();

    // description : 전체 게시물 리스트 상태 //
    const [noticeBoardList, setNoticeList] = useState<
      NoticeBoardListResponseDto[]
    >([]);

    // description : 작성 버튼 노출 상태 //
    const [writeButton, setWriteButton] = useState<boolean>(false);

    // description : 전체 게시물 갯수 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);

    // description : 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageNoticeBoardList, setPageNoticeBoardList] = useState<
      NoticeBoardListResponseDto[]
    >([]);

    //          function          //
    // description : 페이지 이동을 위한 네비게이트 함수 //
    const navigator = useNavigate();

    // description : 현재 페이지의 게시물 리스트 분류 함수 //
    const getNoticeBoardList = (
      NoticeBoardList: NoticeBoardListResponseDto[]
    ) => {
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const lastIndex =
        NoticeBoardList.length > COUNT_BY_PAGE * currentPage
          ? COUNT_BY_PAGE * currentPage
          : NoticeBoardList.length;
      const pageNoticeBoardList = NoticeBoardList.slice(startIndex, lastIndex);

      setPageNoticeBoardList(pageNoticeBoardList);
    };

    // description : 공지사항 불러오기 응답 처리 함수 //
    const getNoticeBoardListResponseHandler = (
      responseBody: GetNoticeBoardListResponseDto | ResponseDto
    ) => {
      const { code } = responseBody;
      if (code === "DE") alert("데이터베이스 에러입니다.");
      if (code !== "SU") return;

      const { noticeBoardList } = responseBody as GetNoticeBoardListResponseDto;
      setNoticeList(noticeBoardList);
      setBoardCount(noticeBoardList.length);
      getNoticeBoardList(noticeBoardList);
      changeSection(noticeBoardList.length, COUNT_BY_PAGE);
    };

    //          event handler          //
    // description : 컴포넌트 클릭 이벤트 //
    const onClickHandler = () => {
      navigator(NOTICE_BOARD_WRITE_PATH());
    };

    //          component         //

    //          effect          //
    // description : 첫 시작 시 공지사항 게시물 불러오기 //
    useEffect(() => {
      getNoticeBoardListRequest(1).then(getNoticeBoardListResponseHandler);

      if (user && user.role === "admin") setWriteButton(true);
      
    }, []);

    // description : 현재 섹션이 바뀔 때마다 페이지 리스트 변경 및 공지사항 불러오기//
    useEffect(() => {
      getNoticeBoardListRequest(currentSection).then(
        getNoticeBoardListResponseHandler
      );
    }, [currentSection]);

    useEffect(() => {
      if (boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    }, [currentSection]);

    useEffect(() => {
      getNoticeBoardList(noticeBoardList);
    }, [currentPage]);

    //          render          //
    return (
      <div className="notice-board-list-box">
        <div className="notice-board-list-top">
          <div className="notice-board">공지사항</div>
          {writeButton && (
            <div className="write-button">
              <div className="black-button" onClick={onClickHandler}>
                작성하기
              </div>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="notice-board-list-bottom">
          <div className="notice-board-list-name">
            <div className="notice-number"> 번호 </div>
            <div className="notice-title"> 제목 </div>
            <div className="notice-writer"> 작성자 </div>
            <div className="notice-write-datetime"> 작성일자 </div>
          </div>
          {boardCount ? (
            <div className="notice-board-list">
              {pageNoticeBoardList.map((item) => (
                <NoticeBoardListItem item={item} />
              ))}
            </div>
          ) : (
            <div className="my-page-bottom-list-nothing">
              {" "}
              공지사항이 없습니다.{" "}
            </div>
          )}
        </div>
        {boardCount !== 0 && (
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageClickHandler={onPageClickHandler}
            onPreviusClickHandler={onPreviusClickHandler}
            onNextClickHandler={onNextClickHandler}
          />
        )}
      </div>
    );
  };

  //          effect          //

  //          render          //
  return <NoticeBoardList />;
}
