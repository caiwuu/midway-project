/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-05 17:20:52
 */
import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(
    @Query('username') username: string,
    @Query('password') password: string
  ) {
    try {
      const user = await this.userService.getUser({ username, password });
      console.log('================1111111');
      return { code: 200, message: 'OK', data: user };
    } catch (error) {
      console.log(error);

      return {
        code: 422,
        result: 'error',
        message: error.cause.details[0].message,
        data: null,
      };
    }
  }
  @Get('/set_user')
  async setUser(
    @Query('username') username: string,
    @Query('password') password: string
  ) {
    const user = await this.userService.setUser({ username, password });
    return {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: this.ctx.get('authorization'),
      user,
    };
  }
}
