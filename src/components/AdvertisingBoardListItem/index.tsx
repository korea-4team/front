import './style.css';
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import { useNavigate } from 'react-router';
import { ADVERTISING_BOARD_DETAIL_PATH, ADVERTISING_BOARD_PATH } from 'constant';

interface Props{
  item: AdvertisingBoardListResponseDto;
}

// component //
export default function AdvertisingBoardListItem({item}:Props){

// state //
const {boardNumber, shortReviewCount, favoriteCount, title,viewCount,writeDatetime,writerNickname} = item;

// function //

const navigator = useNavigate();

// event handler //

const onClickHandler = () => {
  navigator(ADVERTISING_BOARD_DETAIL_PATH(boardNumber));
}

// effect //

// render //
  return(
    <div className='advertising-board-list-item-box'>
      <div className='advertising-board-list-box'>
        <div className='advertising-board-number'>{boardNumber}</div>
        <div className='advertising-board-title-box' onClick={onClickHandler}></div>
          <div className='advertising-board-title'>{title}</div>
          <div className='advertising-board-shortReview-count'>{shortReviewCount}</div>
      </div>
      <div className='advertising-board-writer'>{writerNickname}</div>
      <div className='advertising-write-datetime'>{writeDatetime}</div>
      <div className='advertising-favorite-count'>{favoriteCount}</div>
      <div className='advertising-board-view-count'>{viewCount}</div>
    </div>
  )
}