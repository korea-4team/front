import './style.css';
import { useUserStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_COMMENT_PATH, MY_PAGE_PATH, MY_PAGE_SHORT_REVIEW_PATH } from 'constant';


//          component : 마이페이지 하단 왼쪽 컴포넌트 //
export default function MyPageMenu() {
  //          state         //
  // description: 유저 정보 상태 //
  const {user} = useUserStore();

  //          function          //
  // description : 네비게이트 함수//
  const navigator = useNavigate();

  //          event handler         //
  // description : 내 게시글 클릭 이벤트 //
  const onMyBoardClickButton = () => {
    navigator(MY_PAGE_PATH(user?.email as string));
  }

  // description : 내 댓글 클릭 이벤트 //
    const onMyCommentClickButton = () => {
    navigator(MY_PAGE_COMMENT_PATH(user?.email as string));
  }

  // description : 내 한줄리뷰 클릭 이벤트 //
  const onMyShortReviewButton = () => {
    navigator(MY_PAGE_SHORT_REVIEW_PATH(user?.email as string));
  }

  //          effect          //

  //          render          //
  return (
    <div className='user-info-bottom-left-item'>
      <div className='user-info-bottom-left-menu-button' onClick={onMyBoardClickButton}> 내 게시글 </div>
      <div className='user-info-bottom-left-menu-button' onClick={onMyCommentClickButton}> 내 댓글 </div>
      <div className='user-info-bottom-left-menu-button' onClick={onMyShortReviewButton}> 내 한줄리뷰 </div>
      <div className='user-info-bottom-left-menu-button'> 내 예약내역 </div>
      <div className='user-info-bottom-left-menu-button'> 내 가게 </div>
      <div className='user-info-bottom-left-menu-button'> 내 가게예약정보</div>
    </div>
  );
};
