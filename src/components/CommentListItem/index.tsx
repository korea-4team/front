import { CommentListResponseDto } from 'interfaces/response/reviewBoard/get-comment-list.response.dto';
import './style.css';

interface Props {
  item: CommentListResponseDto;
}

export default function CommentListItem({item}: Props) {

  const { nickname, writeDatetime, contents } = item;

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
    <div className="comment-list-item-box">
      <div className="comment-list-item-writer">
        <div className="comment-list-item-writer-nickname">{nickname}</div>
        <div className="comment-list-item-writer-divider">|</div>
        <div className="comment-list-item-write-time">{ getTimeGap() }</div>
      </div>
      <div className="comment-list-item-comment">{contents}</div>
      <div className="divider"></div>
    </div>
  )
}
