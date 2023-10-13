export default interface ReviewBoardListResponseDto {
  boardNumber: number;
  title: string;
  viewCount: number;
  commentCount: number;
  favoriteCount: number;
  writeDatetime: string;
  writerNickname: string;
}