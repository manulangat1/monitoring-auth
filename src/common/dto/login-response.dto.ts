import { Expose } from 'class-transformer';

export class LoginObjectDTO {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}

export class LoginResponseDTO {
  message: string;
  status: string;
  data: LoginObjectDTO;
}
