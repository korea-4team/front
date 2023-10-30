import ResponseDto from "../response.dto";

export default interface GetShortReviewListResponseDto extends ResponseDto {
  shortList: ShortReviewListResponseDto[];
}

export interface ShortReviewListResponseDto {

  shortReviewNumber: number;
  contents : string;
  score : number;
  writeDatetime : string;
  writerNickname : string;
  writerEmail: string;

}
