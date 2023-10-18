export const emailPattern = /^[A-Za-z0-9]*@([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
export const telNumberPattern = /^[0-9]{11,12}$/;

export const COUNT_BY_PAGE = 30;
export const COUNT_BY_PAGE_COMMENT = 10;
export const PAGE_BY_SECTION = 10;

export const BOARD_NUMBER_PATH_VARIABLE = ':boardNumber';
export const SEARCH_WORD_PATH_VARIABLE = ':searchWord';
export const USER_EMAIL_PATH_VARIABLE = ':userEmail';
export const ADMIN_ID_PATH_VARIABLE = ':adminId';

export const MAIN_PATH = '/';
export const AUTH_PATH = '/auth';
// export const MY_PAGE_PATH = '/my-page';
export const ADVERTISING_BOARD_PATH = '/advertising-board';
export const REVIEW_BOARD_PATH = '/review-board';
export const EVENT_BOARD_PATH = '/event-board';
export const NOTICE_BOARD_PATH = '/notice-board';
export const WRITE_PATH = 'write';

export const DETAIL_PATH = (boardNumber: number | string) => `detail/${boardNumber}`;
export const UPDATE_PATH = (boardNumber: number | string) => `update/${boardNumber}`;
export const LOCATION_PATH = (location: string) => `location/${location}`;
export const BUSINESS_TYPE_PATH = (businessType: string) => `businesstype/${businessType}`;

export const ADVERTISING_BOARD_WRITE_PATH = () => `${ADVERTISING_BOARD_PATH}/${WRITE_PATH}`;
export const ADVERTISING_BOARD_UPDATE_PATH = (boardNumber: number | string) => `${ADVERTISING_BOARD_PATH}/${UPDATE_PATH(boardNumber)}`;
export const ADVERTISING_BOARD_DETAIL_PATH = (boardNumber: number | string) => `${ADVERTISING_BOARD_PATH}/${DETAIL_PATH(boardNumber)}`;

export const REVIEW_BOARD_WRITE_PATH = () => `${REVIEW_BOARD_PATH}/${WRITE_PATH}`;
export const REVIEW_BOARD_UPDATE_PATH = (boardNumber: number | string) => `${REVIEW_BOARD_PATH}/${UPDATE_PATH(boardNumber)}`;
export const REVIEW_BOARD_DETAIL_PATH = (boardNumber: number | string) => `${REVIEW_BOARD_PATH}/${DETAIL_PATH(boardNumber)}`;

export const EVENT_BOARD_WRITE_PATH = () => `${EVENT_BOARD_PATH}/${WRITE_PATH}`;
export const EVENT_BOARD_UPDATE_PATH = (boardNumber: number | string) => `${EVENT_BOARD_PATH}/${UPDATE_PATH(boardNumber)}`;
export const EVENT_BOARD_DETAIL_PATH = (boardNumber: number | string) => `${EVENT_BOARD_PATH}/${DETAIL_PATH(boardNumber)}`;

export const NOTICE_BOARD_WRITE_PATH = () => `${NOTICE_BOARD_PATH}/${WRITE_PATH}`;
export const NOTICE_BOARD_UPDATE_PATH = (boardNumber: number | string) => `${NOTICE_BOARD_PATH}/${UPDATE_PATH(boardNumber)}`;
export const NOTICE_BOARD_DEATIL_PATH = (boardNumber: number | string) => `${NOTICE_BOARD_PATH}/${DETAIL_PATH(boardNumber)}`;

export const MY_PAGE_PATH = (email: string) => `/my-page/${email}`;
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const ADVERTISING_BOARD_SEARCH_LIST_PATH = (searchWord: string) => `/search/more/${searchWord}`;
export const REVIEW_BOARD_SEARCH_LIST_PATH = (searchWord: string) => `/search/more/${searchWord}`;