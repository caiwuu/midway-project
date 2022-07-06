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
@Provide()
export class UserService {
  @Inject()
  userModel: UserModel;
  async getUser(options) {
    const user = await this.userModel.getUserByUsernameAndPassword(options);
    return user;
  }
  // 设置用户
  async setUser(options: IUserOptions) {
    await this.userModel.setUser(options);
    return options;
  }
}
