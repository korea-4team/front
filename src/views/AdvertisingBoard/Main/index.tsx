import { usePagination } from "hooks";
import './style.css';
import { useEffect, useState } from "react";
import GetCurrentAdvertisingBoardResponeDto from "interfaces/response/advertisingBoard/get-current-advertising-board-response.dto";
import AdvertisingBoardListResponseDto from "interfaces/response/advertisingBoard/advertising-board-list.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { COUNT_BY_PAGE } from "constant";
import { getCurrentAdvertisingBoardListRequest } from "apis";
import AdvertisingBoardListItem from "components/AdvertisingBoardListItem";
import Pagination from "components/Pagination";
import { useNavigate, useParams } from "react-router";

export default function AdvertisingBoardMain() {
  const AdvertisingBoardList = () => {


    // state //
    const {totalPage,currentPage,currentSection,onPageClickHandler,onPreviusClickHandler,onNextClickHandler, changeSection} = usePagination();
    const [AdvertisingBoardList, setAdvertisingBoardList] = useState<AdvertisingBoardListResponseDto[]>([]);
    const {location} = useParams();
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
      if (code === "VF") alert('섹션이 잘못되었습니다.');
      if (code === "DE") alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      const { advertisingBoardList } = responseBody as GetCurrentAdvertisingBoardResponeDto;
      changeSection(advertisingBoardList.length, COUNT_BY_PAGE);
      setAdvertisingBoardList(advertisingBoardList);
    }

    // effect //
    useEffect(() => {
      getCurrentAdvertisingBoardListRequest(currentSection).then(getAdvertisingBoardListResponseHandler);
    },[currentSection])
   
// render //
return (
  <div id="advertising-board-wrapper">
    <div className="advertising-board-location-list"></div>
    <div className="advertising-board-container">
        <div className="advertising-board-box" >
      </div>
      <div className="advertising-board-businesstype-list"></div>
      <div className="advertising-board-list-bottom">
        {AdvertisingBoardList.map((item)=>(<AdvertisingBoardListItem item={item}/>))}
      </div>
      <Pagination
          totalPage= {totalPage}
          currentPage={currentPage}
          onPageClickHandler={onPageClickHandler}
          onNextClickHandler={onNextClickHandler}
          onPreviusClickHandler={onPreviusClickHandler} />
    </div>
</div>
 
)

  }

  return(
    <AdvertisingBoardList />
  )
}