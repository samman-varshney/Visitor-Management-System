export interface BaseEntityStore {
  create?: {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    message?: string;
  };
  update?: {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    message?: string;
  };
  list?: {
    loading?: boolean;
    error?: boolean;
    message?: string;
    success?: boolean;
  };
  get?: {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    message?: string;
  };
  delete?: {
    loading?: boolean;
    error?: boolean;
    message?: string;
    success?: boolean;
  };
  archive?: {
    loading?: boolean;
    error?: boolean;
    message?: string;
    success?: boolean;
  };
}
