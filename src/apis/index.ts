const API_DOMAIN = 'http://localhost:4040';

// description: AUTH 페이지 URL //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IP_URL = () => `${API_DOMAIN}/auth/sign-ip`;
const ACCOUNT_FIND_EMAIL_URL = () => `${API_DOMAIN}/auth/account-find/email`;
const ACCOUNT_FIND_PASSWORD_URL = () => `${API_DOMAIN}/account-find/password`;

// description: 관리자 페이지 URL //
const GET_ADMIN_ADVERTISING_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/advertising-board-list`;
const GET_ADMIN_REVIEW_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/review-board-list`;
const GET_ADMIN_SHORT_REVIEW_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/short-review-list`;
const GET_ADMIN_USER_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/user-list`;
const GET_ADMIN_USER_DETAIL_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}`;
const GET_ADMIN_USER_STORE_INFO_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/store-info`;
const GET_ADMIN_USER_REVIEW_BOARD_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/review-board-list`;
const GET_ADMIN_USER_SHORT_REVIEW_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/short-review-list`;
const GET_ADMIN_USER_COMMENT_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/comment-list`;
const GET_ADMIN_BANNER_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/main-banner/list`;
const GET_ADMIN_BANNER_DETAIL_URL = (adminId: string, bannerNumber: number | string) => `${API_DOMAIN}/admin/${adminId}/main-banner/detail/${bannerNumber}`;
const POST_ADMIN_BANNER_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/write/${eventBoardNumber}/main-banner`;
const PATCH_ADMIN_BANNER_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/update/${eventBoardNumber}/main-banner`;
const DELETE_ADMIN_BANNER_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/delete/${eventBoardNumber}/main-banner`;

// description: 이벤트게시판 URL //
const GET_EVENT_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/event-board/board-list/${section}`;
const GET_EVENT_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;
const POST_EVENT_BOARD_URL = () => `${API_DOMAIN}/event-board`;
const PATCH_EVENT_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;
const DELETE_EVENT_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;

// description: 공지사항게시판 URL //
const GET_NOTICE_BOARD_LIST_URL = () => `${API_DOMAIN}/notice-board/board-list`;
const GET_NOTICE_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/detail/${boardNumber}`;
const POST_NOTICE_BOARD_URL = () => `${API_DOMAIN}/notice-board/write`;
const PATCH_NOTICE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/update/${boardNumber}`;
const DELETE_NOTICE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/delete/${boardNumber}`;

// description: 마이페이지 URL //
const POST_MY_PAGE_REGISTRANTION_URL = () => `${API_DOMAIN}/my-page/registration`;
// const GET_MY_PAGE_REGISTRANTION_URL = () => `${API_DOMAIN}/my-page/registration-list`;
const GET_MY_PAGE_BOARD_LIST_URL = () => `${API_DOMAIN}/my-page/board-list`;
const GET_MY_PAGE_COMMENT_LIST_URL = () => `${API_DOMAIN}/my-page/comment-list`;
const GET_MY_PAGE_SHORT_REIVEW_URL = () => `${API_DOMAIN}/my-page/short-reivew`;
const GET_MY_PAGE_STORE_INFO_URL = () => `${API_DOMAIN}/my-page/store-info`;
const GET_MY_PAGE_STORE_RESERVATION_LIST_URL = () => `${API_DOMAIN}/my-page/store-reservation-list`;
const PATCH_MY_PAGE_INFO_CHANGE_URL = () => `${API_DOMAIN}/my-page/user-info-change`;

// description: 광고게시판 URL //
const GET_ADVERTISING_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/advertising-board/current-board/${section}`;
const GET_ADVERTISING_BOARD_LOCATION_LIST_URL = (location: string) => `${API_DOMAIN}/advertising-board/board-list/location/${location}`;
const GET_ADVERTISING_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) => `${API_DOMAIN}/advertising-board/board-list/business-type${businessType}`;
// const ADVERTISING_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (location: string, businessType: string) => `${API_DOMAIN}/advertising-board/board-list/${location}/${businessType}`;
const GET_ADVERTISING_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/board-list/${boardNumber}`;
const GET_ADVERTISING_BOARD_SHORT_REVIEW_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/detail/${boardNumber}/short-review/list`;
// const ADVERTISING_BOARD_USER_LIST_URL = (email: string) => `${API_DOMAIN}/advertising-board/user-list/${email}`;
const POST_ADVERTISING_BOARD_URL = () => `${API_DOMAIN}/advertising-board/write`;
const POST_ADVERTISING_BOARD_SHORT_REVIEW_WRITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/detail/${boardNumber}/short-review`;
const PUT_ADVERTISING_BOARD_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/detail/${boardNumber}/favorite`;
const PATCH_ADVERTISING_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/update/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/delete/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_SHORT_REVIEW_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/detail/${boardNumber}/short-review/delete`;
const POST_ADVERTISING_BOARD_RESERVATION_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/detail/${boardNumber}/reservation`;

// description: 기행기 게시판 URL //
const GET_REVIEW_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/review-board/board-list/section/${section}`;
const GET_REVIEW_BOARD_LOCATION_LIST_URL = (location: string) => `${API_DOMAIN}/review-board/board-list/location/${location}`;
const GET_REVIEW_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) => `${API_DOMAIN}/review-board/board-list/businesstype/${businessType}`;
const GET_REVIEW_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (location: string, businessType: string) => `${API_DOMAIN}/review-board/board-list/${location}/${businessType}`;
const GET_REVIEW_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}`;
const GET_REVIEW_BOARD_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}/comment-list`;
const GET_REVIEW_BOARD_USER_LIST_URL = (email: string) => `${API_DOMAIN}/review-board/user-list/${email}`;
const POST_REVIEW_BOARD_URL = () => `${API_DOMAIN}/review-board`;
const POST_REVIEW_BOARD_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}/comment`;
const PUT_REVIEW_BOARD_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}/favorite`;
const PATCH_REVIEW_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}`;
const DELETE_REVIEW_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}`;
const DELETE_REVIEW_BOARD_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}/comment`;

// description: 검색게시판 URL //
const GET_SEARCH_LIST_URL = (searchWord: string, location?: string) => location ? `${API_DOMAIN}/search/${location}/${searchWord}` : `${API_DOMAIN}/search/${searchWord}`
const GET_SEARCH_REVIEW_BOARD_LIST_URL = (searchWord: string, section: number | string ,location?: string) => location ? `${API_DOMAIN}/search/review-board/${location}/${searchWord}/${section}` : `${API_DOMAIN}/search/review-board/${searchWord}/${section}`
const GET_SEARCH_ADVERTISING_BOARD_LIST_URL = (searchWord: string, section: number | string ,location?: string) => location ? `${API_DOMAIN}/search/advertising-board/${location}/${searchWord}/${section}` : `${API_DOMAIN}/search/advertising-board/${searchWord}/${section}`

const UPLOAD_FILE = () => `http://localhost:4040/file/upload`;