import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { MainBannerListResponseDto } from 'interfaces/response/banner';

interface Props {
  item: MainBannerListResponseDto;
}

//          component          //
export default function AdminBannerListItem({item}: Props) {

  //          state          //
  const {  bannerNumber, imageUrl, sequence, writeDatetime, writerEmail, eventBoardNumber } = item;

  //          function          //
  const navigator = useNavigate();

  //          event handler          //
  const onClickHandler = () => {
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-banner-list-item-box">
      <div className="admin-banner-list-box">
        <div className="admin-banner-item-number">{bannerNumber}</div>
        <div className="admin-banner-item-image-box" >
          <img className="admin-banner-item-image" src={imageUrl} />
        </div>
        <div className="admin-banner-item-sequence">{sequence}</div>
        <div className="admin-banner-item-writer">{writerEmail}</div>
        <div className="admin-banner-item-write-datetime">{dateFormat(writeDatetime)}</div>
      </div>
    </div>
  )
}
