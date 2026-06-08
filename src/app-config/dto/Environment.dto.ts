import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Environment } from '../../common/enums/common.enums';

@Exclude()
export class EnvironmentDTO {
  @Expose()
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV!: Environment;

  @Expose()
  @IsNotEmpty()
  port!: number;
}
