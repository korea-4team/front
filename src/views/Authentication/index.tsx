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
    //          state: 로그인 에러 상태          //
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

    //          event handler: 로그인 버튼 클릭 이벤트 처리          //
    const onSignUpButtonClickHandler = () => {
    }

    //          render: 회원가입 컴포넌트 렌더링          //
    return (
      <div id='sign-up-card'>
        <div className='sign-up-input-container'></div>
        <div className='sign-up-action-container'>
          <div className='large-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
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
