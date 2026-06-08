import * as bcrypt from 'bcrypt';
import { User } from '../../../db/entities/user.entity';
export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  data: User,
  password: string,
): Promise<boolean> => {
  return data.password === (await hashPassword(password, data.salt));
};
