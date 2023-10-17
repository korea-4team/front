import InputBox from 'components/InputBox';
import React, { useState, useRef, ChangeEvent } from 'react';
import './style.css';
import { SignInRequestDto } from 'interfaces/request/auth';
import { signInRequest } from 'apis';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SignInResponseDto } from 'interfaces/response/auth';
import ResponseDto from 'interfaces/response/response.dto';

//          component: 인증 페이지 컴포넌트          //
export default function Authentication() {

  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();
  //          state: 페이지 처리 상태           //
  const [page, setPage] = useState<'sign-in' | 'sign-up' | 'find'>('sign-in');

  //          function: 네비게이트 함수          //
  const navigator = useNavigate();

  //          component: 로그인 컴포넌트          //
  const SignIn = () => {

    //          state: email input 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: password input 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    //          state: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: 이메일 에러 상태          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: 비밀번호 에러 상태          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //          state: 이메일 에러 메세지 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    //          state: 비밀번호 에러 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    //          state: 로그인 에러 메세지 상태          //
    const [isError, setError] = useState<boolean>(false);

    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
      }
      if (code === 'DM') setError(true);
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { token, expiredTime } = responseBody as SignInResponseDto;

      const now = new Date().getTime();
      const expires = new Date(now + expiredTime * 1000);

      setCookie('accessToken', token, { expires, path: MAIN_PATH });
      navigator(MAIN_PATH);
    }

    //          event handler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailError(false);
      setEmailErrorMessage('');
      setEmail(value);
    }
    //          event handler: 비밀번호 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordError(false);
      setPasswordErrorMessage('');
      setPassword(value);
    }
    //          event handler: 로그인 버튼 클릭 이벤트 처리          //
    const onSignInButtonClickHandler = () => {
      if (!email) {
        setEmailError(true);
        setEmailErrorMessage('이메일을 반드시 입력해주세요.');
        return;
      }
      if (!password) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 반드시 입력해주세요.');
        return;
      }

      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse)
    }
    //          event handler: 찾기 링크 클릭 이벤트 처리          //
    const onFindLinkClickHandler = () => {
      setPage('find');
    }
    //          event handler: 회원가입 링크 클릭 이벤트 처리          //
    const onSignUpLinkClickHandler = () => {
      setPage('sign-up');
    }

    //          render: 로그인 컴포넌트 렌더링          //
    return (
      <div id='sign-in-card'>
        <div className='sign-in-input-container'>
          <InputBox ref={emailRef} label='이메일' type='text' placeholder='이메일을 입력하세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} errorMessage={emailErrorMessage} />
          <InputBox ref={passwordRef} label='비밀번호' type='password' placeholder='비밀번호를 입력하세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} errorMessage={passwordErrorMessage} />
        </div>
        <div className='sign-in-action-container'>
          { isError && <div className='sign-in-error-message'>{'로그인 정보가 일치하지 않습니다.'}</div> }
          <div className='large-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
          <div className='sign-in-link-box'>
            <div className='link' onClick={onFindLinkClickHandler}>{'아이디 / 비밀번호 찾기'}</div>
            <div className='link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</div>
          </div>
        </div>
      </div>
    );

  }

  //          component: 회원가입 컴포넌트          //
  const SignUp = () => {

    //          state: email input 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: password input 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: password check input 참조 상태          //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    //          state: nickname input 참조 상태          //
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    //          state: address input 참조 상태          //
    const addressRef = useRef<HTMLInputElement | null>(null);
    //          state: address detail input 참조 상태          //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);
    //          state: tel number input 참조 상태          //
    const telNumberRef = useRef<HTMLInputElement | null>(null);

    //          state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    //          state: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: 비밀번호 확인 상태          //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    //          state: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');
    //          state: 주소 상태          //
    const [address, setAddress] = useState<string>('');
    //          state: 상세주소 상태          //
    const [addressDetail, setAddressDetail] = useState<string>('');
    //          state: 전화번호 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: 이메일 에러 상태          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: 비밀번호 에러 상태          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //          state: 패스워드 확인 에러 상태          //
    const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: 닉네임 에러 상태          //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    //          state: 주소 에러 상태          //
    const [isAddressError, setAddressError] = useState<boolean>(false);
    //          state: 상세 주소 에러 상태          //
    const [isAddressDetailError, setAddressDetailError] = useState<boolean>(false);
    //          state: 전화번호 에러 상태          //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);

    //          state: 이메일 에러 메세지 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    //          state: 비밀번호 에러 메세지 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    //          state: 비밀번호 확인 에러 메세지 상태          //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    //          state: 닉네임 에러 메세지 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    //          state: 주소 에러 메세지 상태          //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
    //          state: 상세 주소 에러 메세지 상태          //
    const [addressDetailErrorMessage, setAddressDetailErrorMessage] = useState<string>('');
    //          state: 휴대전화번호 에러 메세지 상태          //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');

    //          event handler: 이메일 변경 이벤트 처리          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailError(false);
      setEmailErrorMessage('');
      setEmail(value);
    }
    //          event handler: 비밀번호 변경 이벤트 처리          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordError(false);
      setPasswordErrorMessage('');
      setPassword(value);
    }
    //          event handler: 이메일 변경 이벤트 처리          //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
      setPasswordCheck(value);
    }
    //          event handler: 비밀번호 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNicknameError(false);
      setNicknameErrorMessage('');
      setNickname(value);
    }
    //          event handler: 이메일 변경 이벤트 처리          //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressError(false);
      setAddressErrorMessage('');
      setAddress(value);
    }
    //          event handler: 비밀번호 변경 이벤트 처리          //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressDetailError(false);
      setAddressDetailErrorMessage('');
      setAddressDetail(value);
    }
    //          event handler: 이메일 변경 이벤트 처리          //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumberError(false);
      setTelNumberErrorMessage('');
      setTelNumber(value);
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리          //
    const onSignUpButtonClickHandler = () => {
    }
    //          event handler: 회원가입 링크 클릭 이벤트 처리          //
    const onSignUpLinkClickHandler = () => {
      setPage('sign-in');
    }

    //          render: 회원가입 컴포넌트 렌더링          //
    return (
      <div id='sign-up-card'>
        <div className='sign-up-input-container'>
          <InputBox ref={emailRef} label='이메일' type='text' placeholder='이메일을 입력하세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} errorMessage={emailErrorMessage} />
          <InputBox ref={passwordRef} label='비밀번호' type='password' placeholder='비밀번호를 입력하세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} errorMessage={passwordErrorMessage} />
          <InputBox ref={passwordCheckRef} label='비밀번호 확인' type='password' placeholder='비밀번호 확인을 입력하세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} errorMessage={passwordCheckErrorMessage} />
          <InputBox ref={nicknameRef} label='닉네임' type='text' placeholder='닉네임을 입력하세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} errorMessage={nicknameErrorMessage} />
          <InputBox ref={addressRef} label='주소' type='text' placeholder='주소를 입력하세요.' value={address} onChange={onAddressChangeHandler} error={isAddressError} errorMessage={addressErrorMessage} />
          <InputBox ref={addressDetailRef} label='상세 주소' type='text' placeholder='상세 주소를 입력하세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={isAddressDetailError} errorMessage={addressDetailErrorMessage} />
          <InputBox ref={telNumberRef} label='휴대 전화번호' type='text' placeholder='휴대전화 번호를 입력하세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} errorMessage={telNumberErrorMessage} />
        </div>
        <div className='sign-up-action-container'>
          <div className='large-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
          <div className='sign-in-link-box'>
            <div className='link' onClick={onSignUpLinkClickHandler}>{'로그인'}</div>
          </div>
        </div>
      </div>
    );

  }

  //          component: 정보 찾기 컴포넌트          //
  const Find = () => {

    //          render: 정보 찾기 컴포넌트 렌더링          //
    return (
      <div></div>
    );

  }

  //          render: 인증 페이지 컴포넌트 렌더링          //
  return (
    <div id='auth-container'>
      { page === 'sign-in' && <SignIn /> }
      { page === 'sign-up' && <SignUp /> }
      { page === 'find' && <Find /> }
    </div>
  );
}
