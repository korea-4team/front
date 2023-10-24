import { getSearchListRequest } from "apis";
import AdvertisingBoardListItem from "components/AdvertisingBoardListItem";
import ReviewBoardListItem from "components/ReviewBoardListItem";
import { ADVERTISING_BOARD_SEARCH_LIST_PATH, MAIN_PATH, REVIEW_BOARD_SEARCH_LIST_PATH } from "constant";
import AdvertisingBoardListResponseDto from "interfaces/response/advertisingBoard/advertising-board-list.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { ReviewBoardListResponseDto } from "interfaces/response/reviewBoard";
import GetSearchResponseDto from "interfaces/response/search/get-search.response.dto";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import './style.css'

export default function Search() {

  const SearchBoardList = () => {

    //          state          //
    const { searchWord, searchLocation } = useParams();
    const [boardCount, setBoardCount] = useState<number>(0);
    const [reviewBoardCount, setReviewBoardCount] = useState<number>(0);
    const [advertisingBoardCount, setAdvertisingBoardCount] = useState<number>(0);
    const [reviewBoardList, setReviewBoardList] = useState<ReviewBoardListResponseDto[]>([]);
    const [advertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);

    //          function          //
    const navigator = useNavigate();

    const getSearchListResponseHandler = (responseBody: GetSearchResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { advertisingBoardList, reviewBoardList } = responseBody as GetSearchResponseDto;
      setAdvertisingBoardList(advertisingBoardList);
      setReviewBoardList(reviewBoardList);
      setAdvertisingBoardCount(advertisingBoardList.length);
      setReviewBoardCount(reviewBoardList.length);
      setBoardCount(reviewBoardCount + advertisingBoardCount);
    }

    //          event handler          //
    const onAdvertisingBoardMoerButtonClickHandler = (searchWord: string) => {
      navigator(ADVERTISING_BOARD_SEARCH_LIST_PATH(searchWord));
    }

    const onReviewBoardMoerButtonClickHandler = (searchWord: string) => {
      navigator(REVIEW_BOARD_SEARCH_LIST_PATH(searchWord));
    }

    //          effect          //
    useEffect(() => {
      if(!searchWord) {
        alert('검색어가 올바르지 않습니다.')
        navigator(MAIN_PATH);
        return;
      }
      getSearchListRequest(searchWord, searchLocation).then(getSearchListResponseHandler);
    },[searchWord, searchLocation])

    //          render          //
    return (
      <div className="search-container">
        <div className="search-text-container">
          <div className="search-text-empasis">{searchWord}</div>
          <div className="search-text">에 대한 검색결과 입니다.</div>
          <div className="search-text-empasis">{boardCount}</div>
        </div>
        <div className="advertising-board-search-box">
          <div className="search-board-title">광고 게시판</div>
          {
            advertisingBoardCount ? 
          (<><div className="advertising-board-search-list-box">
            {advertisingBoardList.map((item) => (<AdvertisingBoardListItem item={item} />))}
          </div><div className="search-list-more-button" onClick={() => onAdvertisingBoardMoerButtonClickHandler}>검색결과 더보기</div></>) : (<div className="search-board-nothing">검색결과가 없습니다.</div>)
          }
        </div>
        <div className="review-board-search-box">
          <div className="search-board-title">기행기 게시판</div>
          {
            reviewBoardCount ?
            (<><div className="review-board-search-list-box">
            {reviewBoardList.map((item) => (<ReviewBoardListItem item={item} />))}
          </div><div className="search-list-more-button" onClick={() => onReviewBoardMoerButtonClickHandler}>검색결과 더보기</div></>) : (<div className="search-board-nothing">검색결과가 없습니다.</div>)
          }
        </div>
      </div>
    )
  }


  return (
    <SearchBoardList />
  )
}
