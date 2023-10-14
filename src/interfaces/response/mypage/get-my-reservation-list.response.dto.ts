import ResponseDto from "../response.dto";

export default interface GetMyReservationListResonseDto extends ResponseDto {
  myReservationList: userReservationDto[];
}

export interface userReservationDto{
  reservationNumber: number | string;
  date: string;
  reservationDate: string;
  people: number | string;
  accompanyInfant: string;
  boardNumber: number | string;
  title: string;
  contents: string;
  imageUrl: string;
}