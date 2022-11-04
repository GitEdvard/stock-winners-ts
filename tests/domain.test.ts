import { StockExchange, StockValue, StockHistory } from '../app/domain';

describe('testing domain', () => {
  test('StockExchange', () => {
    let stockValues: Array<StockValue> = [
        new StockValue('ABB', 200, new Date('2017-01-01')),
        new StockValue('NCC', 300, new Date('2017-01-01'))
    ];
    let stockExchange = new StockExchange(stockValues);
    let companyList = stockExchange.GetCompanyList();
    let firstHistory = stockExchange.stockHistories[0];
    expect(stockExchange.stockHistories.length).toBe(2);
    expect(companyList.length).toBe(2);
    expect(companyList[0]).toBe('ABB');
    expect(firstHistory.stockValues.length).toBe(1);
    expect(firstHistory.stockValues[0].name).toBe('ABB');
  });

  test('filter stock values', () => {
    let stockValues: Array<StockValue> = [
        new StockValue('ABB', 200, new Date('2017-01-01')),
        new StockValue('NCC', 300, new Date('2017-01-01'))
    ];
    let filteredValues = stockValues.filter(sv => sv.name === 'ABB');
    expect(filteredValues.length).toBe(1);
    expect(filteredValues[0].name).toBe('ABB');
    // let stockHistory = new StockHistory(stockValues);
  });

  test('get latest stock motion', () => {
    let stockValues: Array<StockValue> = [
        new StockValue('ABB', 202, new Date('2017-01-01 12:00:00')),
        new StockValue('ABB', 201, new Date('2017-01-01 12:00:01')),
        new StockValue('ABB', 300, new Date('2017-01-02 12:00:00'))
    ];
    let stockHistory = new StockHistory(stockValues);
    let latestStockMotion = stockHistory.GetLatestMotion();
    expect(latestStockMotion.name).toBe('ABB');
    expect(latestStockMotion.changeInPercent.toPrecision(4)).toBe("49.25");
    expect(latestStockMotion.latest).toBe(300);
  });

  test('daily winners', () => {
    let stockValues: Array<StockValue> = [
        new StockValue('ABB', 217, new Date('2017-01-01 12:00:00')),,
        new StockValue('NCC', 122, new Date('2017-01-01 12:00:01')),,
        new StockValue('ABB', 218, new Date('2017-01-01 12:00:02')),,
        new StockValue('NCC', 123, new Date('2017-01-01 12:00:03')),,
        new StockValue('NCC', 121, new Date('2017-01-01 12:00:04')),,
        new StockValue('AddLife B', 21, new Date('2017-01-01 12:00:05')),,
        new StockValue('NCC', 121, new Date('2017-01-01 12:00:06')),,
        new StockValue('SSAB B', 221, new Date('2017-01-01 12:00:06')),,
        new StockValue('8TRA', 226, new Date('2017-01-01 12:01:04')),,
        new StockValue('AddLife B', 27, new Date('2017-01-01 12:01:05')),,
        new StockValue('NCC', 119, new Date('2017-01-01 12:01:06')),,
        new StockValue('ABB', 219, new Date('2017-01-01 12:01:07')),,
        new StockValue('ABB', 222, new Date('2017-01-02 12:00:07')),,
        new StockValue('NCC', 117, new Date('2017-01-02 12:00:08')),,
        new StockValue('NCC', 116, new Date('2017-01-02 12:00:09')),,
        new StockValue('8TRA', 225, new Date('2017-01-02 12:00:10')),,
        new StockValue('SSAB B', 209, new Date('2017-01-02 12:00:23')),,
        new StockValue('AddLife B', 38, new Date('2017-01-02 12:01:10')),,
        new StockValue('NCC', 116, new Date('2017-01-02 12:01:09')),,
        new StockValue('NCC', 118, new Date('2017-01-02 12:02:09')),,
        new StockValue('NCC', 121, new Date('2017-01-02 12:03:09')),
    ];
    let stockExchange = new StockExchange(stockValues);
    expect(stockExchange.stockHistories.length).toBe(5);
    expect(stockExchange.stockHistories[0].stockValues.length).toBe(4);

    let dailyWinners = stockExchange.GetDailyWinners();
    expect(dailyWinners.length).toBe(3);
    expect(dailyWinners[0].name).toBe('AddLife B');
    expect(dailyWinners[1].name).toBe('NCC');

  });

  test('date', () => {
    let date_str = '2020-01-01 12:00:00';
    let date = new Date(date_str);
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    expect(date.toDateString()).toBe('Wed Jan 01 2020');
  });

  test('dict', () => {
    let mydict = { 'one': 1 };
    for (const [key, _] of Object.entries(mydict)) {
        console.log(key);
    }
    expect(1).toBe(1);
  });

  test('map', () => {
    let mymap: Map<string, number> = new Map();
    mymap.set('one', 1);
    mymap.set('two', 2);
    let myarr: Array<number> = [];
    mymap.forEach((value: number, key: string) => {
        myarr.push(value);
    });
    expect(myarr[0]).toBe(1);
  });

});
