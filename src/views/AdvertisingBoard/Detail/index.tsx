import { useNavigate, useParams } from "react-router-dom"
import "./style.css"
import { FavoriteListResponseDto } from "interfaces/response/advertisingBoard/get-advertising-board-favorite-list-response.dto";
import { usePagination } from "hooks";
import { ADVERTISING_BOARD_PATH, ADVERTISING_BOARD_UPDATE_PATH, COUNT_BY_PAGE, COUNT_BY_PAGE_COMMENT } from "constant";
import { deleteAdvertisingBoardRequest, deleteAdvertisingShortReviewRequest, getAdvertisingBoardRequest, getAdvertisingBoardShortReviewListRequest, postAdvertisingBoardShortReviewRequest, putAdvertisingBoardFavoriteRequest, uploadFileRequest } from "apis";
import GetShortReviewListResponseDto, { ShortReviewListResponseDto } from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";
import { PostShortReviewDto } from "interfaces/request/advertisingBoard";
import { dateFormat } from "utils";
import Pagination from "components/Pagination";
import ShortReviewListItem from "components/ShortReviewListItem";
import { useUserStore } from "stores";
import { useCookies } from "react-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import GetAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-advertising-board.response.dto";
import ResponseDto from "interfaces/response/response.dto";
import { PostMenu, PostTag } from 'types';




