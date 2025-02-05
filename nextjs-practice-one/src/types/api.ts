// Base Pagination
export interface ApiPagination {
  currentPage: number;
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiPaginationResponse<T1> {
  data: T1;
  meta: {
    pagination: ApiPagination;
  };
}

export interface PayloadData<T> {
  data: T;
}
