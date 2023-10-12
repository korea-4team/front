const API_DOMAIN = 'http://localhost:4040';

// description: AUTH 페이지 URL //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IP_URL = () => `${API_DOMAIN}/auth/sign-ip`;
const ACCOUNT_FIND_EMAIL_URL = () => `${API_DOMAIN}/auth/account-find/email`;
const ACCOUNT_FIND_PASSWORD_URL = () => `${API_DOMAIN}/account-find/password`;

// description: 관리자 페이지 URL //
const ADMIN_ADVERTISING_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/advertising-board-list`;
const ADMIN_REVIEW_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/review-board-list`;
const ADMIN_SHORT_REVIEW_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/short-review-list`;
const ADMIN_USER_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/user-list`;
const ADMIN_USER_DETAIL_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}`;
const ADMIN_USER_STORE_INFO_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/store-info`;
const ADMIN_USER_REVIEW_BOARD_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/review-board-list`;
const ADMIN_USER_SHORT_REVIEW_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/short-review-list`;
const ADMIN_USER_COMMENT_LIST_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/comment-list`;
const ADMIN_BANNER_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/main-banner/list`;
const ADMIN_BANNER_DETAIL_URL = (adminId: string, bannerNumber: number | string) => `${API_DOMAIN}/admin/${adminId}/main-banner/detail/${bannerNumber}`;
const ADMIN_BANNER_WRITE_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/write/${eventBoardNumber}/main-banner`;
const ADMIN_BANNER_UPDATE_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/update/${eventBoardNumber}/main-banner`;
const ADMIN_BANNER_DELETE_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/delete/${eventBoardNumber}/main-banner`;

// description: 이벤트게시판 URL //
const EVENT_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/event-board/board-list/${section}`;
const EVENT_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;
const EVENT_BOARD_WRITE_URL = () => `${API_DOMAIN}/event-board`;
const EVENT_BOARD_DELETE_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;

// description: 공지사항게시판 URL //
const NOTICE_BOARD_LIST_URL = () => `${API_DOMAIN}/notice-board/board-list`;
const NOTICE_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/detail/${boardNumber}`;
const NOTICE_BOARD_WRITE_URL = () => `${API_DOMAIN}/notice-board/write`;
const NOTICE_BOARD_UPDATE_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/update/${boardNumber}`;
const NOTICE_BOARD_DELETE_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/delete/${boardNumber}`;

const UPLOAD_FILE = () => `http://localhost:4040/file/upload`;