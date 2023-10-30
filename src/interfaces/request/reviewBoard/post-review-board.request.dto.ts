export default interface PostReviewBoardRequestDto {
    title: string;
    contents: string;
    location: string;
    businessType: string;
    imageUrl?: string | null;
}