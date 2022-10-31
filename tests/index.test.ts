import { Repository, instance } from '../app/repository';

describe('testing index file', () => {
  test('length of data', () => {
    expect(instance.GetData().length).toBe(22);
  });

  test('return value', () => {
    expect(instance.GetStockExchangeFromContets().length).toBe(21);
  });
});
