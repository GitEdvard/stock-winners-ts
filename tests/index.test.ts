import { hello } from '../index';

describe('testing index file', () => {
  test('hello should return Hello world! ', () => {
    expect(hello()).toBe('Hello world! ');
  });
});
