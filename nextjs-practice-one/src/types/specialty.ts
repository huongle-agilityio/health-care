import { ApiPaginationResponse } from './api';

export interface Specialty {
  id: number;
  name: string;
  documentId?: string;
}

export type SpecialtyResponse = ApiPaginationResponse<Specialty[]>;
