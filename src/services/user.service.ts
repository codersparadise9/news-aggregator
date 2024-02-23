import { GenericService } from '../core/services/user-service.interface'
import { User } from '../core/entites/user.entity.interface'

export abstract class UserService extends GenericService<User> {}
