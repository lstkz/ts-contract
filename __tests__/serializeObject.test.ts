import { serializeObject } from '../src/serializeObject';

const globalConfig = {
  removeFields: ['password', 'token', 'accessToken'],
  debug: true,
  depth: 4,
  maxArrayLength: 30,
  getLogger(serviceName: string) {
    return null as any;
  },
  getNextId: () => 0,
};
it('serialize undefined', () => {
  expect(serializeObject(globalConfig, undefined)).toMatchSnapshot();
});
it('serialize null', () => {
  expect(serializeObject(globalConfig, null)).toMatchSnapshot();
});
it('serialize example object', () => {
  expect(serializeObject(globalConfig, { foo: 'a', bar: 123 })).toMatchSnapshot();
});
it('circular', () => {
  const obj: any = { foo: 'a', bar: 123 };
  obj.obj = obj;
  expect(serializeObject(globalConfig, obj)).toMatchSnapshot();
});
it('req', () => {
  const obj = {
    req: {
      method: 'GET',
      url: '/foo',
      headers: {},
      connection: {
        remoteAddress: '::0',
        remotePort: 1234,
      },
      extraProp: 'foo',
    },
  };
  expect(serializeObject(globalConfig, obj)).toMatchSnapshot();
});
it('res', () => {
  const obj = {
    res: {
      statusCode: 200,
      _header: {},
      extraProp: 'foo',
    },
  };
  expect(serializeObject(globalConfig, obj)).toMatchSnapshot();
});
it('many items', () => {
  const obj = {
    longArray: new Array(400),
  };
  expect(serializeObject(globalConfig, obj)).toMatchSnapshot();
});
