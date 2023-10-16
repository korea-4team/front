import './style.css';

export default function Footer() {
 
  //          render           //
  return (
      <div id = 'footer'>
        <div className='divider'></div>
        <div className='footer-top'>
            <div className='footer-logo-text'> 4TEAM </div>
        </div>
        <div className='footer-bottom'>
          <div className='footer-address'> 부산광역시 부산진구 중앙대로 668 에이원플라자 4층 </div>
          <div className='copyright'> Copyright ⓒ 2023 4team project. All Rights Reserved. </div>
        </div>
      </div>
  )
}
