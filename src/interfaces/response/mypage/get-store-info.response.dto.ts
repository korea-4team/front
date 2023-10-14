import ResponseDto from "../response.dto";

export default interface GetStoreInfoResponseDto extends ResponseDto {
  storeNumber: string;
  storeName: string;
  address: string;
  addressDetail: string | null;
  businessType: string;
  ownerName: string;
  startHours: string;
  finishHours: string;
  telNumber: string;
}