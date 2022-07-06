import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import { Md5 } from 'ts-md5/dist/md5';

describe('test/controller/api.test.ts', () => {
  let app: Application;

  beforeAll(async () => {
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });
  it('超时 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .set('x-timeout', '1000')
      .send({ username: '', password: '' });
    expect(result.status).toBe(200);
  });
  it('账号密码为空 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .send({ username: '', password: '' });
    expect(result.body.code).toBe(401);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBeDefined();
    expect(result.body.data).toBeDefined();
  });
  it('返回值格式 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .send({ username: '1111', password: Md5.hashStr('1111') });
    expect(result.body.code).toBeDefined();
    expect(result.body.result).toBeDefined();
    expect(result.body.message).toBeDefined();
    expect(result.body.data).toBeDefined();
  });
  it('密码正确 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .send({ username: 'jack', password: Md5.hashStr('redballoon') });
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data).toBeDefined();
  });
  it('密码错误 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .send({ username: 'jack', password: Md5.hashStr('123') });
    expect(result.body.code).toBe(204);
    expect(result.body.message).toBe('用户不存在或者密码不正确');
  });
  it('账号错误 POST /login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/login')
      .send({ username: 'jack222', password: Md5.hashStr('redballoon') });
    expect(result.body.code).toBe(204);
    expect(result.body.message).toBe('用户不存在或者密码不正确');
  });
});
