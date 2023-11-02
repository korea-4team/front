import InputBox from 'components/InputBox';
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import './style.css';
import { AccountFindEmailRequestDto, AccountFindPasswordRequestDto, SignInRequestDto, SignUpRequestDto } from 'interfaces/request/auth';
import { accountFindEmailRequest, accountFindPasswordRequest, signInRequest, signUpRequest } from 'apis';
import { INPUT_ICON, MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AccountFindEmailResponseDto, AccountFindPasswordResponseDto, SignInResponseDto, SignUpResponseDto } from 'interfaces/response/auth';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
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
    // description: 비밀번호 인풋 타입상태 //
    const [showPassword, setShowPassword] = useState<boolean>(false);
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


    // description: 비밀번호 인풋 key down 이벤트 //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return;
      onSignInButtonClickHandler();
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
    // description: 비밀번호 타입 변경 버튼 클릭 이벤트 //
    const onPasswordIconClickHandler = () => {
      setShowPassword(!showPassword);
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
        <div className='sign-in-title'>{'로그인'}</div>
        <div className='sign-in-input-container'>
          <InputBox ref={emailRef} label='이메일' type='text' placeholder='이메일을 입력하세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} errorMessage={emailErrorMessage} />
          <InputBox ref={passwordRef} label='비밀번호' type={showPassword ? 'text' : 'password'} icon={showPassword ? INPUT_ICON.ON : INPUT_ICON.OFF} onButtonClick={onPasswordIconClickHandler} placeholder='비밀번호를 입력하세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} errorMessage={passwordErrorMessage} onKeyDown={onPasswordKeyDownHandler} />
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

    //          state          //
    // description: 다음 포스트 (우편번호검색) 팝업 상태 //
    const open = useDaumPostcodePopup();
    // description: email input 참조 상태          //
    const emailRef = useRef<HTMLInputElement | null>(null);
    // description: password input 참조 상태          //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // description: password check input 참조 상태          //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    // description: nickname input 참조 상태          //
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    // description: address input 참조 상태          //
    const addressRef = useRef<HTMLInputElement | null>(null);
    // description: address detail input 참조 상태          //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);
    // description: tel number input 참조 상태          //
    const telNumberRef = useRef<HTMLInputElement | null>(null);

    // description: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    // description: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    // description: 비밀번호 인풋 타입상태 //
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // description: 비밀번호 확인 상태          //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    // description: 비밀번호 확인 인풋 타입 상태 //
    const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);
    // description: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');
    // description: 주소 상태          //
    const [address, setAddress] = useState<string>('');
    // description: 상세주소 상태          //
    const [addressDetail, setAddressDetail] = useState<string>('');
    // description: 전화번호 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    // description: 이메일 에러 상태          //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    // description: 비밀번호 에러 상태          //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    // description: 패스워드 확인 에러 상태          //
    const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
    // description: 닉네임 에러 상태          //
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    // description: 주소 에러 상태          //
    const [isAddressError, setAddressError] = useState<boolean>(false);
    // description: 상세 주소 에러 상태          //
    const [isAddressDetailError, setAddressDetailError] = useState<boolean>(false);
    // description: 전화번호 에러 상태          //
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);

    // description: 이메일 에러 메세지 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    // description: 비밀번호 에러 메세지 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    // description: 비밀번호 확인 에러 메세지 상태          //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    // description: 닉네임 에러 메세지 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    // description: 주소 에러 메세지 상태          //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
    // description: 상세 주소 에러 메세지 상태          //
    const [addressDetailErrorMessage, setAddressDetailErrorMessage] = useState<string>('');
    // description: 휴대전화번호 에러 메세지 상태          //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');

    //          function: sign up response 처리 함수          //
    const signUpResponse = (code: string) => {
      if (code === 'EE') {
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일입니다.');
      }
      if (code === 'EN') {
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다.');
      }
      if (code === 'ET') {
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 전화번호입니다.');
      }
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      alert('회원가입에 성공했습니다.');
      setPage('sign-in');
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
    // description: 비밀번호 타입 변경 버튼 클릭 이벤트 //
    const onPasswordIconClickHandler = () => {
      setShowPassword(!showPassword);
    }
    //          event handler: 비밀번호 확인 변경 이벤트 처리          //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
      setPasswordCheck(value);
    }
    // description: 비밀번호 확인 타입 변경 버튼 클릭 이벤트 //
    const onPasswordCheckIconClickHandler = () => {
      setShowPasswordCheck(!showPasswordCheck);
    }
    //          event handler: 닉네임 변경 이벤트 처리          //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNicknameError(false);
      setNicknameErrorMessage('');
      setNickname(value);
    }
    //          event handler: 주소 변경 이벤트 처리          //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressError(false);
      setAddressErrorMessage('');
      setAddress(value);
    }
    // description: 주소 검색 버튼 클릭 이벤트 //
    const onAddressIcnClickHandler = () => {
      open({ onComplete });
    }
    // description: 주소 검색 완료 이벤트 //
    const onComplete = (data: Address) => {
      const address = data.address;
      setAddress(address);
    }
    //          event handler: 상세 주소 변경 이벤트 처리          //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressDetailError(false);
      setAddressDetailErrorMessage('');
      setAddressDetail(value);
    }
    //          event handler: 전화번호 변경 이벤트 처리          //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumberError(false);
      setTelNumberErrorMessage('');
      setTelNumber(value);
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리          //
    const onSignUpButtonClickHandler = () => {
      setEmailError(false);
      setEmailErrorMessage('');
      setPasswordError(false);
      setPasswordErrorMessage('');
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
      setNicknameError(false);
      setNicknameErrorMessage('');
      setAddressError(false);
      setNicknameErrorMessage('');
      setTelNumberError(false);
      setTelNumberErrorMessage('');
      
      // description: 이메일 패턴 확인 //
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const checkedEmail = !emailPattern.test(email);
      if (checkedEmail) {
        setEmailError(true);
        setEmailErrorMessage('이메일주소 포맷이 맞지않습니다.');
      }
      // description: 비밀번호 길이 확인 //
      const checkedPassword = password.trim().length < 8;
      if (checkedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }
      // description: 비밀번호 일치 여부 확인 //
      const checkedPasswordCheck = password !== passwordCheck;
      if (checkedPasswordCheck) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
      }
      // description: 닉네임 길이 확인 //
      const nicknameCheck = nickname.trim().length > 12;
      if (nicknameCheck) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임은 12자 이하로 입력해주세요.');
      }
      // description: 주소 입력 확인 //
      const addressCheck = !address;
      if (addressCheck) {
        setAddressError(true);
        setAddressErrorMessage('주소는 필수 입력입니다.');
      }
      // description: 핸드폰 번호 입력 여부 확인 //
      const telNumberPattern = /^[0-9]{10,12}$/;
      const telNumberCheck = !telNumberPattern.test(telNumber);
      if (telNumberCheck) {
        setTelNumberError(true);
        setTelNumberErrorMessage('숫자만 입력해주세요.');
      }

      if (checkedEmail || checkedPassword || checkedPasswordCheck || nicknameCheck || addressCheck || telNumberCheck) return;

      const requestBody: SignUpRequestDto = {
        email,
        password,
        nickname,
        telNumber,
        address,
        addressDetail,
      }

      signUpRequest(requestBody).then(signUpResponse);

    }
    //          event handler: 로그인 링크 클릭 이벤트 처리          //
    const onSignInLinkClickHandler = () => {
      setPage('sign-in');
    }

    //          render: 회원가입 컴포넌트 렌더링          //
    return (
      <div id='sign-up-card'>
        <div className='sign-up-title'>{'회원가입'}</div>
        <div className='sign-up-input-container'>
          <InputBox ref={emailRef} label='이메일' type='text' placeholder='이메일을 입력하세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} errorMessage={emailErrorMessage} />
          <InputBox ref={passwordRef} label='비밀번호' type={showPassword ? 'text' : 'password'} placeholder='비밀번호를 입력하세요.' icon={showPassword ? INPUT_ICON.ON : INPUT_ICON.OFF} onButtonClick={onPasswordIconClickHandler} value={password} onChange={onPasswordChangeHandler} error={isPasswordError} errorMessage={passwordErrorMessage} />
          <InputBox ref={passwordCheckRef} label='비밀번호 확인' type={showPasswordCheck ? 'text' : 'password'} placeholder='비밀번호 확인을 입력하세요.' icon={showPasswordCheck ? INPUT_ICON.ON : INPUT_ICON.OFF} onButtonClick={onPasswordCheckIconClickHandler} value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} errorMessage={passwordCheckErrorMessage} />
          <InputBox ref={nicknameRef} label='닉네임' type='text' placeholder='닉네임을 입력하세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} errorMessage={nicknameErrorMessage} />
          <InputBox ref={addressRef} label='주소' type='text' placeholder='주소를 입력하세요.' icon={INPUT_ICON.ARROW} value={address} onChange={onAddressChangeHandler} error={isAddressError} errorMessage={addressErrorMessage} onButtonClick={onAddressIcnClickHandler} />
          <InputBox ref={addressDetailRef} label='상세 주소' type='text' placeholder='상세 주소를 입력하세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={isAddressDetailError} errorMessage={addressDetailErrorMessage} />
          <InputBox ref={telNumberRef} label='휴대 전화번호' type='text' placeholder='휴대전화 번호를 입력하세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} errorMessage={telNumberErrorMessage} />
        </div>
        <div className='sign-up-action-container'>
          <div className='large-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
          <div className='sign-in-link-box'>
            <div className='link' onClick={onSignInLinkClickHandler}>{'로그인'}</div>
          </div>
        </div>
      </div>
    );

  }

  //          component: 정보 찾기 컴포넌트          //
  const Find = () => {

    //          state: 이메일 찾기 tel number input 참조 상태          //
    const emailTelNumberRef = useRef<HTMLInputElement | null>(null);
    //          state: 이메일 찾기 전화번호 상태          //
    const [emailTelNumber, setEmailTelNumber] = useState<string>('');
    //          state: 이메일 찾기 전화번호 에러 상태          //
    const [isEmailTelNumberError, setEmailTelNumberError] = useState<boolean>(false);
    //          state: 이메일 찾기 전화번호 에러 메세지 상태          //
    const [emailTelNumberErrorMessage, setEmailTelNumberErrorMessage] = useState<string>('');

    //          state: 비밀번호 찾기 email input 참조 상태          //
    const passwordEmailRef = useRef<HTMLInputElement | null>(null);
    //          state: 비밀번호 찾기 tel number input 참조 상태          //
    const passwordTelNumberRef = useRef<HTMLInputElement | null>(null);
    //          state: 비밀번호 찾기 이메일 상태          //
    const [passwordEmail, setPasswordEmail] = useState<string>('');
    //          state: 비밀번호 찾기 전화번호 상태          //
    const [passwordTelNumber, setPasswordTelNumber] = useState<string>('');
    //          state: 비밀번호 찾기 이메일 에러 상태          //
    const [isPasswordEmailError, setPasswordEmailError] = useState<boolean>(false);
    //          state: 비밀번호 찾기 전화번호 에러 상태          //
    const [isPasswordTelNumberError, setPasswordTelNumberError] = useState<boolean>(false);
    //          state: 비밀번호 찾기 이메일 에러 메세지 상태          //
    const [passwordEmailErrorMessage, setPasswordEmailErrorMessage] = useState<string>('');
    //          state: 비밀번호 찾기 전화번호 에러 메세지 상태          //
    const [passwordTelNumberErrorMessage, setPasswordTelNumberErrorMessage] = useState<string>('');

    //          state: 이메일 찾기 결과 메세지 상태          //
    const [findEmailMessage, setFindEmailMessage] = useState<string>('');
    //          state: 비밀번호 찾기 결과 메세지 상태          //
    const [findPasswordMessage, setFindPasswordMessage] = useState<string>('');

    //          function: account find email response 처리 함수          //
    const accountFindEmailResponse = (responseBody: AccountFindEmailResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'NU') setFindEmailMessage('일치하는 계정 정보를 찾을 수 없습니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { email } = responseBody as AccountFindEmailResponseDto;
      setFindEmailMessage(`일치하는 이메일은 [ ${email} ] 입니다.`);
    }
    //          function: account find password response 처리 함수          //
    const accountFindPasswordResponse = (code: string) => {
      if (code === 'NU') setFindPasswordMessage('일치하는 계정 정보를 찾을 수 없습니다.');
      if (code === 'DE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      setFindPasswordMessage('일치하는 이메일로 임시 비밀번호를 전송했습니다.');
    }

    //          event handler: 이메일 찾기 전화번호 변경 이벤트 처리          //
    const onEmailTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailTelNumberError(false);
      setEmailTelNumberErrorMessage('');
      setEmailTelNumber(value);
    }
    //          event handler: 비밀번호 찾기 이메일 변경 이벤트 처리          //
    const onPasswordEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordEmailError(false);
      setPasswordEmailErrorMessage('');
      setPasswordEmail(value);
    }
    //          event handler: 비밀번호 찾기 전화번호 변경 이벤트 처리          //
    const onPasswordTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordTelNumberError(false);
      setPasswordTelNumberErrorMessage('');
      setPasswordTelNumber(value);
    }

    //          event handler: 이메일 찾기 클릭 이벤트 처리          //
    const onFindEmailButtonClickHandler = () => {
      const requestBody: AccountFindEmailRequestDto = {
        telNumber: emailTelNumber
      };
      accountFindEmailRequest(requestBody).then(accountFindEmailResponse);
    }
    //          event handler: 비밀번호 찾기 클릭 이벤트 처리          //
    const onFindFindButtonClickHandler = () => {
      const requestBody: AccountFindPasswordRequestDto = {
        email: passwordEmail,
        telNumber: passwordTelNumber
      };
      accountFindPasswordRequest(requestBody).then(accountFindPasswordResponse);
    }
    //          event handler: 로그인 링크 클릭 이벤트 처리          //
    const onSignInLinkClickHandler = () => {
      setPage('sign-in');
    }

    //          render: 정보 찾기 컴포넌트 렌더링          //
    return (
      <div id="find-card">
        <div id="find-email-container">
          <div className='find-email-title'>{'이메일 찾기'}</div>
          <div className='find-email-input-container'>
            <InputBox ref={emailTelNumberRef} label='휴대 전화번호' type='text' placeholder='휴대전화 번호를 입력하세요.' value={emailTelNumber} onChange={onEmailTelNumberChangeHandler} error={isEmailTelNumberError} errorMessage={emailTelNumberErrorMessage} />
          </div>
          {findEmailMessage !== '' && <div className='find-message'>{findEmailMessage}</div>}
          <div className='find-email-action-container'>
            <div className='large-button' onClick={onFindEmailButtonClickHandler}>{'이메일 찾기'}</div>
          </div>
        </div>
        <div className='divider'></div>
        <div id="find-password-container">
          <div className='find-password-title'>{'비밀번호 찾기'}</div>
          <div className='find-password-input-container'>
            <InputBox ref={passwordEmailRef} label='이메일' type='text' placeholder='이메일을 입력하세요.' value={passwordEmail} onChange={onPasswordEmailChangeHandler} error={isPasswordEmailError} errorMessage={passwordEmailErrorMessage} />
            <InputBox ref={passwordTelNumberRef} label='휴대 전화번호' type='text' placeholder='휴대전화 번호를 입력하세요.' value={passwordTelNumber} onChange={onPasswordTelNumberChangeHandler} error={isPasswordTelNumberError} errorMessage={passwordTelNumberErrorMessage} />
          </div>
          {findPasswordMessage !== '' && <div className='find-message'>{findPasswordMessage}</div>}
          <div className='find-password-action-container'>
            <div className='large-button' onClick={onFindFindButtonClickHandler}>{'비밀번호 찾기'}</div>
          </div>
        </div>
        <div className='find-link-box'>
          <div className='link' onClick={onSignInLinkClickHandler}>{'로그인 화면으로'}</div>
        </div>
      </div>
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
