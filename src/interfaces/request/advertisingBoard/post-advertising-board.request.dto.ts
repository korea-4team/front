import { PostMenu, PostTag, PostDetail } from "types";

export default interface PostAdvertisingBoardDto{
  title : string;
  contents : string;
  location : string;
  businessType: string;
  imageUrls : string[];
  menuList: PostMenu[];
  tagList: string[];
  dtail: PostDetail;
}