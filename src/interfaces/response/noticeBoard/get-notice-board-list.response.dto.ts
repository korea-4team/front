import ResponseDto from "../response.dto";
import NoticeBoardListResponseDto from "./notice-board-list.response.dto";

export default interface GetNoticeBoardListResponseDto extends ResponseDto {

	noticeBoardList : NoticeBoardListResponseDto[];

}