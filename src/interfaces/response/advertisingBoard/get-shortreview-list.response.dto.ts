import ResponseDto from "../response.dto";



export default interface GetShortReviewListResponseDto extends ResponseDto{
  shortReview : ShortReivewResponseDto[];
}

export interface ShortReivewResponseDto{
  nickname : string;
  contents : string;
  writeDatetime : string;
}