import ResponseDto from "../response.dto";

export default interface GetMyCommentListResponseDto extends ResponseDto {
  myCommentList: userCommentList[];
}

export interface userCommentList {
  commentNumber: number | string;
  contents: string;
  writeDatetime: string;
  boardNumber: number | string;
  title: string;
  imageUrl: string;
}