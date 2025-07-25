import { User } from '../../user/entity/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
