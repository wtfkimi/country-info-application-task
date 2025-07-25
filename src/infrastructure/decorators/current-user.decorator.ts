import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  const { user } = req;
  return data ? user?.[data] || undefined : user;
});
