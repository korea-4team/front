import ResponseDto from "../response.dto";

export default interface GetReviewBoardResponseDto extends ResponseDto {
  boardNumber: number;
  title: string;
  contents: string;
  imageUrl: string | null;
  writeDattetime: string;
  writerNickname: string;
  writerEmail: string;
}