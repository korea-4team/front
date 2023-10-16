import ResponseDto from "../response.dto";

export default interface GetUserResponseDto extends ResponseDto {
	
	email : string;
	password : string;
	nickname : string;
	address : string;
	addressDetail : string;
	role : string;
	telNumber : string;

}