import ResponseDto from "../response.dto";
import AdvertisingBoardListResponseDto from "./advertising-board-list.response.dto";

export default interface GetAdvertisingLocationListResponseDto extends ResponseDto{
  advertisingboardlist : AdvertisingBoardListResponseDto[];
}