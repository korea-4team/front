import ResponseDto from "../response.dto";

export default interface GetEventBoardResponseDto extends ResponseDto {
  boardNumber: number;
  title: string;
  contents: string;
  imageUrl: string;
  writeDatetime: string;
	adminId : string;
	adminNickname : string;
}