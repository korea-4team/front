export default interface PostEventBoardRequestDto {
  title: string;
  contents: string;
  imageUrl?: string | null;
}