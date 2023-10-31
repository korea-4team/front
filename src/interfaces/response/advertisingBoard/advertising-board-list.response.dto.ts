export default interface AdvertisingBoardListResponseDto{
  boardNumber : number;
  title : string;
  contents: string;
  imageUrl: string | null;
  viewCount: number;
  shortReviewCount : number;
  favoriteCount : number;
  writeDatetime: string;
  writerNickname : string;
  location : string;
  businessType : string;
  tagWord : string;
  storeName: string;
  storeTel: string;
  storeTime: string;
  storeNumber : string;
  storeAddress: string;
  bookTime: string;
  book: string;
  bookKids: string;
}