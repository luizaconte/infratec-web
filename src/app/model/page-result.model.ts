export interface PageResult<T> {
  result: Array<T>;
  currentPage: number;
  totalPages: number;
  count: number;
}
