import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { IUserOptions } from '../interface';
@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    userOptions: IUserOptions
  ): Promise<UserEntity> {
    return await this.userRepo.findOne({
      where: {
        username: userOptions.username,
        password: userOptions.password,
      },
    });
  }
  async setUser(userOptions: IUserOptions): Promise<UserEntity> {
    const user = new UserEntity();
    user.id = userOptions.id;
    user.username = userOptions.username;
    user.password = userOptions.password;
    console.log(this.userRepo);

    return await this.userRepo.save(user);
  }
}
