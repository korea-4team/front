export default interface PostAdvertisingBoardDto{
  title : string;
  contents : string;
  location : string;
  businessType: string;
  imageUrl? : string | null;
}