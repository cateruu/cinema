export interface Paginated<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
  size: number;
}
