import ResponseDto from "../response.dto";

export default interface AccountFindEmailResponseDto extends ResponseDto {
  email: string;
}