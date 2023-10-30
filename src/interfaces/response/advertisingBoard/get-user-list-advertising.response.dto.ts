import ResponseDto from "../response.dto"
import AdvertisingBoardListResponseDto from "./advertising-board-list.response.dto"

export default interface GetUserListAdvertisingBoardResponseDto extends ResponseDto{
  advertisingboardList : AdvertisingBoardListResponseDto[];
}