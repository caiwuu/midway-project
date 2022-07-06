/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-06 17:40:15
 */
// src/middleware/jwt.middleware

import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
// import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 登录不经过jwt验证
      console.log(ctx.request.url);
      if (ctx.request.url === '/login') {
        await next();
        return;
      }
      console.log(ctx.headers['token']);

      // jwt验证
      if (!ctx.headers['token']) {
        ctx.response.status = 401;
        return {
          code: 401,
          result: 'error',
          message: '无效token',
          data: null,
        };
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('token').trim().split(' ');
      if (parts.length !== 2) {
        ctx.response.status = 401;
        return {
          code: 401,
          result: 'error',
          message: '无效token',
          data: null,
        };
      }
      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          await this.jwtService.verify(token, {
            complete: true,
          });
          await next();
          //TODO  jwt 过期校验
        } catch (error) {
          return {
            code: 401,
            result: 'error',
            message: '无效token',
            data: null,
          };
        }
      }
    };
  }
}
