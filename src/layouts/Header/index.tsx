import { useLocation, useNavigate,  } from 'react-router-dom';
import './style.css';
import { useUserStore } from 'stores';
import { useCookies } from 'react-cookie';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ADMIN_ID_PATH_VARIABLE, ADMIN_PAGE_PATH, ADMIN_PATH, ADVERTISING_BOARD_PATH, AUTH_PATH, EVENT_BOARD_PATH, MAIN_PATH, MY_PAGE_PATH, NOTICE_BOARD_PATH, REVIEW_BOARD_PATH, SEARCH_PATH } from 'constant';

//          component          //
// description: Header 레이아웃 //
export default function Header() {
  
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          state          //
  // description: 검색 버튼 Ref 상태 //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  // description: url 경로 상태 //
  const { pathname } = useLocation();
  // description: 로그인 유저 정보 상태 //
  const { user, setUser } = useUserStore();
  // description: Cookie 상태 //
  const [cookie, setCookie] = useCookies();
  // description: 로그인 상태 //
  const [login, setLogin] = useState<boolean>(false);
  // description: 검색어 상태 //
  const [search, setSearch] = useState<string>('');
  // description: more 버튼 상태 //
  const [showMore, setShowMore] = useState<boolean>(false);
  // description: 지역 상태 //
  const [location, setLocation] = useState<string>('');

  //          function          //
  const isAuth = pathname === AUTH_PATH;
  const isMyPage = user && pathname.includes(MY_PAGE_PATH(user.email));

  //          event handler          //
  // description: 검색어 변경 이벤트 //
  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const onSearchButtonClickHandler = () => {
    if (!search) {
      alert('검색어를 입력해주세요.');
      return
    }
    navigator(SEARCH_PATH(search))
  }

  const onLogoClickHandler = () => {
    navigator(MAIN_PATH);
  }

  const onSignInButtonClickHandler = () => {
    navigator(AUTH_PATH);
  }
  
  const onMyPageButtonClickHandler = () => {
    if (!user) return;
    navigator(MY_PAGE_PATH(user?.email));
  }

  const onSignOutButtonClickHandler = () => {
    setCookie('accessToken', '', { expires: new Date(), path: MAIN_PATH });
    setLogin(false);
    setUser(null);
    navigator(MAIN_PATH)
  }

  const onSearchEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }

  const onAdvertisingButtonClickHandler = () => {
    navigator(ADVERTISING_BOARD_PATH);
  }

  const onReviewBoardButtonClickHandler = () => {
    navigator(REVIEW_BOARD_PATH);
  }

  const onEventBoardButtonClickHandler = () => {
    navigator(EVENT_BOARD_PATH);
  }

  const onNoticeBoardButtonClickHandler = () => {
    navigator(NOTICE_BOARD_PATH);
  }

  const onAdminBoardButtonClickHandler = () => {
    navigator(ADMIN_PAGE_PATH(user?.email as string));
  }

  const onLocationMoreButtonClickHandler = () => {
    setShowMore(!showMore);
  }

  const onLocationButtonClickHandler = (location: string) => {
    setLocation(location);
    setShowMore(false);
  }

  //          effect          //
  // description: 로그인 유저 정보가 바뀔 때 마다 실행 //
  useEffect(() => {
    setLogin(user !== null);
  }, [user]);
  // description: path url이 바뀔 때 마다 실행 //
  useEffect(() => {
    if (!pathname.includes(SEARCH_PATH(''))) {
    setSearch('');
    }
  }, [pathname]);

//          render          //
  return (
    <div id="header">
      <div className="header-top">
        <div className="header-top-left" onClick={onLogoClickHandler}>
          <div className="header-left-logo-text">Team Project</div>
        </div>
        <div className="header-top-right">
          {
            !login ? (<div className="button" onClick={onSignInButtonClickHandler}>로그인</div>) :
              (<><div className="button" onClick={onMyPageButtonClickHandler}>마이페이지</div>
              <div className="button" onClick={onSignOutButtonClickHandler}>로그아웃</div></>)
          }
        </div>
      </div>
      <div className="header-middle">
        <div className="header-category">
          <div className="category-button" onClick={onAdvertisingButtonClickHandler}>광고</div>
          <div className="category-button" onClick={onReviewBoardButtonClickHandler}>기행기</div>
          <div className="category-button" onClick={onEventBoardButtonClickHandler}>이벤트</div>
          <div className="category-button" onClick={onNoticeBoardButtonClickHandler}>공지사항</div>
          <div className="category-button" onClick={onAdminBoardButtonClickHandler}>관리자</div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-search-box">
          <div className="location-group">
            <div className="location-top" onClick={onLocationMoreButtonClickHandler}>{location ? location : '지역'}</div>
            {showMore && (
              <div className="location-button-group">
                <div className="location-button" onClick={() => onLocationButtonClickHandler('서울')}>{'서울'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('대전')}>{'대전'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('대구')}>{'대구'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('부산')}>{'부산'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('인천')}>{'인천'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('광주')}>{'광주'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('울산')}>{'울산'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('제주')}>{'제주'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('경기')}>{'경기'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('강원')}>{'강원'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('충북')}>{'충북'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('충남')}>{'충남'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('전북')}>{'전북'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('전남')}>{'전남'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('경북')}>{'경북'}</div>
                <div className="location-button" onClick={() => onLocationButtonClickHandler('경남')}>{'경남'}</div>
              </div>
            )}
          </div>
          <input className="header-search-input" placeholder='검색어를 입력해 주세요.' value={search} onChange={onSearchChangeHandler} onKeyDown={onSearchEnterPressHandler}/>
          <div ref={searchButtonRef} className="header-search-icon-box" onClick={onSearchButtonClickHandler}>
            <div className="header-search-icon"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
