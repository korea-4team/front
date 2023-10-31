import { GetSignInUserResponseDto } from 'interfaces/response/user';
import './style.css';
import { useEffect, useState } from 'react';
import { getSignInUserRequest } from 'apis';
import ResponseDto from 'interfaces/response/response.dto';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MY_PAGE_INFO_CHANGE_PATH } from 'constant';

//          component : 상단 내 정보 컴포넌트          //
export default function MyPageTop() {
  //          state         //
  const [userDetail, setUserDetail] = useState<GetSignInUserResponseDto | null>(null);

  // description : Cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // description: 유저 정보 상태 //
  const {user} = useUserStore();

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

  //          event handler         //
  const onInfoChangeClickButton = () => {
    navigator(MY_PAGE_INFO_CHANGE_PATH(user?.email as string));
  }

  const onStoreClickButton = () => {
    alert("서비스 준비중입니다.")
  }
  //          effect          //
  useEffect(() => {
    const token = cookies.accessToken;

    getSignInUserRequest(token).then(getUserResponseHandler);

  },[])

  //          render          //
  return (
    <div className='user-info-top-item'>
      <div className='user-info-top-left'>
        <div className='user-info-email'>{userDetail?.email}</div>
        <div className='user-info-nickname'>{userDetail?.nickname}</div>
        <div className='user-info-telnumber'>{userDetail?.telNumber}</div>
      </div>
      <div className='user-info-top-right'>
          <div className='user-info-top-update' onClick={onInfoChangeClickButton}> 수정하기 </div>
          <div className='user-info-top-store-info' onClick={onStoreClickButton}> 사업자등록증 등록하기</div>
        </div>
    </div>
  );
};
