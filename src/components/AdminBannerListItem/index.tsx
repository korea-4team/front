import './style.css';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from 'utils';
import { MainBannerListResponseDto } from 'interfaces/response/banner';
import { deleteBanenrRequest } from 'apis';
import { useCookies } from 'react-cookie';

interface Props {
  item: MainBannerListResponseDto;
}

//          component          //
export default function AdminBannerListItem({item}: Props) {

  //          state          //
  // description : 쿠키 상태 //
  const [cookie, setCookie] = useCookies();

  const { bannerNumber, imageUrl, sequence, writeDatetime, writerEmail, eventBoardNumber } = item;

  //          function          //
  const navigator = useNavigate();

  // description : 게시물 삭제 응답 처리 함수 //
  const deleteBannerResponseHandler = (code: string) => {
    if (code === "NA") alert("관리자 아이디가 아닙니다.");
    if (code === "NB") alert("존재하지 않는 베너입니다.");
    if (code === "NP") alert("권한이 없습니다.");
    if (code === "VF") alert("잘못된 입력입니다.");
    if (code === "DE") alert("데이터 베이스 에러입니다.");
    if (code !== "SU") return;

    alert("베너를 삭제하였습니다.");
    
  }

  //          event handler          //
  // description : 삭제 버튼 클릭 이벤트 //
  const ondeleteButtonClickHandler = () => {
    if(!bannerNumber) return;
    const token = cookie.accessToken;
    deleteBanenrRequest(bannerNumber, token).then(
      deleteBannerResponseHandler
    );
  }

  //          effect          //

  //          render          //
  return (
    <div className="admin-banner-list-item-box">
      <div className="admin-banner-list-box">
        <div className="admin-banner-item-right" >
          <img className="admin-banner-item-image" src={imageUrl} />
        </div>
        <div className='admin-banner-item-left'>
          <div className="admin-banner-item-sequence"> 순서 : {sequence}</div>
          <div className="admin-banner-item-writer"> 작성자 : {writerEmail}</div>
          <div className="admin-banner-item-write-datetime"> 등록 일자 : {dateFormat(writeDatetime)}</div>
        </div>
      </div>
      <div className='admin-banner-button'>
        <div className='black-button' >수정</div>
        <div className='black-button' onClick={ondeleteButtonClickHandler}>삭제</div>
      </div>
    </div>
  )
}
