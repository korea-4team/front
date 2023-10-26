export default interface EventBoardListResponseDto {
  boardNumber: number;
  imageUrl: string | null;
  title: string;
  writeDatetime: string;
  adminNickname: string;
}