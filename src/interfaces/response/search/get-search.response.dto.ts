import AdvertisingBoardListResponseDto from "../advertisingBoard/advertising-board-list.response.dto";
import ResponseDto from "../response.dto";
import { ReviewBoardListResponseDto } from "../reviewBoard";

export default interface GetSearchResponseDto extends ResponseDto {
  advertisingBoardList: AdvertisingBoardListResponseDto[];
  reviewBoardList: ReviewBoardListResponseDto[];
}