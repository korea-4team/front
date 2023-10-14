import ResponseDto from "../response.dto";

export default interface GetReservationListResponseDto extends ResponseDto{
  reservation: ReservationListDto[];
}

export interface ReservationListDto {
  boardNumber: number | string;
  title: string;
  reservationNumber: number | string;
  date: string;
  reservationDate: string;
  people: string;
  accompanyInfant: string;
}