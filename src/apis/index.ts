import axios from "axios";
import { error } from "console";
import { ADMIN_ID_PATH_VARIABLE } from "constant";
import PatchAdvertisingBoardDto from "interfaces/request/advertisingBoard/patch-advertising-board.request.dto";
import PostAdvertisingBoardDto from "interfaces/request/advertisingBoard/post-advertising-board.request.dto";
import { AccountFindEmailRequestDto, AccountFindPasswordRequestDto, SignInRequestDto, SignUpRequestDto } from "interfaces/request/auth";
import {
  PatchNoticeBoardRequestDto,
  PostNoticeBoardRequestDto,
} from "interfaces/request/noticeBoard";
import {
  PatchReviewBoardRequestDto,
  PostCommentRequestDto,
  PostReviewBoardRequestDto,
} from "interfaces/request/reviewBoard";
import { GetCurrentEventBoardResponseDto } from "interfaces/response/EventBoard";
import { GetUserListResponseDto } from "interfaces/response/admin";
import DeleteAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/delete-advertising-board.response.dto";
import DeleteShortCommentAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/delete-shortcomment-advertising-board.response.dto";
import GetAdvertisingBoardBusinessTypeResponseDto from "interfaces/response/advertisingBoard/get-advertising-board-businessType-list-responsedto";
import GetAdvertisingBoardBusinessTypeLocationResponseDto from "interfaces/response/advertisingBoard/get-advertising-board-businessType-location.Response.dto";
import GetAdvertisingLocationListResponseDto from "interfaces/response/advertisingBoard/get-advertising-board-location-list.response.dto";
import GetAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-advertising-board.response.dto";
import GetCurrentAdvertisingBoardResponeDto from "interfaces/response/advertisingBoard/get-current-advertising-board-response.dto";
import GetSearchAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/get-search-advertising-board.response.dto";
import GetShortReviewListResponseDto from "interfaces/response/advertisingBoard/get-shortreview-list.response.dto";
import PatchAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/patch-advertising-board.response.dto";
import PostAdvertisingBoardResponseDto from "interfaces/response/advertisingBoard/post-advertising-board.response.dto";
import PostShortReviewResponseDto from "interfaces/response/advertisingBoard/post-short-review.response.dto";
import PutAdvertisingFavoriteListResponseDto from "interfaces/response/advertisingBoard/put-advertising-favorite-list.response.dto";
import { AccountFindEmailResponseDto, AccountFindPasswordResponseDto, SignInResponseDto, SignUpResponseDto } from "interfaces/response/auth";
import {
  DeleteNoticeBoardResponseDto,
  GetNoticeBoardListResponseDto,
  GetNoticeBoardResponseDto,
  PatchNoticeBoardResponseDto,
  PostNoticeBoardResponseDto,
} from "interfaces/response/noticeBoard";
import ResponseDto from "interfaces/response/response.dto";
import {
  DeleteCommentResponseDto,
  DeleteReviewBoardResponseDto,
  GetCommentListResponseDto,
  GetReviewBoardBusinessTypeListResponseDto,
  GetReviewBoardLocationBusinessTypeListResponseDto,
  GetReviewBoardLocationListResponseDto,
  GetReviewBoardResponseDto,
  GetSearchReviewBoardListResponseDto,
  PatchReviewBoardResponseDto,
  PostCommentResponseDto,
  PostReviewBoardResponseDto,
  PutReviewBoardFavoriteResponseDto,
} from "interfaces/response/reviewBoard";
import GetFavoriteListResponseDto from "interfaces/response/reviewBoard/get-review-board-favorite-list-response.dto";
import GetReviewBoardListResponseDto from "interfaces/response/reviewBoard/get-review-board-list.response.dto";
import GetUserReviewBoardListResponseDto from "interfaces/response/reviewBoard/get-user-review-board-list.response.dto";
import GetSearchResponseDto from "interfaces/response/search/get-search.response.dto";
import { GetSignInUserResponseDto } from "interfaces/response/user";

const API_DOMAIN = "http://localhost:4040";

