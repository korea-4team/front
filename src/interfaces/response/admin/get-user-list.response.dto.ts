import ResponseDto from "../response.dto";
import UserListResponseDto from "./user-list.response.dto";

export default interface GetUserListResponseDto extends ResponseDto {

	userList : UserListResponseDto[];

}