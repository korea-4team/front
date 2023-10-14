import ResponseDto from "../response.dto";
import { ReviewBoardListResponseDto } from "../reviewBoard";

export default interface GetBoardListResponseDto extends ResponseDto {
  boardList: ReviewBoardListResponseDto[];
}