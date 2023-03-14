import { LoginModel } from './login.model';

export interface RegisterAndLoginModel extends LoginModel {}

export interface RegisterModel {
  readonly user: User;
  readonly providerId?: any;
  readonly _tokenResponse: TokenResponse;
  readonly operationType: string;
}

interface TokenResponse {
  readonly kind: string;
  readonly idToken: string;
  readonly email: string;
  readonly refreshToken: string;
  readonly expiresIn: string;
  readonly localId: string;
}

interface User {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly providerData: ProviderDatum[];
  readonly stsTokenManager: StsTokenManager;
  readonly createdAt: string;
  readonly lastLoginAt: string;
  readonly apiKey: string;
  readonly appName: string;
}

interface StsTokenManager {
  readonly refreshToken: string;
  readonly accessToken: string;
  readonly expirationTime: number;
}

interface ProviderDatum {
  readonly providerId: string;
  readonly uid: string;
  readonly displayName?: any;
  readonly email: string;
  readonly phoneNumber?: any;
  readonly photoURL?: any;
}
