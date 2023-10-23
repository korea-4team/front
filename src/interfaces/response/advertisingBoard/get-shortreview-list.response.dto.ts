import ResponseDto from "../response.dto";
import ShortReivewResponseDto from "./short-review.response.dto";

export default interface GetShortReviewListResponseDto extends ResponseDto {
  shortList: ShortReivewResponseDto[];
}
