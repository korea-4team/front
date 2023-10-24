import { useNavigate, useParams } from "react-router-dom"
import "./style.css"
import { useUserStore } from "stores";
import { useCookies } from "react-cookie";
import { useState } from "react";
import GetAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-advertising-board.response.dto";
import ResponseDto from "interfaces/response/response.dto";;
import { FavoriteListResponseDto } from "interfaces/response/advertisingBoard/get-advertising-board-favorite-list-response.dto";
import { usePagination } from "hooks";
import { ADVERTISING_BOARD_PATH, COUNT_BY_PAGE, COUNT_BY_PAGE_COMMENT } from "constant";
import { getAdvertisingBoardShortReviewListRequest } from "apis";
import GetShortReviewListResponseDto, { ShortReviewListResponseDto } from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";



export default function AdvertisingBoardDetail(){
  
  const {boardNumber} = useParams();
  const {user} = useUserStore();
  const [cookies] = useCookies();

  const navigator = useNavigate();


  const advertisingBoard = () => {


    const [advertisingBoard, setAdvertisingBoard] = useState<GetAdvertisingBoardResponseDto | null>(null);

    const [isWriter, setWriter] = useState<boolean>(false);

    const [shortReviewList, setShortReivewList] = useState<ShortReviewListResponseDto[]>([]);

    const [shortReviewCount, setShortReviewCount] = useState<number>(0);

    const [viewShortReviewList, setViewShortReviewList] = useState<ShortReviewListResponseDto[]>([]);

    const [shortReview, setShortReview] = useState<string>('');

    const [favoriteList, setFavoriteList] = useState<FavoriteListResponseDto[]>([]);

    const [favoriteCount, setFavoriteCount] = useState<number>(0);

    const [isFavorite,setFavorite] = useState<boolean>(false);

    const {totalPage, currentPage, currentSection, onNextClickHandler, onPreviusClickHandler, onPageClickHandler,changeSection} = usePagination();



    const getAdvertisingBoardResponseHandler = (responseBody: GetAdvertisingBoardResponseDto | ResponseDto) => {
      const {code} = responseBody;
      if(code === 'NB') alert('존재하지 않는 게시물입니다.');
      if(code === 'VF') alert('잘못된 게시물 번호입니다.');
      if(code === 'DE') alert('데이터베이스 오류입니다.');
      if(code !== 'SU') {
        navigator(ADVERTISING_BOARD_PATH);
        return;
      }
      setAdvertisingBoard(responseBody as GetAdvertisingBoardResponseDto);
    }

    const deleteAdvertisingBoardResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'VF') alert('잘못된 게시물입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      alert('게시물 삭제에 성공하였습니다.');
      navigator(ADVERTISING_BOARD_PATH);
    }

  
    const putFavoriteResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'VF') alert('잘못된 게시물 번호입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
    }


    const getShortReviewResponseHandler = (responseBody: GetShortReviewListResponseDto | ResponseDto)  => {
      const {code} = responseBody;
      if(code === 'VF') alert('잘못된 게시물 번호입니다.');
      if(code === 'DE') alert('데이터베이스 에러입니다.');
      if(code !== 'SU') {
        setShortReivewList([]);
        return;
      }

      const { shortList } = responseBody as GetShortReviewListResponseDto;
      setShortReivewList(shortList);
      setShortReviewCount(shortList.length);
      changeSection(shortList.length, COUNT_BY_PAGE_COMMENT);
      getViewShortReviewList(shortList);
    }

    const postShortReviewResponseHandler = (code: string) => {
      if (code === 'NU') alert('존재하지 않는유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'VF') alert('잘못된 입력입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 에러입니다.');
      if (code !== 'SU') return;

      setShortReview('');
      if(!boardNumber) return
      getAdvertisingBoardShortReviewListRequest(boardNumber).then(getShortReviewResponseHandler);
    }

    const deleteShortReviewResponseHandler = (code : string) => {
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'VF') alert('잘못된 게시물입니다.');
      if (code === 'AF') alert('로그인이 필요합니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      alert('댓글 삭제에 성공하였습니다.');
      if(!boardNumber) return;
      getAdvertisingBoardShortReviewListRequest(boardNumber).then(getShortReviewResponseHandler);
    }

    const getViewShortReviewList = (shortList : ShortReviewListResponseDto[]) => {
      const lastIndex = shortList.length > COUNT_BY_PAGE_COMMENT * currentPage ? COUNT_BY_PAGE_COMMENT * currentPage : shortList.length;
      const startIndex = COUNT_BY_PAGE_COMMENT * (currentPage - 1);
      const viewShortReviewList = shortList.slice(startIndex,lastIndex);
      setViewShortReviewList(viewShortReviewList);
    }


  }

}