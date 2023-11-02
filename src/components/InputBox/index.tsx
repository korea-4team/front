import React, { ChangeEvent, Dispatch, KeyboardEvent, MutableRefObject, SetStateAction, forwardRef, useRef } from 'react';
import './style.css';
import { INPUT_ICON } from 'constant';

//          interface: Input 상자 컴포넌트 Props          //
interface Props {
  label: string;
  type: 'text' | 'password';
  error: boolean;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: INPUT_ICON;
  errorMessage?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onButtonClick?: () => void;
}

//          component: Input 상자 컴포넌트          //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  
  //          state: Properties          //
  const { label, type, error, placeholder, value, icon, errorMessage } = props;
  const { onChange, onKeyDown, onButtonClick } = props;

  //          event handler: input 값 변경 이벤트 처리          //
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!onKeyDown) return;
    onKeyDown(event);
  }

  //          render: Input 상자 렌더링         //
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
        <input ref={ref} className='input' type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} />
        { icon && (
        <div className="input-box-icon" onClick={onButtonClick}>
          { icon === INPUT_ICON.ON ? (<div className="input-on-icon"></div>) :
            icon === INPUT_ICON.OFF ? (<div className="input-off-icon"></div>) :
            icon === INPUT_ICON.ARROW ? (<div className="input-right-arrow-icon"></div>) : (<></>) }
        </div> ) }
        {/* {onButtonClick !== undefined && (
          <div className='icon-button' onClick={onButtonClick}>
            {icon !== undefined && <div className={icon}></div>}
          </div>
        )} */}
      </div>
      <div className='inputbox-message'>{errorMessage}</div>
    </div>
  )
});

export default InputBox;