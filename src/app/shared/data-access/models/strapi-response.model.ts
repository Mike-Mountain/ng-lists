export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: any
}
