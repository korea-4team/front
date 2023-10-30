import { getSearchAdvertisingBoardListRequest } from 'apis';
import AdvertisingBoardListItem from 'components/AdvertisingBoardListItem';
import Pagination from 'components/Pagination';
import { COUNT_BY_PAGE, MAIN_PATH } from 'constant';
import { usePagination } from 'hooks';
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import GetSearchAdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/get-search-advertising-board.response.dto';
import ResponseDto from 'interfaces/response/response.dto';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function AdvertisingBoardSearchList() {

  const AdvertisingBoardSearchList = () => {
    //          state          //
    const { searchWord, searchLocation } = useParams();
    // description: 페이지네이션 관련 상태 및 함수 //
    const { totalPage, currentPage, currentSection, onPageClickHandler, onPreviusClickHandler, onNextClickHandler, changeSection } = usePagination();
    // description: 게시물 수를 저장하는 상태 //
    const [boardCount, setBoardCount] = useState<number>(0);
    // description: 전체 게시물 리스트 상태 //
    const [advertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);
    // description: 현재 페이지에서 보여줄 게시물 리스트 상태 //
    const [pageAdvertisingBoardList, setPageAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);

    //          function          //
    const navigator = useNavigate();

    // description: 현재 페이지의 게시물 리스트 분류 함수 //
    const getPageAdvertisingBoardList = (advertisingBoardList: AdvertisingBoardListResponseDto[]) => {
      const lastIndex = advertisingBoardList.length > COUNT_BY_PAGE * currentPage ? COUNT_BY_PAGE * currentPage : advertisingBoardList.length;
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const pageAdvertisingBoardList = advertisingBoardList.slice(startIndex, lastIndex);

      setPageAdvertisingBoardList(pageAdvertisingBoardList);
    }

    // description: 광고 게시물 지역 및 검색단어 리스트 불러오기 //
    const getAdvertisingBoardSearchListResponseHandler = (responseBody: GetSearchAdvertisingBoardListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { advertisingboardList } = responseBody as GetSearchAdvertisingBoardListResponseDto;
      setAdvertisingBoardList(advertisingboardList);
      setBoardCount(advertisingboardList.length);
      getPageAdvertisingBoardList(advertisingboardList);
      changeSection(advertisingboardList.length, COUNT_BY_PAGE);
    }

    //          event handler          //

    //          effect          //
    useEffect(() => {
      if(!searchWord || !searchLocation) {
        alert('검색어가 올바르지 않습니다.')
        navigator(MAIN_PATH);
        return;
      }
      getSearchAdvertisingBoardListRequest(searchWord, searchLocation, currentSection).then(getAdvertisingBoardSearchListResponseHandler);
    },[searchWord, searchLocation])

    useEffect(() => {
      if(boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(() => {
      getPageAdvertisingBoardList(advertisingBoardList);
    },[currentPage])

    //          render          //
    return (
      <div id="advertising-board-wrapper">
        <div className="advertising-board-container">
          {boardCount ?
          (<div className="advertising-board-list-bottom">
          {pageAdvertisingBoardList.map((item) => (<AdvertisingBoardListItem item={item} />))}
          </div>) : (<div className="advertising-board-list-nothing">게시물이 존재하지않습니다. </div>)}
          {boardCount !== 0 && (
            <Pagination
            totalPage= {totalPage}
            currentPage={currentPage}
            onPageClickHandler={onPageClickHandler}
            onNextClickHandler={onNextClickHandler}
            onPreviusClickHandler={onPreviusClickHandler} />
          )}
        </div>
      </div>
    )
  }

  //          render          //
  return (
    <AdvertisingBoardSearchList />
  )
}
