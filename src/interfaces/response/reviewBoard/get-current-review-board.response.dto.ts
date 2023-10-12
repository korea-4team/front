import ResponseDto from "../response.dto";
import ReviewBoardListResponseDto from "./review-board-list.response.dto";

export default interface GetCurrentReviewBoardREsponseDto extends ResponseDto {
  reviewBoardList: ReviewBoardListResponseDto[];
}