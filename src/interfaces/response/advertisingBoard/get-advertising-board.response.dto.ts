import ResponseDto  from "../response.dto";


export default interface GetAdvertisingBoardResponseDto extends ResponseDto{
  boardNumber : number;
  title : string;
  contents : string;
  imageUrl: string | null;
  writeDatetime: string;
  writerNickname: string;
  writerEmail: string;
  location: string;
  businessType: string;
  tagWord: string;
}