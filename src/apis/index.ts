import axios from "axios";
import { PatchReviewBoardRequestDto, PostCommentRequestDto, PostReviewBoardRequestDto } from "interfaces/request/reviewBoard";
import { GetCurrentEventBoardResponseDto } from "interfaces/response/EventBoard";
import ResponseDto from "interfaces/response/response.dto";
import { DeleteCommentResponseDto, DeleteReviewBoardResponseDto, GetCommentListResponseDto, GetReviewBoardBusinessTypeListResponseDto, GetReviewBoardLocationBusinessTypeListResponseDto, GetReviewBoardLocationListResponseDto, GetReviewBoardResponseDto, PatchReviewBoardResponseDto, PostCommentResponseDto, PostReviewBoardResponseDto, PutReviewBoardFavoriteResponseDto } from "interfaces/response/reviewBoard";
import GetCurrentReviewBoardResponseDto from "interfaces/response/reviewBoard/get-current-review-board.response.dto";
import GetUserReviewBoardListResponseDto from "interfaces/response/reviewBoard/get-user-review-board-list.response.dto";

const API_DOMAIN = 'http://localhost:4040';

// description: AUTH 페이지 URL //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IP_URL = () => `${API_DOMAIN}/auth/sign-ip`;
const ACCOUNT_FIND_EMAIL_URL = () => `${API_DOMAIN}/auth/account-find/email`;
const ACCOUNT_FIND_PASSWORD_URL = () => `${API_DOMAIN}/auth/account-find/password`;