// description: AUTH 페이지 URL //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const ACCOUNT_FIND_EMAIL_URL = () => `${API_DOMAIN}/auth/account-find/email`;
const ACCOUNT_FIND_PASSWORD_URL = () =>
  `${API_DOMAIN}/auth/account-find/password`;

// description: 유저 모듈 URL //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

// description: 관리자 페이지 URL //
const GET_ADMIN_REVIEW_BOARD_LIST_URL = (adminId: string, section: number) =>
  `${API_DOMAIN}/admin/${adminId}/review-board-list/${section}`;
const GET_ADMIN_SHORT_REVIEW_LIST_URL = (adminId: string) =>
  `${API_DOMAIN}/admin/${adminId}/short-review-list`;
const GET_ADMIN_USER_LIST_URL = (adminId: string, section: number | string) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${section}`;
const GET_ADMIN_USER_DETAIL_URL = (adminId: string, userEmail: string) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}`;
const GET_ADMIN_ADVERTISING_BOARD_LIST_URL = (adminId: string) =>
`${API_DOMAIN}/admin/${adminId}/advertising-board-list`;
const GET_ADMIN_USER_STORE_INFO_URL = (adminId: string, userEmail: string) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/store-info`;
const GET_ADMIN_USER_REVIEW_BOARD_LIST_URL = (
  adminId: string,
  userEmail: string,
  section: number | string
) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/review-board-list/${section}`;
const GET_ADMIN_USER_SHORT_REVIEW_LIST_URL = (
  adminId: string,
  userEmail: string,
  section: number | string
) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/short-review-list/${section}`;
const GET_ADMIN_USER_COMMENT_LIST_URL = (
  adminId: string,
  userEmail: string,
  section: number | string
) =>
  `${API_DOMAIN}/admin/${adminId}/user-list/${userEmail}/comment-list/${section}`;
const GET_ADMIN_BANNER_LIST_URL = (adminId: string) =>
  `${API_DOMAIN}/admin/${adminId}/main-banner/list`;
const GET_ADMIN_BANNER_DETAIL_URL = (
  adminId: string,
  bannerNumber: number | string
) => `${API_DOMAIN}/admin/${adminId}/main-banner/detail/${bannerNumber}`;
const POST_ADMIN_BANNER_URL = () =>
  `${API_DOMAIN}/admin/main-banner`;
const PATCH_ADMIN_BANNER_URL = (bannerNumber: number | string) =>
  `${API_DOMAIN}/admin/${bannerNumber}/main-banner`;
const DELETE_ADMIN_BANNER_URL = (bannerNumber: number | string) =>
  `${API_DOMAIN}/admin/${bannerNumber}/main-banner`;

// description: 이벤트게시판 URL //
const GET_EVENT_BOARD_LIST_URL = (section: number | string) =>
  `${API_DOMAIN}/event-board/board-list/${section}`;
const GET_EVENT_BOARD_DETAIL_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/event-board/${boardNumber}`;
const POST_EVENT_BOARD_URL = () => `${API_DOMAIN}/event-board`;
const PATCH_EVENT_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/event-board/${boardNumber}`;
const DELETE_EVENT_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/event-board/${boardNumber}`;

// description: 공지사항게시판 URL //
const GET_NOTICE_BOARD_LIST_URL = (section: number | string) =>
  `${API_DOMAIN}/notice-board/board-list/${section}`;