export default function AdvertisingBoardDetail(){
  
  const {boardNumber} = useParams();
  const {user} = useUserStore();
  const [cookies] = useCookies();

  const navigator = useNavigate();


  const AdvertisingBoard = () => {


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

    const [menuList, setMenuList] = useState<PostMenu[]>([]);

    const[advertisingBoardmenu, setAdvertisingBoardmenu] = useState<string>('');

    const[advertisingBoardprice, setAdvertisingBoardprice] = useState<string>('');

    const[advertisingBoardinfo, setAdvertisingBoardinfo] = useState<string>('');

    const[advertisingBoardImages, setAdvertisingBoardImages] = useState<File[]>([]);

    const[advertisingBoardImageUrls,setAdvertisingBoardImageUrls] = useState<string[]>([]);

    const[advertisingBoardImageUrl,setAdvertisingBoardImageUrl] = useState<File[]>([]);


    



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
      const { menuList } = responseBody as GetAdvertisingBoardResponseDto;
      setMenuList(menuList);

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

    const onUpdateButtonClickHandler = () => {
      if (!boardNumber) return;
      navigator(ADVERTISING_BOARD_UPDATE_PATH(boardNumber));
    }

    const onDeleteButtonClickHandler = () => {
      const accessToken = cookies.accessToken;
      if(!boardNumber) return;
      deleteAdvertisingBoardRequest(boardNumber, accessToken).then(deleteAdvertisingBoardResponseHandler);

    }

    const onBackButtonClickHandler = () => {
      navigator(ADVERTISING_BOARD_PATH);
    }

    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const comment = event.target.value;
      setShortReview(comment);
    }

    const onFavoriteButtonClickHandler = () => {
      if (!boardNumber) return;
      const token = cookies.accessToken;
      if(!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      putAdvertisingBoardFavoriteRequest(boardNumber, token) .then(putFavoriteResponseHandler);
    }


     
    const onPostCommentButtonclickHandler =() => {
      if (!boardNumber) return;
      const token = cookies.accessToken;
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      if (!shortReview) {
        alert('내용을 입력하세요');
        return;
      }
      const data: PostShortReviewDto = {
        contents : shortReview,
        score: shortReview
      }
      postAdvertisingBoardShortReviewRequest(boardNumber, data, token).then(postShortReviewResponseHandler);
    }


    const onDeleteShortReviewButtonClickHandler = (getShortReviewNumber : number) => {
      const accessToken = cookies.accessToken;
      console.log(getShortReviewNumber);
      if(!getShortReviewNumber) return;
      deleteAdvertisingShortReviewRequest(getShortReviewNumber, accessToken).then(deleteShortReviewResponseHandler);
    }


    const MenuComponent = ({ index } : {index: number}) => {

      return (
        <div className='advertising-board-menu'>
          <div className='advertising-board-menu-textarea'>{menuList[index].title}</div>
          <div className='advertising-board-menu-textarea'>{menuList[index].contents}</div>
          {menuList[index].imageUrls.map( (url, index) =>
          <div className='advertising-board-write-image-container'>
            <img className='advertising-board-write-image' src={url} />
          </div>
          )}
          <div className='advertising-board-menu-textarea'>{menuList[index].price}</div>
        </div>
      )
  
    }

    const fileUpload = async (files: File[]) => {
      if (!files.length) return [];
  
      const imageUrls = [];
  
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
    
        const imageUrl = await uploadFileRequest(data);
        if (!imageUrl) continue;
        imageUrls.push(imageUrl);
      }
  
      return imageUrls;
    }

    const onAddMenuuttonClickHandler = async () => {

      const imageUrl = await fileUpload(advertisingBoardImages);
  
      const menu: PostMenu = {
        title: advertisingBoardmenu,
        contents: advertisingBoardinfo,
        image: advertisingBoardImages,
        imageUrls: imageUrl,
        preImageUrl: advertisingBoardImageUrls,
        price: advertisingBoardprice,
      }
      const newMenuList = menuList.map(item => item);
      newMenuList.push(menu);
      setMenuList(newMenuList);
  
      setAdvertisingBoardmenu('');
      setAdvertisingBoardinfo('');
      setAdvertisingBoardImages([]);
      setAdvertisingBoardImageUrls([]);
      setAdvertisingBoardprice('');
    }
    


    let boardNumberFlag = true;
    useEffect(() => {
      if (boardNumberFlag) {
        boardNumberFlag = false;
        return
      }
      if (!boardNumber) {
        alert('게시물 번호가 잘못되었습니다.');
        navigator(ADVERTISING_BOARD_PATH);
        return;
      }
      getAdvertisingBoardRequest(boardNumber).then(getAdvertisingBoardResponseHandler);
      getAdvertisingBoardShortReviewListRequest(boardNumber).then(getShortReviewResponseHandler);
    },[boardNumber])


    useEffect(() => {
      const isWriter = user?.email === advertisingBoard?.writerEmail;
      setWriter(isWriter);
    },[advertisingBoard,user])


    useEffect(() => {
      getViewShortReviewList(shortReviewList);
    },[currentPage]);

    useEffect(() => {
      changeSection(shortReviewCount,COUNT_BY_PAGE_COMMENT);
    },[currentSection]);





    return(
      <div className="advertising-board-detail-container">
        <div className="advertising-board-detail-data">
          <div className="advertising-board-detail-title">{advertisingBoard?.title}</div>
          <div className="advertising-board-detail-location-businesstype">[{advertisingBoard?.location},{advertisingBoard?.businessType}]</div>
          <div className="advertising-board-detail-location-businesstype">[{advertisingBoard?.tagList}]</div>
        </div>
        <div className="advertising-board-detail-write-data">
          <div className="advertising-board-detail-writer-nickname">{advertisingBoard?.writerNickname}</div>
          <div className="advertising-board-detail-divider">{'\|'}</div>
          <div className="advertising-board-detail-write-date">{dateFormat(advertisingBoard?.writeDatetime as string)}</div>
        </div>
        <div className="divider"></div>
        <div className="advertising-board-detail-body">
        <div className='advertising-board-write-store'>업종 사진</div>
          <div className="advertising-board-detail-image-box">
            <img className="advertising-board-detail-image" src = {advertisingBoard?.imageUrls ? advertisingBoard.imageUrls: ''} />
          </div>
          <div className='advertising-board-write-store'>업종 설명</div>
          <div className="advertising-board-detail-contents">{advertisingBoard?.contents}</div>  
        </div>
          <div className='advertising-board-write-store'>판매 목록</div>
          <div className="advertising-board-detail-image-box">
          {menuList.map((menu, index) => <MenuComponent index={index} />)}
          </div>
          <div className='advertising-board-write-store'>상세보기</div>
          <div className="advertising-board-detail-contents">
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storename}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storetel}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storetime}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storenumber}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storeadrress}</div>
          </div> 
          <div className='advertising-board-write-store'>예약 안내사항</div>
          <div className="advertising-board-detail-contents">
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storename}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storetel}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storetime}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storenumber}</div>
            <div className="advertising-board-store-content-textarea" >{advertisingBoard?.storeadrress}</div>
          </div> 
        <div className="advertising-board-button-box">
          <div className="black-button" onClick={onBackButtonClickHandler}>목록</div>
          {isWriter &&
            <div className="advertising-board-writer-button-box">
              <div className="black-button" onClick={onUpdateButtonClickHandler}>수정</div>
              <div className="black-button" onClick={onDeleteButtonClickHandler}>삭제</div>
            </div>
          }
        </div>
        <div className="advertising-board-bottom-container">
          <div className="advertising-board-count-box">
            <div className="advertising-board-count-title">{'댓글'}<span className="advertising-board-count-emphasis">{shortReviewCount}</span></div>
            <div className="advertising-board-count-title">{'추천'}<span className="advertising-board-count-emphasis">{favoriteCount}</span></div>
            <div className="advertising-board-favorite-button" onClick={onFavoriteButtonClickHandler}>
              {isFavorite ? (
                <div className="advertising-board-favorite-fill-icon"></div>
              ) : (
                <div className="advertising-board-favorite-icon"></div>
              )}
            </div>
          </div>
          <div className="advertising-board-comment-list">
            {viewShortReviewList.map(shortReviewListItem => <ShortReviewListItem item={shortReviewListItem} onDelete = {onDeleteShortReviewButtonClickHandler}/> )}
          </div>
          <div className="advertising-board-comment-pagination-box">
            {shortReviewCount !== 0 && (
              <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onPageClickHandler={onPageClickHandler}
                onNextClickHandler={onNextClickHandler}
                onPreviusClickHandler={onPreviusClickHandler} />
            )}
          </div>
          <div className="advertising-board-comment-input-box">
            <div className="advertsing-board-comment-input-container">
              <textarea className="advertising-board-comment-input" placeholder="댓글을 작성해주세요" value={shortReview} onChange={onCommentChangeHandler} />
              <div className="advertising-board-comment-button-box">
                {shortReview.length ===0 ? (
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

  return(
    <AdvertisingBoard />
  )

}