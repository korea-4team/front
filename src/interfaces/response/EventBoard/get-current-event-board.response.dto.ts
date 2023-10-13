import ResponseDto from "../response.dto";
import EventBoardListResponseDto from "./event-board-list.response.dto";

export default interface GetCurrentEventBoardResponseDto extends ResponseDto {
  eventBoardList: EventBoardListResponseDto[];
}