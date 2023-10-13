export default interface EventBoardListResponseDto {
  boardNumber: number;
  title: string;
  contents: string;
  imageUrl: string | null;
  writeDatetime: string;
  writerNickname: string;
}