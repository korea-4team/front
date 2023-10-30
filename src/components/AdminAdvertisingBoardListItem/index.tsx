import './style.css';
import AdvertisingBoardListResponseDto from 'interfaces/response/advertisingBoard/advertising-board-list.response.dto';
import { useNavigate } from 'react-router';
import { ADVERTISING_BOARD_DETAIL_PATH, ADVERTISING_BOARD_PATH } from 'constant';
import { dateFormat } from 'utils';

 interface Props{
   item: AdvertisingBoardListResponseDto;
 }

// component //
export default function AdminAdvertisingBoardListItem({item}:Props) {

// state //
 const {boardNumber, shortReviewCount, title,writeDatetime,writerNickname, location, businessType} = item;

// function //

const navigator = useNavigate();

// event handler //

const onClickHandler = () => {
   navigator(ADVERTISING_BOARD_DETAIL_PATH(boardNumber));
}

// effect //

// render //
  return(
  <div className='admin-advertising-list-item-box'>
    <div className='admin-advertising-list-box'>
      <div className='admin-advertising-item-number'>{boardNumber}</div>
      <div className='admin-advertising-item-title'>{title}</div>
      <div className='admin-advertising-item-short-review-count'>{shortReviewCount}</div>
      <div className='admin-advertising-item-location'>{location}</div>
      <div className='admin-advertising-item-business'>{businessType}</div>
      <div className='admin-advertising-item-writer'>{writerNickname}</div>
      <div className='admin-advertising-item-write-datetime'>{dateFormat(writeDatetime)}</div>
    </div>
  </div>
  )
}