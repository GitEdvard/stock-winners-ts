import { Repository, ValidatedRow, instance } from '../app/repository';

describe('testing index file', () => {
  test('length of data', () => {
    expect(instance.GetData().length).toBe(22);
  });

  test('return value', () => {
    expect(instance.GetStockExchangeFromContets().length).toBe(21);
  });

  test('return first returned value', () => {
      let result = instance.GetStockExchangeFromContets();
      expect(result[0].name).toBe('ABB');
  });

  test('validated row', () => {
    let row = '2017-01-01 12:00:00;ABB;217';
    let validatedRow = new ValidatedRow(row);
    expect(validatedRow.name).toBe('ABB');
    expect(validatedRow.timestamp.toLocaleDateString('sv-SE')).toBe('2017-01-01');
    expect(validatedRow.value).toBe(217);
  });

});