// description: 관리자 페이지 URL //
const GET_ADMIN_ADVERTISING_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/advertising-board-list`;
const GET_ADMIN_REVIEW_BOARD_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/review-board-list`;
const GET_ADMIN_SHORT_REVIEW_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/short-review-list`;
const GET_ADMIN_USER_LIST_URL = (adminId: string, section: number | string) => `${API_DOMAIN}/admin/${adminId}/user-list/${section}`;
const GET_ADMIN_USER_DETAIL_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}`;
const GET_ADMIN_USER_STORE_INFO_URL = (adminId: string, userEmail:string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/store-info`;
const GET_ADMIN_USER_REVIEW_BOARD_LIST_URL = (adminId: string, userEmail:string, section: number | string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/review-board-list/${section}`;
const GET_ADMIN_USER_SHORT_REVIEW_LIST_URL = (adminId: string, userEmail:string, section: number | string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/short-review-list/${section}`;
const GET_ADMIN_USER_COMMENT_LIST_URL = (adminId: string, userEmail:string, section: number | string) => `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/comment-list/${section}`;
const GET_ADMIN_BANNER_LIST_URL = (adminId: string) => `${API_DOMAIN}/admin/${adminId}/main-banner/list`;
const GET_ADMIN_BANNER_DETAIL_URL = (adminId: string, bannerNumber: number | string) => `${API_DOMAIN}/admin/${adminId}/main-banner/detail/${bannerNumber}`;
const POST_ADMIN_BANNER_URL = (eventBoardNumber: number | string) => `${API_DOMAIN}/admin/${eventBoardNumber}/main-banner`;
const PATCH_ADMIN_BANNER_URL = (bannerNumber: number | string) => `${API_DOMAIN}/admin/${bannerNumber}/main-banner`;
const DELETE_ADMIN_BANNER_URL = (bannerNumber: number | string) => `${API_DOMAIN}/admin/${bannerNumber}/main-banner`;

// description: 이벤트게시판 URL //
const GET_EVENT_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/event-board/board-list/${section}`;
const GET_EVENT_BOARD_DETAIL_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;
const POST_EVENT_BOARD_URL = () => `${API_DOMAIN}/event-board`;
const PATCH_EVENT_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;
const DELETE_EVENT_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/event-board/${boardNumber}`;

// description: 공지사항게시판 URL //
const GET_NOTICE_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/notice-board/board-list/${section}`;
const GET_NOTICE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/${boardNumber}`;
const POST_NOTICE_BOARD_URL = () => `${API_DOMAIN}/notice-board`;
const PATCH_NOTICE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/${boardNumber}`;
const DELETE_NOTICE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/notice-board/${boardNumber}`;

// description: 마이페이지 URL //
const POST_MY_PAGE_REGISTRANTION_URL = () => `${API_DOMAIN}/my-page/registration`;
const GET_MY_PAGE_REGISTRANTION_URL = () => `${API_DOMAIN}/my-page/registration-list`;
const GET_MY_PAGE_BOARD_LIST_URL = () => `${API_DOMAIN}/my-page/board-list`;
const GET_MY_PAGE_COMMENT_LIST_URL = () => `${API_DOMAIN}/my-page/comment-list`;
const GET_MY_PAGE_SHORT_REIVEW_URL = () => `${API_DOMAIN}/my-page/short-reivew`;
const GET_MY_PAGE_STORE_INFO_URL = () => `${API_DOMAIN}/my-page/store-info`;
const GET_MY_PAGE_STORE_RESERVATION_LIST_URL = () => `${API_DOMAIN}/my-page/store-reservation-list`;
const PATCH_MY_PAGE_INFO_CHANGE_URL = () => `${API_DOMAIN}/my-page/user-info-change`;

// description: 광고게시판 URL //
const GET_ADVERTISING_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/advertising-board/current-board/${section}`;
const GET_ADVERTISING_BOARD_LOCATION_LIST_URL = (location: string) => `${API_DOMAIN}/advertising-board/board-list/location/${location}`;
const GET_ADVERTISING_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) => `${API_DOMAIN}/advertising-board/board-list/businesstype${businessType}`;
const GET_ADVERTISING_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (location: string, businessType: string) => `${API_DOMAIN}/advertising-board/board-list/${location}/${businessType}`;
const GET_ADVERTISING_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/board-list/${boardNumber}`;
const GET_ADVERTISING_BOARD_SHORT_REVIEW_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review/list`;
// const GET_ADVERTISING_BOARD_USER_LIST_URL = (email: string) => `${API_DOMAIN}/advertising-board/user-list/${email}`;
const POST_ADVERTISING_BOARD_URL = () => `${API_DOMAIN}/advertising-board`;
const POST_ADVERTISING_BOARD_SHORT_REVIEW_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review`;
const PUT_ADVERTISING_BOARD_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}/favorite`;
const PATCH_ADVERTISING_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_SHORT_REVIEW_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review`;
const POST_ADVERTISING_BOARD_RESERVATION_URL = (boardNumber: number | string) => `${API_DOMAIN}/advertising-board/${boardNumber}/reservation`;

// description: 기행기 게시판 URL //
const GET_REVIEW_BOARD_LIST_URL = (section: number | string) => `${API_DOMAIN}/review-board/board-list/section/${section}`;
const GET_REVIEW_BOARD_LOCATION_LIST_URL = (location: string) => `${API_DOMAIN}/review-board/board-list/location/${location}`;
const GET_REVIEW_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) => `${API_DOMAIN}/review-board/board-list/businesstype/${businessType}`;
const GET_REVIEW_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (location: string, businessType: string) => `${API_DOMAIN}/review-board/board-list/${location}/${businessType}`;
const GET_REVIEW_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}`;
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


// description: 기행기 게시판 //
export const getCurrentReviewBoardListRequest = async (section: number | string) => {
  const result = await axios.get(GET_REVIEW_BOARD_LIST_URL(section))
  .then((response) => {
    const responseBody: GetCurrentReviewBoardResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardLocationListRequest = async (location: string) => {
  const result = await axios.get(GET_REVIEW_BOARD_LOCATION_LIST_URL(location))
  .then((response) => {
    const responseBody: GetReviewBoardLocationListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardBusinessTypeListRequest = async (businessType: string) => {
  const result = await axios.get(GET_REVIEW_BOARD_BUSINESSTYPE_LIST_URL(businessType))
  .then((response) => {
    const responseBody: GetReviewBoardBusinessTypeListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardLocationBusinessTypeListRequest = async (location: string, businessType: string) => {
  const result = await axios.get(GET_REVIEW_BOARD_LOCATION_BUSINESSTYPE_LIST_URL(location, businessType))
  .then((response) => {
    const responseBody: GetReviewBoardLocationBusinessTypeListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardRequest = async (boardNumber: number | string) => {
  const result = await axios.get(GET_REVIEW_BOARD_URL(boardNumber))
  .then((response) => {
    const responseBody: GetReviewBoardResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardCommentListRequest = async (boardNumber: number | string) => {
  const result = await axios.get(GET_REVIEW_BOARD_COMMENT_LIST_URL(boardNumber))
  .then((response) => {
    const responseBody: GetCommentListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardUserListRequest = async (email: string) => {
  const result = await axios.get(GET_REVIEW_BOARD_USER_LIST_URL(email))
  .then((response) => {
    const responseBody: GetUserReviewBoardListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const postReviewBoardRequest = async (data: PostReviewBoardRequestDto, token: string) => {
  const result = await axios.post(POST_REVIEW_BOARD_URL(), data, { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: PostReviewBoardResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const postReviewBoardCommentRequest = async (boardNumber: number | string, data: PostCommentRequestDto, token: string) => {
  const result = await axios.post(POST_REVIEW_BOARD_COMMENT_URL(boardNumber), data, { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: PostCommentResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const putReviewBoardFavoriteRequest = async (boardNumber: number | string, token: any) => {
  const result = await axios.put(PUT_REVIEW_BOARD_FAVORITE_URL(boardNumber), {}, { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: PutReviewBoardFavoriteResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const patchReviewBoardRequest = async (boardNumber: number | string, data: PatchReviewBoardRequestDto , token: string) => {
  const result = await axios.patch(PATCH_REVIEW_BOARD_URL(boardNumber), data, { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: PatchReviewBoardResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const deleteReviewBoardRequest = async (boardNumber: number | string, token: string) => {
  const result = await axios.delete(DELETE_REVIEW_BOARD_URL(boardNumber), { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: DeleteReviewBoardResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const deleteReviewBoardCommentRequest = async (boardNumber: number | string, token: string) => {
  const result = await axios.delete(DELETE_REVIEW_BOARD_COMMENT_URL(boardNumber), { headers: {Authorization: `Bearer ${token}`} })
  .then((response) => {
    const responseBody: DeleteCommentResponseDto = response.data;
    const { code } = responseBody;
    return code;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    const { code } = responseBody;
    return code;
  });
  return result;
}

export const getCurrentEventBoardListRequest = async (section: number) => {
  const result = await axios.get(GET_EVENT_BOARD_LIST_URL(section))
  .then((response) => {
    const responseBody: GetCurrentEventBoardResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}