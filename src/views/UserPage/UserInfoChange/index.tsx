import { getSignInUserRequest } from 'apis';
import ResponseDto from 'interfaces/response/response.dto';
import { GetSignInUserResponseDto } from 'interfaces/response/user';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'stores';

export default function UserInfoChange() {
  //          state         //
  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // description: 유저 정보 상태 //
  const {user} = useUserStore();
  const [userDetail, setUserDetail] = useState<GetSignInUserResponseDto | null>(null);

  //          function          //
  // description : 네비게이트 함수//
  const navigator = useNavigate();


  // description : 유저 정보 불러오기 요청 함수 //
  const getUserResponseHandler = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
    const { code } = responseBody;

    if (code === "DE") alert("데이터베이스 에러입니다.");
    if (code === "NE") alert("유저 정보가 업습니다.")
    if (code !== "SU") {
      navigator("/");
      return;
    }

    setUserDetail(responseBody as GetSignInUserResponseDto);
  }

  //          event handler          //

  //          effect          //
  useEffect(() => {
    const token = cookies.accessToken;

    getSignInUserRequest(token).then(getUserResponseHandler);

  },[])

  //          render          //
  return (
    <div className="user-info-change-box">
      <div className="user-email">{userDetail?.email}</div>
      <div className="user-password"></div>
      <div className="user-password-check"></div>
      <div className="user-nickname"></div>
      <div className="user-address"></div>
      <div className="user-address-detail"></div>
      <div className="user-telnumber"></div>
    </div>
  )
}
