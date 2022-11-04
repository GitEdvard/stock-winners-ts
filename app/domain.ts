export class StockExchange {
    stockValues: Array<StockValue>;
    stockHistories: Array<StockHistory>;

    constructor(stockValues: Array<StockValue>){
        this.stockValues = stockValues;
        this.stockHistories = [];
        for (const companyName of this.GetCompanyList()) {
            let stockValuesForCompany = this.stockValues.filter(sv => sv.name === companyName);
            let stockHistory = new StockHistory(stockValuesForCompany);
            this.stockHistories.push(stockHistory);
        }
    }

    GetCompanyList(): Array<string> {
        let names_set = new Set(this.stockValues.map(value => value.name));
        return Array.from(names_set).filter(x => x != undefined);
    }
    GetDailyWinners(): Array<LatestStockMotion> {
        let stockMotions = this.stockHistories.map(singleStockHistory => singleStockHistory.GetLatestMotion());
        stockMotions.sort(x => x.changeInPercent);
        stockMotions.reverse();
        return stockMotions.slice(0, 3);
    }
}

export class StockValue {
    name: string;
    value: number;
    timestamp: Date;

    constructor(name: string, value: number, timestamp: Date) {
        this.name = name;
        this.value = value;
        this.timestamp = timestamp;
    }
}

export class StockHistory {
    stockValues: Array<StockValue>;

    constructor(stockValues: Array<StockValue>) {
        this.stockValues = stockValues;
    }

    private GetLatestEachDay(): Map<string, StockValue> {
        let stockValuesByDay: { [name: string]: Array<StockValue> } = {};
        for (const sv of this.stockValues) {
            if (!(sv.timestamp.toDateString() in stockValuesByDay)) {
                stockValuesByDay[sv.timestamp.toDateString()] = [];
            }
            stockValuesByDay[sv.timestamp.toDateString()].push(sv);
        }
        let latestByDay = new Map();

        for (const [day, _ ] of Object.entries(stockValuesByDay)) {
            let dailyStockValues = stockValuesByDay[day];
            let sortedStockValues = dailyStockValues.sort(element => element.timestamp.getTime());
            sortedStockValues.reverse();
            let latestValue = sortedStockValues[0];
            latestByDay.set(day, latestValue);
        }
        return latestByDay;
    }

    GetLatestMotion(): LatestStockMotion {
        let latestValueByDay = this.GetLatestEachDay();
        let dailyList: Array<StockValue> = [];
        latestValueByDay.forEach((value: StockValue, key: string) => {
            dailyList.push(value);
        });
        let sortedDailyList = dailyList.sort(stockValue => stockValue.timestamp.getTime());
        dailyList.reverse();
        let todaysStockValue = dailyList[0];
        let yesterdaysStockValue = dailyList[1];
        let latestMotion = new LatestStockMotion(todaysStockValue, yesterdaysStockValue);
        return latestMotion;
    }
}

class LatestStockMotion {
    name: string;
    changeInPercent: number;
    latest: number;

    constructor(todaysStockValue: StockValue, yesterdaysStockValue: StockValue) {
        this.name = todaysStockValue.name;
        this.changeInPercent = (todaysStockValue.value / yesterdaysStockValue.value - 1) * 100;
        this.latest = todaysStockValue.value;
    }
}

