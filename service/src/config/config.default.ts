/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-05 16:04:26
 */
import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1656954221098_6806',
  koa: {
    port: 7001,
  },
  validate: {
    validationOptions: {
      allowUnknown: true, // 全局生效
    },
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d',
  },
  orm: {
    type: 'sqlite', // or use mysql see typeorm docs
    database: join(__dirname, '../../db.sql'),
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  },
} as MidwayConfig;
