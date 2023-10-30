import ResponseDto from "../response.dto";

export default interface GetMyShortReviewListResponseDto extends ResponseDto {
  myShortReviewList: userShortReviewDto[];
}

export interface userShortReviewDto {
  shortReviewNumber: number | string;
  writeDatetime: string;
  contents: string;
  imageUrl: string;
  score: string;
  boardNumber: number | string;
  boardTitle: string;
  boardContents: string;
  boardImageUrl: string;
}