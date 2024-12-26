// Base Pagination
export interface ApiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiPaginationResponse<T1> {
  data: T1[];
  meta: {
    pagination: ApiPagination;
  };
}
