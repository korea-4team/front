import { NoticeBoardListResponseDto } from 'interfaces/response/noticeBoard';
import './style.css';

import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
	item: NoticeBoardListResponseDto;
}

//					component					//
// description : 공지사항 게시물 리스트 아이템 컴포넌트
export default function NoticeBoardListItem( { item }: Props) {
	
	//					state					//
	// description : 속성으로 받아오는 게시물 관련 상태 //
	const { boardNumber, title, contents, imageUrl } = item;
	const { writerEmail, writeDatetime, writerNickname } = item;

	//					function					//
	// description : 페이지 이동을 위한 네비게이트 함수 //
	const navigator = useNavigate();

	//					event handler					//
	// description : 컴포넌트 클릭 이벤트 //
	const onClickHandler = () => {
		// navigator(GET_NOTICE_BOARD_DETAIL_URL(boardNumber));
	}
	
	//					component					//

	//					effect					//
	
	//					render					//
	return (
		<div className='notice-board-list-item-box' onClick={onClickHandler}>
			<div className='divider'></div>
			<div className='notice-board-list-box'>
				<div className='notice-board-number'>{ boardNumber }</div>
				<div className='notice-board-title'>{ title }</div>
				<div className='notice-board-writer'>{ writerEmail }</div>
				<div className='notice-board-write-date'> { writeDatetime }</div>
			</div>
		</div>

		
	)
}
