import ResponseDto from "../response.dto";

export default interface GetMainBannerResponseDto extends ResponseDto {
	 
	bannerNumber : number;
	 imageUrl : string;
	 sequence : string;
	 writeDatetime : string;
	 writerEmail : string;
	 eventBoardNumber : number;

}