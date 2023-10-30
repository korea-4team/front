import ResponseDto from "../response.dto";

export default interface getUserStoreInfoResponseDto extends ResponseDto {
	
	storeNumber : string;
	storeName : string;
	address : string;
	addressDetail: string;
	businessType: string;
	ownerName: string;
	startHours: string;
	finishHours: string;
	telNumber: string;

}