const GET_NOTICE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/notice-board/${boardNumber}`;
const POST_NOTICE_BOARD_URL = () => `${API_DOMAIN}/notice-board`;
const PATCH_NOTICE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/notice-board/${boardNumber}`;
const DELETE_NOTICE_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/notice-board/${boardNumber}`;

// description: 마이페이지 URL //
const POST_MY_PAGE_REGISTRANTION_URL = () =>
  `${API_DOMAIN}/my-page/registration`;
const GET_MY_PAGE_REGISTRANTION_URL = () =>
  `${API_DOMAIN}/my-page/registration-list`;
const GET_MY_PAGE_BOARD_LIST_URL = () => `${API_DOMAIN}/my-page/board-list`;
const GET_MY_PAGE_COMMENT_LIST_URL = () => `${API_DOMAIN}/my-page/comment-list`;
const GET_MY_PAGE_SHORT_REIVEW_URL = () => `${API_DOMAIN}/my-page/short-reivew`;
const GET_MY_PAGE_STORE_INFO_URL = () => `${API_DOMAIN}/my-page/store-info`;
const GET_MY_PAGE_STORE_RESERVATION_LIST_URL = () =>
  `${API_DOMAIN}/my-page/store-reservation-list`;
const PATCH_MY_PAGE_INFO_CHANGE_URL = () =>
  `${API_DOMAIN}/my-page/user-info-change`;

// description: 광고게시판 URL //
const GET_ADVERTISING_BOARD_LIST_URL = (section: number | string) =>
  `${API_DOMAIN}/advertising-board/current-board/${section}`;
const GET_ADVERTISING_BOARD_LOCATION_LIST_URL = (location: string) =>
  `${API_DOMAIN}/advertising-board/board-list/location/${location}`;
const GET_ADVERTISING_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) =>
  `${API_DOMAIN}/advertising-board/board-list/businesstype/${businessType}`;
const GET_ADVERTISING_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (
  location: string,
  businessType: string
) => `${API_DOMAIN}/advertising-board/board-list/${location}/${businessType}`;
const GET_ADVERTISING_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/advertising-board/board-list/${boardNumber}`;
const GET_ADVERTISING_BOARD_SHORT_REVIEW_LIST_URL = (
  boardNumber: number | string
) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review/list`;
// const GET_ADVERTISING_BOARD_USER_LIST_URL = (email: string) => `${API_DOMAIN}/advertising-board/user-list/${email}`;
const POST_ADVERTISING_BOARD_URL = () => `${API_DOMAIN}/advertising-board`;
const POST_ADVERTISING_BOARD_SHORT_REVIEW_URL = (
  boardNumber: number | string
) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review`;
const PUT_ADVERTISING_BOARD_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/advertising-board/${boardNumber}/favorite`;
const PATCH_ADVERTISING_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/advertising-board/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/advertising-board/${boardNumber}`;
const DELETE_ADVERTISING_BOARD_SHORT_REVIEW_URL = (
  boardNumber: number | string
) => `${API_DOMAIN}/advertising-board/${boardNumber}/short-review`;
const POST_ADVERTISING_BOARD_RESERVATION_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/advertising-board/${boardNumber}/reservation`;

// description: 기행기 게시판 URL //
const GET_REVIEW_BOARD_LIST_URL = (section: number | string) =>
  `${API_DOMAIN}/review-board/board-list/section/${section}`;
const GET_REVIEW_BOARD_LOCATION_LIST_URL = (location: string) =>
  `${API_DOMAIN}/review-board/board-list/location/${location}`;
const GET_REVIEW_BOARD_BUSINESSTYPE_LIST_URL = (businessType: string) =>
  `${API_DOMAIN}/review-board/board-list/businesstype/${businessType}`;
const GET_REVIEW_BOARD_LOCATION_BUSINESSTYPE_LIST_URL = (
  location: string,
  businessType: string
) => `${API_DOMAIN}/review-board/board-list/${location}/${businessType}`;
const GET_REVIEW_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}`;
const GET_REVIEW_BOARD_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/review-board/${boardNumber}/favorite-list`
const GET_REVIEW_BOARD_COMMENT_LIST_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}/comment-list`;
const GET_REVIEW_BOARD_USER_LIST_URL = (email: string) =>
  `${API_DOMAIN}/review-board/user-list/${email}`;
