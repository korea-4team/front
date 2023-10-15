export default interface PatchReviewBoardRequestDto {
    title: string;
    contents: string;
    location: string;
    businessType: string;
    imageUrl?: string | null;
}