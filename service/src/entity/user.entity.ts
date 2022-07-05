/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-05 14:31:14
 */
import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
@EntityModel()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '用户的自增ID',
  })
  id: number;

  @Column('varchar', {
    name: 'username',
    comment: '用户名',
    length: 64,
  })
  username: string;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '用户密码',
    length: 64,
  })
  password: string | null;
}
