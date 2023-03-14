export interface UserAuthDataModel {
  readonly user: User;
}

interface User {
  readonly id: string;
  readonly context: Context;
}

interface Context {
  readonly iss: string;
  readonly aud: string;
  readonly auth_time: number;
  readonly user_id: string;
  readonly sub: string;
  readonly iat: number;
  readonly exp: number;
  readonly email: string;
  readonly email_verified: boolean;
  readonly firebase: Firebase;
  readonly uid: string;
}

interface Firebase {
  readonly identities: Identities;
  readonly sign_in_provider: string;
}

interface Identities {
  readonly email: string[];
}
