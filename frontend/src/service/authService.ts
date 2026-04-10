import { baseApiService } from "./baseApiService";
import { authRoutes } from "./api-routes";
import type { LoginRequestDTO, LoginResponseDTO } from "../dtos/auth/login";
import type {
  RegisterRequestDto,
  RegisterResponseDTO,
} from "../dtos/auth/register";

export class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    return baseApiService.post<LoginResponseDTO>(
      authRoutes.guest.login(),
      payload,
      { requireAuth: false },
    );
  }
  public async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponseDTO> {
    return baseApiService.post<RegisterResponseDTO>(
      authRoutes.guest.register(),
      payload,
      { requireAuth: false },
    );
  }
}
export const authservice = AuthService.getInstance();
