import { PostMenu } from "types";
import ResponseDto  from "../response.dto";


export default interface GetAdvertisingBoardResponseDto extends ResponseDto{
  boardNumber : number;
  title : string;
  contents : string;
  imageUrls: string | null;
  writeDatetime: string;
  writerNickname: string;
  writerEmail: string;
  location: string;
  businessType: string;
  tagList: string;
  menuList: PostMenu[];
  storeName: string;
  storeTel: string;
  storeTime: string;
  storeNumber : string;
  storeAddress: string;
  bookTime: string;
  book: string;
  bookKids: string;
}