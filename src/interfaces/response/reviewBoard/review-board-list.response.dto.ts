export default interface ReviewBoardListResponseDto {
  boardNumber: number;
  title: string;
  contents: string;
  imageUrl: string | null;
  viewCount: number;
  commentCount: number;
  favoriteCount: number;
  writeDatetime: string;
  writerNickname: string;
  location: string;
  businessType: string;
}