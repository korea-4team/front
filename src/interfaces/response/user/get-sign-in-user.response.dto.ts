import ResponseDto from "../response.dto";

export default interface GetSignInUserResponseDto extends ResponseDto {
    email: string;
    nickname: string;
    address: string;
    addressDetail: string | null;
    role: string;
    telNumber: string;
}