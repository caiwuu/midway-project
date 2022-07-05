/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-05 15:44:48
 */
import { Inject, Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { UserModel } from '../model/user.model';
import { UserDTO } from '../dto/user.dto';
import { Validate } from '@midwayjs/validate';
@Provide()
export class UserService {
  @Inject()
  userModel: UserModel;
  @Validate()
  async getUser(options: UserDTO) {
    const user = await this.userModel.getUserByUsernameAndPassword(options);
    return user;
  }
  // 设置用户
  async setUser(options: IUserOptions) {
    await this.userModel.setUser(options);
    return options;
  }
}
