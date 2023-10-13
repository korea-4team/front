export default interface PostRegistrationRequestDto {
  storeNumber: string;
  stoerName: string;
  address: string;
  addressDetail?: string | null;
  businessType: string;
  storeStartHours: string;
  storeFinishHours: string;
  storeTelNumber: string;
}