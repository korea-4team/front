import { usePagination } from "hooks";
import './style.css';
import { useEffect, useState } from "react";
import GetCurrentAdvertisingBoardResponeDto from "interfaces/response/advertisingBoard/get-current-advertising-board-response.dto";
import AdvertisingBoardListResponseDto from "interfaces/response/advertisingBoard/advertising-board-list.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { ADVERTISING_BOARD_WRITE_PATH, COUNT_BY_PAGE } from "constant";
import { getAdvertisingBoardBusinessTypeListRequest, getAdvertisingBoardLocationListRequest, getCurrentAdvertisingBoardListRequest } from "apis";
import AdvertisingBoardListItem from "components/AdvertisingBoardListItem";
import Pagination from "components/Pagination";
import { useNavigate, useParams } from "react-router";
import GetAdvertisingLocationListResponseDto from "interfaces/response/advertisingBoard/get-advertising-board-location-list.response.dto";
import GetAdvertisingBoardBusinessTypeResponseDto from "interfaces/response/advertisingBoard/get-advertising-board-businessType-list-responsedto";

export default function AdvertisingBoardMain() {
  const AdvertisingBoardList = () => {


    // state //
    const {totalPage,currentPage,currentSection,onPageClickHandler,onPreviusClickHandler,onNextClickHandler, changeSection} = usePagination();
    const [AdvertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);
    const [boardCount ,setBoardCount] = useState<number>(0);
    const [pageAdvertisingBoardList, setPageAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);

    const navigator = useNavigate();


    const getPageAdvertisingBoardList = (advertisingBoardList: AdvertisingBoardListResponseDto[]) => {
      const lastIndex = advertisingBoardList.length > COUNT_BY_PAGE * currentPage ? COUNT_BY_PAGE * currentPage : advertisingBoardList.length;
      const startIndex = COUNT_BY_PAGE * (currentPage - 1);
      const pageAdvertisingBoardList = advertisingBoardList.slice(startIndex, lastIndex);


      setAdvertisingBoardList(pageAdvertisingBoardList);
    }




    const getAdvertisingBoardListResponseHandler = (responseBody: GetCurrentAdvertisingBoardResponeDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('섹션이 잘못되었습니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { advertisingBoardList } = responseBody as GetCurrentAdvertisingBoardResponeDto;
      changeSection(advertisingBoardList.length, COUNT_BY_PAGE);
      setAdvertisingBoardList(advertisingBoardList);
      setPageAdvertisingBoardList(advertisingBoardList);
      setBoardCount(advertisingBoardList.length);
    }


    const getAdvertisingBoardLocationListResponseHandler = (responseBody : GetAdvertisingLocationListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if(code === 'VF') alert ('섹션이 잘못되었습니다.');
      if(code === 'DE') alert ('데이터베이스 에러입니다.');
      if(code !== 'SU') return;

      const { advertisingBoardLocationList } = responseBody as GetAdvertisingLocationListResponseDto;
      setAdvertisingBoardList(advertisingBoardLocationList);
      setBoardCount(advertisingBoardLocationList.length);
      getPageAdvertisingBoardList(advertisingBoardLocationList);
      changeSection(advertisingBoardLocationList.length,COUNT_BY_PAGE);
    }

    const getAdvertisingBoardBusinessTypeListResponseHandler = (responseBody : GetAdvertisingBoardBusinessTypeResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if(code === 'VF') alert('섹션이 잘못되었습니다.');
      if(code === 'DE') alert('데이터베이스 에러입니다.');
      if(code !== 'SU') return;

      const {advertisingBoardBusinessTypeList} = responseBody as GetAdvertisingBoardBusinessTypeResponseDto;
      setAdvertisingBoardList(advertisingBoardBusinessTypeList);
      setBoardCount(advertisingBoardBusinessTypeList.length);
      getPageAdvertisingBoardList(advertisingBoardBusinessTypeList);
      changeSection(advertisingBoardBusinessTypeList.length,COUNT_BY_PAGE);
    }

    const onAdvertisingboardLocationClickHandler = (location: string) => {
      getAdvertisingBoardLocationListRequest(location).then(getAdvertisingBoardListResponseHandler);
    }

    const onAdvertisingboardBusinessTypeClickHandler = (businessType : string) => {
      getAdvertisingBoardBusinessTypeListRequest(businessType).then(getAdvertisingBoardBusinessTypeListResponseHandler);
    }

    const onAdvertisingboardWriteButtonClickHandler = () => {
      navigator(ADVERTISING_BOARD_WRITE_PATH());
    }

    // effect //
    useEffect(() => {
      getCurrentAdvertisingBoardListRequest(currentSection).then(getAdvertisingBoardListResponseHandler);
    },[currentSection])

    useEffect(()=> {
      if(boardCount) changeSection(boardCount, COUNT_BY_PAGE);
    },[currentSection])

    useEffect(()=> {
      getPageAdvertisingBoardList(AdvertisingBoardList);
    },[currentPage])
    
// render // 
return (
  <div id="advertising-board-wrapper">
    <div className="advertising-board-container">
    <div className="advertising-board-location-container">
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('서울')}>서울</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('대전')}>대전</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('대구')}>대구</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('부산')}>부산</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('인천')}>인천</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('광주')}>광주</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('울산')}>울산</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('제주')}>제주</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('경기')}>경기</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('강원')}>강원</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('충북')}>충북</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('충남')}>충남</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('전북')}>전북</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('전남')}>전남</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('경북')}>경북</div>
        <div className="advertising-board-location-list" onClick={() => onAdvertisingboardLocationClickHandler('경남')}>경남</div>
      </div>
      <div className="advertising-board-businesstype-container">
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('음식점')}>음식점</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('음료')}>음료</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('문화')}>문화</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('의료')}>의료</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('미용')}>미용</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('편의시설')}>편의시설</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('교육')}>교육</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('관광')}>관광</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('건축')}>건축</div>
        <div className="advertising-board-businesstype-list" onClick={() => onAdvertisingboardBusinessTypeClickHandler('기타')}>기타</div>
      </div>
      <div className="advertising-board-write-button" onClick={onAdvertisingboardWriteButtonClickHandler}>글쓰기</div>
        {boardCount ?
        (<div className="advertising-board-list-top">
            <div className="board-number">번호</div>
            <div className="board-title">제목</div>
            <div className="board-writer">작성자</div>
            <div className="board-write-datetime">작성일자</div>
            <div className="board-favorite-count">추천</div>
            <div className="board-view-count">조회</div>
            </div>) : (<></>)}
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
  return(
    <AdvertisingBoardList />
  )
}