import ResponseDto from "../response.dto";

export default interface GetNoticeBoardResponseDto extends ResponseDto {
	 
	boardNumber : number;
	title : string;
	contents : string;
	imageUrl : string;
	WriteDatetime : string;
	adminId : string;
	adminNickname : string;

}