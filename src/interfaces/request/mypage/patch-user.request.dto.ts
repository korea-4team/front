export default interface PatchUserRequestDto {
  password: string;
  nickname: string;
  address: string;
  addressDetail?: string | null;
  telNumber: string;
}