import './style.css';
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import { useNavigate } from 'react-router';
import { ADVERTISING_BOARD_DETAIL_PATH, ADVERTISING_BOARD_PATH } from 'constant';

 interface Props{
   item: AdvertisingBoardListResponseDto;
 }

// component //
export default function AdvertisingBoardListItem({item}:Props) {

// state //
 const {boardNumber,imageUrl, shortReviewCount, favoriteCount, title,viewCount,writeDatetime,writerNickname} = item;

// function //

const navigator = useNavigate();

// event handler //

const onClickHandler = () => {
   navigator(ADVERTISING_BOARD_DETAIL_PATH(boardNumber));
}

// effect //

// render //
  return(
    <div className='advertising-board-list-item-box' onClick={onClickHandler}>
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="count">
        <div className="short-review-count">{shortReviewCount}</div>
        <div className="favorite-count">{favoriteCount}</div>
        <div className="view-count">{viewCount}</div>
      </div>
      <div className="title">{title}</div>
      <div className="write">{writerNickname}</div>
      <div className="datetime">{writeDatetime}</div>
    </div>
  )
}