const POST_REVIEW_BOARD_URL = () => `${API_DOMAIN}/review-board`;
const POST_REVIEW_BOARD_COMMENT_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}/comment`;
const PUT_REVIEW_BOARD_FAVORITE_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}/favorite`;
const PATCH_REVIEW_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}`;
const DELETE_REVIEW_BOARD_URL = (boardNumber: number | string) =>
  `${API_DOMAIN}/review-board/${boardNumber}`;
const DELETE_REVIEW_BOARD_COMMENT_URL = (commentNumber: number | string) =>
  `${API_DOMAIN}/review-board/${commentNumber}/comment`;

// description: 검색게시판 URL //
const GET_SEARCH_LIST_URL = (searchWord: string, location?: string) =>
  location
    ? `${API_DOMAIN}/search/${location}/${searchWord}`
    : `${API_DOMAIN}/search/${searchWord}`;
const GET_SEARCH_REVIEW_BOARD_LIST_URL = (
  searchWord: string,
  section: number | string,
  location?: string
) =>
  location
    ? `${API_DOMAIN}/search/review-board/${location}/${searchWord}/${section}`
    : `${API_DOMAIN}/search/review-board/${searchWord}/${section}`;
const GET_SEARCH_ADVERTISING_BOARD_LIST_URL = (
  searchWord: string,
  section: number | string,
  location?: string
) =>
  location
    ? `${API_DOMAIN}/search/advertising-board/${location}/${searchWord}/${section}`
    : `${API_DOMAIN}/search/advertising-board/${searchWord}/${section}`;

const UPLOAD_FILE = () => `http://localhost:4040/file/upload`;

