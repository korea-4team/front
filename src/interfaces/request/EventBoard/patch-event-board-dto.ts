export default interface PatchEventBoardRequestDto {
  title: string;
  contents: string;
  imageUrl?: string | null;
}