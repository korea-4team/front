export default interface NoticeBoardListResponseDto {
	
	boardNumber: number;
	title: string;
	contents: string;
	imageUrl: string | null;
	writeDatetime: string;
	writerEmail: string | null;
	writerNickname: string;

}