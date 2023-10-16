import ResponseDto from "../response.dto";
import MainBannerListResponseDto from "./main-banner-list.response.dto";

export default interface GetMainBannerListResponseDto extends ResponseDto {

	mainBannerList : MainBannerListResponseDto[];

}