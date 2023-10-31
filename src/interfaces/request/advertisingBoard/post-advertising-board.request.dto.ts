import { PostMenu, PostTag } from "types";

export default interface PostAdvertisingBoardDto{
  title : string;
  contents : string;
  location : string;
  businessType: string;
  imageUrls : string[];
  menuList: PostMenu[];
  tagList: string[];
  storeName: string;
  storeTel: string;
  storeTime: string;
  storeNumber : string;
  storeAddress: string;
  bookTime: string;
  book: string;
  bookKids: string;
}