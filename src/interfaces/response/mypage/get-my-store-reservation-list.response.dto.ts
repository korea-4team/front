import ResponseDto from "../response.dto";

export default interface GetMyStoreReservationListResponseDto extends ResponseDto {
  myStoreReservationList: userStoreReservationDto[];
}

export interface userStoreReservationDto {
  reservationNumber: number | string;
  date: string;
  reservationDate: string;
  people: number | string;
  accompanyInfant: string;
  email: string;
  nickname: string;
}