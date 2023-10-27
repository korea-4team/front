export const emailPattern = /^[A-Za-z0-9]*@([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
export const telNumberPattern = /^[0-9]{11,12}$/;

export const COUNT_BY_PAGE = 30;
export const COUNT_BY_MAIN_BOARD_PAGE = 10;
export const COUNT_BY_PAGE_COMMENT = 10;
export const PAGE_BY_SECTION = 10;

export const BOARD_NUMBER_PATH_VARIABLE = ':boardNumber';
export const SEARCH_LOCATION_PATH_VARIABLE = ':searchLocation';
export const SEARCH_WORD_PATH_VARIABLE = ':searchWord';
export const USER_EMAIL_PATH_VARIABLE = ':userEmail';
export const ADMIN_ID_PATH_VARIABLE = ':adminId';
export const BANNER_NUMBER_PATH_VARIABLE = ':bannerNumber';

export const MAIN_PATH = '/';
export const AUTH_PATH = '/auth';
// export const MY_PAGE_PATH = '/my-page';
export const ADVERTISING_BOARD_PATH = '/advertising-board';
export const REVIEW_BOARD_PATH = '/review-board';
export const EVENT_BOARD_PATH = '/event-board';
export const NOTICE_BOARD_PATH = '/notice-board';
export const ADMIN_PATH = '/admin';
export const BANNER_PATH = 'main-banner';
export const WRITE_PATH = 'write';
export const SEARCH_PATH = '/search';


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

export const ADMIN_GET_ADVERTISING_BOARD_LIST_PATH = () => `${ADMIN_PATH}/advertising-board-list`;
export const ADMIN_GET_SHORT_REVIEW_BOARD_LIST_PATH = () => `${ADMIN_PATH}/short-review-board-list`;
export const ADMIN_GET_USER_LIST_PATH = () => `${ADMIN_PATH}/user-list`;
export const ADMIN_USER_DETAIL_PATH = (adminId: string, userEmail: string) => `${ADMIN_PATH}/${adminId}/user-detail/${userEmail}`;
export const ADMIN_USER_REVIEW_BOARD_LIST_PATH = (adminId: string, userEmail: string, section: number | string) => `${ADMIN_PATH}/${adminId}/user-list/${userEmail}/review-board-list/${section}`;
export const ADMIN_USER_SHORT_REVIEW_BOARD_LIST_PATH = (adminId: string, userEmail: string, section: number | string) => `${ADMIN_PATH}/${adminId}/user-list/${userEmail}/short_review-board-list/${section}`;
export const ADMIN_USER_COMMENT_BOARD_LIST_PATH = (adminId: string, userEmail: string, section: number | string) => `${ADMIN_PATH}/${adminId}/user-list/${userEmail}/comment-list/${section}`;

export const ADMIN_BANNER_PATH = () => `${ADMIN_PATH}/${BANNER_PATH}`;
export const ADMIN_BANNER_WRITE_PATH = () => `${ADMIN_PATH}/${BANNER_PATH}/${WRITE_PATH}`;
export const ADMIN_BANNER_UPDATE_PATH = (bannerNumber: number | string) => `${ADMIN_PATH}/${BANNER_PATH}/${UPDATE_PATH(bannerNumber)}`;

export const MY_PAGE_PATH = (email: string) => `/my-page/${email}`;
export const SEARCH_BOARD_PATH = (location: string, searchWord: string) => `${SEARCH_PATH}/${location}/${searchWord}`;
export const ADVERTISING_BOARD_SEARCH_LIST_PATH = (location: string, searchWord: string) => `${SEARCH_PATH}/advertising-board/more/${location}/${searchWord}`;
export const REVIEW_BOARD_SEARCH_LIST_PATH = (location: string, searchWord: string) => `${SEARCH_PATH}/review-board/more/${location}/${searchWord}`;