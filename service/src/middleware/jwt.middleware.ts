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
      // 判断下有没有校验信息

      if (!ctx.headers['authorization']) {
        return {
          code: 401,
          result: 'error',
          message: 'token无效',
          data: /login?/.test(ctx.request.URL.pathname),
        };
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        return {
          code: 401,
          result: 'error',
          message: 'token无效',
          data: null,
        };
      }
      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
          await next();
        } catch (error) {
          return {
            code: 401,
            result: 'error',
            message: 'token无效',
            data: null,
          };
          //token过期 生成新的token
          // const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          // ctx.set('Authorization', newToken);
        }
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/api/admin/login') !== -1;
    return !ignore;
  }
}