// description: 인증 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description : 파일 업로드 //
export const uploadFileRequest = async (data: FormData) => {
  const result = await axios
    .post(UPLOAD_FILE(), data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      const imageUrl: string = response.data;
      return imageUrl;
    })
    .catch((error) => null);
    
  return result;
};
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then(response => {
      const responseBody: SignUpResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch(error => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
}

export const accountFindEmailRequest = async (requestBody: AccountFindEmailRequestDto) => {
  const result = await axios
    .post(ACCOUNT_FIND_EMAIL_URL(), requestBody)
    .then(response => {
      const responseBody: AccountFindEmailResponseDto = response.data;
      return responseBody;
    })
    .catch(error => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
}

export const accountFindPasswordRequest = async (requestBody: AccountFindPasswordRequestDto) => {
  const result = await axios
    .post(ACCOUNT_FIND_PASSWORD_URL(), requestBody)
    .then(response => {
      const responseBody: AccountFindPasswordResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch(error => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
}

// description: 유저 모듈 //
export const getSignInUserRequest = async (token: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: 기행기 게시판 //
export const getReviewBoardListRequest = async (
  section: number | string
) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_LIST_URL(section))
    .then((response) => {
      const responseBody: GetReviewBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getReviewBoardLocationListRequest = async (location: string) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_LOCATION_LIST_URL(location))
    .then((response) => {
      const responseBody: GetReviewBoardLocationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getReviewBoardBusinessTypeListRequest = async (
  businessType: string
) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_BUSINESSTYPE_LIST_URL(businessType))
    .then((response) => {
      const responseBody: GetReviewBoardBusinessTypeListResponseDto =
        response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getReviewBoardLocationBusinessTypeListRequest = async (
  location: string,
  businessType: string
) => {
  const result = await axios
    .get(
      GET_REVIEW_BOARD_LOCATION_BUSINESSTYPE_LIST_URL(location, businessType)
    )
    .then((response) => {
      const responseBody: GetReviewBoardLocationBusinessTypeListResponseDto =
        response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getReviewBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetReviewBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getFavoriteListRequest = async (boardNumber: number | string) => {
  const result = await axios.get(GET_REVIEW_BOARD_FAVORITE_LIST_URL(boardNumber))
  .then((response) => {
    const responseBody: GetFavoriteListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getReviewBoardCommentListRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_COMMENT_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetCommentListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getReviewBoardUserListRequest = async (email: string) => {
  const result = await axios
    .get(GET_REVIEW_BOARD_USER_LIST_URL(email))
    .then((response) => {
      const responseBody: GetUserReviewBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postReviewBoardRequest = async (
  data: PostReviewBoardRequestDto,
  token: string
) => {
  const result = await axios
    .post(POST_REVIEW_BOARD_URL(), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
};

export const postReviewBoardCommentRequest = async (
  boardNumber: number | string,
  data: PostCommentRequestDto,
  token: string
) => {
  const result = await axios
    .post(POST_REVIEW_BOARD_COMMENT_URL(boardNumber), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
};

export const putReviewBoardFavoriteRequest = async (
  boardNumber: number | string,
  token: any
) => {
  const result = await axios
    .put(
      PUT_REVIEW_BOARD_FAVORITE_URL(boardNumber),
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
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
};

export const patchReviewBoardRequest = async (
  boardNumber: number | string,
  data: PatchReviewBoardRequestDto,
  token: string
) => {
  const result = await axios
    .patch(PATCH_REVIEW_BOARD_URL(boardNumber), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
};

export const deleteReviewBoardRequest = async (
  boardNumber: number | string,
  token: string
) => {
  const result = await axios
    .delete(DELETE_REVIEW_BOARD_URL(boardNumber), {
      headers: { Authorization: `Bearer ${token}` },
    })
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
};

export const deleteReviewBoardCommentRequest = async (
  commentNumber: number | string,
  // boardNumber: number | string,
  token: string
) => {
  const result = await axios
    .delete(DELETE_REVIEW_BOARD_COMMENT_URL(commentNumber), {
      headers: { Authorization: `Bearer ${token}` },
    })
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
};

// description: 이벤트 게시판 //
export const getCurrentEventBoardListRequest = async (section: number) => {
  const result = await axios
    .get(GET_EVENT_BOARD_LIST_URL(section))
    .then((response) => {
      const responseBody: GetCurrentEventBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description : 공지사항 게시판 //
// 공지사항 리스트 불러오기
export const getNoticeBoardListRequest = async (section: number) => {
  const result = await axios
    .get(GET_NOTICE_BOARD_LIST_URL(section))
    .then((response) => {
      const responseBody: GetNoticeBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 공지사항 상세보기
export const getNoticeBoardRequest = async (boardNumber: number | string) => {
  const result = await axios
    .get(GET_NOTICE_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetNoticeBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 공지사항 작성하기
export const postNoticeBoardRequest = async (
  data: PostNoticeBoardRequestDto,
  token: string
) => {
  const result = await axios
    .post(POST_NOTICE_BOARD_URL(), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: PostNoticeBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });

  return result;
};

// 공지사항 수정하기
export const patchNoticeBoardRequest = async (
  boardNumber: string,
  data: PatchNoticeBoardRequestDto,
  token: string
) => {
  const result = await axios
    .patch(PATCH_NOTICE_BOARD_URL(boardNumber), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: PatchNoticeBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.datal;
      const { code } = responseBody;
      return code;
    });

  return result;
};

// 공지사항 삭제하기
export const deleteNoticeBoardRequest = async (
  boardNumber: number | string,
  token: string
) => {
  const result = await axios
    .delete(DELETE_NOTICE_BOARD_URL(boardNumber), {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: DeleteNoticeBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });

  return result;
};

// description : 관리자 게시판 //
// 기행기 게시글 불러오기
export const getAdminReviewBoardListRequest = async (adminId: string, section: number) => {
  const result = await axios
  .get(GET_ADMIN_REVIEW_BOARD_LIST_URL(adminId, section))
  .then((response) => {
    const responseBody: GetReviewBoardListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });

  return result;
}

// 한줄 리뷰 불러오기
export const getAdminShortReviewListRequest = async (adminId: string) => {
  const result = await axios
  .get(GET_ADMIN_SHORT_REVIEW_LIST_URL(adminId))
  .then((response) => {
    const responseBody: GetShortReviewListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });

  return result;
}

// 유저 목록 불러오기
export const getAdminUserListRequest = async (
    adminId: string, section: string | number
  ) => {
  const result = await axios
  .get(GET_ADMIN_USER_LIST_URL(adminId, section))
  .then((response) => {
    const responseBody: GetUserListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  })

  return result;
}

// description: 광고게시판 //
export const getCurrentAdvertisingBoardListRequest = async (
  section: number | string
) => {
  const result = await axios
    .get(GET_ADVERTISING_BOARD_LIST_URL(section))
    .then((response) => {
      const responseBody: GetCurrentAdvertisingBoardResponeDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getAdvertisingBoardLocationListRequest = async (
  location: string
) => {
  const result = await axios
    .get(GET_ADVERTISING_BOARD_LOCATION_LIST_URL(location))
    .then((response) => {
      const responseBody: GetAdvertisingLocationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getAdvertisingBoardBusinessTypeListRequest = async (
  businessType: string
) => {
  const result = await axios
    .get(GET_ADVERTISING_BOARD_BUSINESSTYPE_LIST_URL(businessType))
    .then((response) => {
      const responseBody: GetAdvertisingBoardBusinessTypeResponseDto =
        response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getAdvertisingBoardLocationBusinessTypeListRequest = async (
  location: string,
  businessType: string
) => {
  const result = await axios
    .get(
      GET_ADVERTISING_BOARD_LOCATION_BUSINESSTYPE_LIST_URL(
        location,
        businessType
      )
    )
    .then((response) => {
      const responseBody: GetAdvertisingBoardBusinessTypeLocationResponseDto =
        response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getAdvertisingBoardRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(GET_ADVERTISING_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetAdvertisingBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const getAdvertisingBoardShortReviewListRequest = async (
  boardNumber: number | string
) => {
  const result = await axios
    .get(GET_ADVERTISING_BOARD_SHORT_REVIEW_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetShortReviewListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const postAdvertisingBoardRequest = async (
  data: PostAdvertisingBoardDto,
  token: string
) => {
  const result = await axios
    .post(POST_ADVERTISING_BOARD_URL(), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: PostAdvertisingBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

export const postAdvertisingBoardShortReviewRequest = async (
  boardNumber: number | string,
  data: PostShortReviewResponseDto,
  token: string
) => {
  const result = await axios
    .post(POST_ADVERTISING_BOARD_SHORT_REVIEW_URL(boardNumber), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: PostShortReviewResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

export const putAdvertisingBoardFavoriteRequest = async (
  boardNumber: number | string,
  token: any
) => {
  const result = await axios
    .put(
      PUT_ADVERTISING_BOARD_FAVORITE_URL(boardNumber),
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const responseBody: PutAdvertisingFavoriteListResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

export const patchAdvertisingBoardRequest = async (
  boardNumber: number | string,
  data: PatchAdvertisingBoardDto,
  token: string
) => {
  const result = await axios
    .patch(PATCH_ADVERTISING_BOARD_URL(boardNumber), data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const responseBody: PatchAdvertisingBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

export const deleteAdvertisingBoardRequest = async (
  boardNumber: number | string,
  token: string
) => {
  const result = await axios
    .delete(DELETE_ADVERTISING_BOARD_URL(boardNumber), {
      headers: { Authorization: `Bearer${token}` },
    })
    .then((response) => {
      const responseBody: DeleteAdvertisingBoardResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};
export const deleteAdvertisingShortReviewRequest = async (
  boardNumber: number | string,
  token: string
) => {
  const result = await axios
    .delete(DELETE_ADVERTISING_BOARD_SHORT_REVIEW_URL(boardNumber), {
      headers: { Authorization: `Bearer${token}` },
    })
    .then((response) => {
      const responseBody: DeleteShortCommentAdvertisingBoardResponseDto =
        response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};


// description: 검색게시판 //
export const getSearchListRequest = async (searchWord: string, location?: string) => {
  const result = await axios.get(GET_SEARCH_LIST_URL(searchWord, location))
  .then((response) => {
    const responseBody: GetSearchResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getSearchReviewBoardListRequest = async (searchWord: string, section: number | string, location?: string) => {
  const result = await axios.get(GET_SEARCH_REVIEW_BOARD_LIST_URL(searchWord, section, location))
  .then((response) => {
    const responseBody: GetSearchReviewBoardListResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}

export const getSearchAdvertisingBoardListRequest = async (searchWord: string, section: number | string, location?: string) => {
  const result = await axios.get(GET_SEARCH_ADVERTISING_BOARD_LIST_URL(searchWord, section, location))
  .then((response) => {
    const responseBody: GetSearchAdvertisingBoardResponseDto = response.data;
    return responseBody;
  })
  .catch((error) => {
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
  });
  return result;
}
