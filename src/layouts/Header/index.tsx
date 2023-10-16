import { useNavigate } from 'react-router-dom';
import './style.css';
import { AUTH_PATH } from 'constant';

//          component          //
// description: Header 레이아웃 //
export default function Header() {
  
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //           event handler: 로그인 버튼 클릭 이벤트 처리         //
  const onSignUpButtonClickHandler = () => {
    navigator(AUTH_PATH);
  }

//          render          //
  return (
    <div id="header">
      <div className="header-top">
        <div className="header-top-left">
          <div className="header-left-logo-text">Team Project</div>
        </div>
        <div className="header-top-right">
          <div className="button" onClick={onSignUpButtonClickHandler}>로그인</div>
          <div className="button">로그아웃</div>
          <div className="button">마이페이지</div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-search-box">
          <input className="header-search-input" placeholder='검색어를 입력해 주세요.' />
          <div className="header-search-icon-box">
            <div className="header-search-icon"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
