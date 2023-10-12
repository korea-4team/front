export default interface PatchReviewBoardDto {
    title: string;
    contents: string;
    location: string;
    businessType: string;
    imageUrl?: string | null;
}