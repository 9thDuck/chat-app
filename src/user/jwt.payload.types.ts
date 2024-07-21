import { GenericSuccessResPayload } from 'src/types';

export interface SignInSuccessResPayload extends GenericSuccessResPayload {
  accessToken: string;
}

export class JwtPayload {
  username: string;
  email: string;
}
