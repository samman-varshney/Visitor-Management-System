import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
interface AuthInternalConfig extends InternalAxiosRequestConfig {
  requireAuth?: boolean;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  requireAuth?: boolean;
}

export class BaseApiService {
  private static instance: BaseApiService;
  private readonly client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
      timeout: 15_000,
      headers: { "Content-Type": "application/json" },
    });

    this.client.interceptors.request.use(
      (config: AuthInternalConfig): AuthInternalConfig => {
        const token = localStorage.getItem("auth_token");
        if (token && config.requireAuth !== false) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 401) {
          localStorage.removeItem("auth_token");
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): BaseApiService {
    if (!BaseApiService.instance) {
      BaseApiService.instance = new BaseApiService();
    }
    return BaseApiService.instance;
  }

  public async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.client.get<T>(url, config).then((r) => r.data);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<T> {
    return this.client.post<T>(url, data, config).then((r) => r.data);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<T> {
    return this.client.put<T>(url, data, config).then((r) => r.data);
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: ApiRequestConfig,
  ): Promise<T> {
    return this.client.patch<T>(url, data, config).then((r) => r.data);
  }

  public async delete<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    return this.client.delete<T>(url, config).then((r) => r.data);
  }
}

export const baseApiService = BaseApiService.getInstance();
