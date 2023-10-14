import { PAGE_BY_SECTION } from "constant"

export const getPagination = (boardCount: number, currentSection: number, conutByPage: number) => {
  const section = Math.ceil(boardCount / (PAGE_BY_SECTION * conutByPage));
  const totalPageCount = Math.ceil(boardCount / conutByPage);

  const maxPage = totalPageCount >= currentSection * PAGE_BY_SECTION ? currentSection * PAGE_BY_SECTION : totalPageCount;
  const minPage = 10 * (currentSection - 1) + 1;

  return { section, maxPage, minPage, totalPageCount }
}

export const dateFormat = (datetime: string) => {
  const date = new Date(datetime);
  date.setHours(date.getHours() - 9);

  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}