/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-06 17:42:42
 */
import {
  Inject,
  Controller,
  Get,
  Post,
  Query,
  Body,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { UserDTO } from '../dto/user.dto';
import { ValidateService } from '@midwayjs/validate';
@Controller('/')
export class APIController {
  @Inject()
  ctx: Context;
  @Inject()
  validateService: ValidateService;
  @Inject()
  JwtService: JwtService;
  @Inject()
  userService: UserService;

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
  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    try {
      this.validateService.validate(UserDTO, {
        username,
        password,
      });
    } catch (error) {
      return {
        code: 401,
        result: 'error',
        message: error.cause.details[0].message,
        data: null,
      };
    }
    const user = await this.userService.getUser({ username });
    if (user) {
      if (user.password === password) {
        const token = this.JwtService.signSync({
          username,
          password,
        });
        return {
          code: 200,
          result: 'success',
          message: '登录成功',
          data: { token, username },
        };
      } else {
        return {
          code: 204,
          result: 'error',
          message: '用户不存在或者密码不正确',
          data: null,
        };
      }
    } else {
      return {
        code: 204,
        result: 'error',
        message: '用户不存在或者密码不正确',
        data: null,
      };
    }
    // const userInfo = await this.JwtService.verify(token, {
    //   complete: false,
    // });
  }
}
