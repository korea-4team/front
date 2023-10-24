import { ShortReviewListResponseDto } from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";
import { useUserStore } from "stores";


interface Props{
  item: ShortReviewListResponseDto;
  onDelete: (shortReviewNumber : number) => void;
}

export default function ShortReviewListItem({item, onDelete}:Props){
  
  const { writerNickname, writeDatetime, contents, shortReviewNumber, writerEmail} = item;

  const {user} = useUserStore();

  const getTimeGap = () => {
    const writeDate = new Date(writeDatetime);
    writeDate.setHours(writeDate.getHours() - 9);

    const writeDateNumber = writeDate.getTime();
    const nowDateNumber = new Date().getTime();

    const gap = Math.floor((nowDateNumber - writeDateNumber) / 1000);

    let result = '';
    if (gap >= 86400) result = `${Math.floor(gap / 86400)}일 전`;
    if (gap < 86400) result = `${Math.floor(gap / 3600)}시간 전`;
    if (gap < 3600) result = `${Math.floor(gap / 60)}분 전`;
    if (gap < 60) result = `${gap}초 전`;

    return result;
  }

  return (
    <div className="shortReview-list-item-box">
      <div className="shortReview-list-item-writer">
        <div className="shortReview-list-item-writer-nickname">{writerNickname}</div>
        <div className="shortReview-list-item-writer-divider">|</div>
        <div className="shortReview-list-item-write-tiem">{getTimeGap()}</div>
        {writerEmail === user?.email && (
          <div className="shortReview-delete-button" onClick={() => onDelete(shortReviewNumber)}>{'삭제'}</div>
        )}
      </div>
      <div className="shortReview-list-item-comment">{contents}</div>
      <div className="divider"></div>
    </div>
  )
}