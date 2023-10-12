import ResponseDto from "../response.dto";

export default interface GetCommentListResponseDto extends ResponseDto {
    commentList: CommentListResponseDto[];
}

export interface CommentListResponseDto {
  nickname: string;
  contents: string;
  writeDatetime: string;
}