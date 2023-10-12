import './style.css';

//          component          //
// description: Header 레이아웃 //
export default function Header() {

//          render          //
  return (
    <div id="header">
      <div className="header-top">
        <div className="header-top-left">
          <div className="header-left-logo-text">Team Project</div>
        </div>
        <div className="header-top-right">
          <div className="button">로그인</div>
          <div className="button">로그아웃</div>
          <div className="button">마이페이지</div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-search-box">
          <input className="header-search-input" placeholder='검색어를 입력해 주세요.' />
          <div className="header-search-button">검색</div>
        </div>
      </div>
    </div>
  )
}
