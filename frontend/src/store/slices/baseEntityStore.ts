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
  list?: { loading?: boolean; error?: boolean; message?: string };
  get?: {
    loading?: boolean;
    error?: boolean;
    success?: boolean;
    message?: string;
  };
  delete?: { loading?: boolean; error?: boolean; message?: string };
  archive?: { loading?: boolean; error?: boolean; message?: string };
}
