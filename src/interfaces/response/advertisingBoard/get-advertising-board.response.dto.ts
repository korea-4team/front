import ResponseDto  from "../response.dto";


export default interface GetAdvertisingBoardResponseDto extends ResponseDto{
  boardNumber : number;
  title : string;
  contents : string;
  imageUrl: string | null;
  writeDatetime: string;
  writerNickname: string;
  wrtierEmail: string;
  location: string;
  businessType: string;
}