"use strict";
exports.__esModule = true;
exports.StockHistory = exports.StockValue = exports.StockExchange = void 0;
var StockExchange = /** @class */ (function () {
    function StockExchange(stockValues) {
        this.stockValues = stockValues;
        this.stockHistories = [];
        var _loop_1 = function (companyName) {
            var stockValuesForCompany = this_1.stockValues.filter(function (sv) { return sv.name === companyName; });
            var stockHistory = new StockHistory(stockValuesForCompany);
            this_1.stockHistories.push(stockHistory);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.GetCompanyList(); _i < _a.length; _i++) {
            var companyName = _a[_i];
            _loop_1(companyName);
        }
    }
    StockExchange.prototype.GetCompanyList = function () {
        var names_set = new Set(this.stockValues.map(function (value) { return value.name; }));
        return Array.from(names_set).filter(function (x) { return x != undefined; });
    };
    StockExchange.prototype.GetDailyWinners = function () {
        var stockMotions = this.stockHistories.map(function (singleStockHistory) { return singleStockHistory.GetLatestMotion(); });
        stockMotions.sort(function (x) { return x.changeInPercent; });
        stockMotions.reverse();
        return stockMotions.slice(0, 3);
    };
    return StockExchange;
}());
exports.StockExchange = StockExchange;
var StockValue = /** @class */ (function () {
    function StockValue(name, value, timestamp) {
        this.name = name;
        this.value = value;
        this.timestamp = timestamp;
    }
    return StockValue;
}());
exports.StockValue = StockValue;
var StockHistory = /** @class */ (function () {
    function StockHistory(stockValues) {
        this.stockValues = stockValues;
    }
    StockHistory.prototype.GetLatestEachDay = function () {
        var stockValuesByDay = {};
        for (var _i = 0, _a = this.stockValues; _i < _a.length; _i++) {
            var sv = _a[_i];
            if (!(sv.timestamp.toDateString() in stockValuesByDay)) {
                stockValuesByDay[sv.timestamp.toDateString()] = [];
            }
            stockValuesByDay[sv.timestamp.toDateString()].push(sv);
        }
        var latestByDay = new Map();
        for (var _b = 0, _c = Object.entries(stockValuesByDay); _b < _c.length; _b++) {
            var _d = _c[_b], day = _d[0], _ = _d[1];
            var dailyStockValues = stockValuesByDay[day];
            var sortedStockValues = dailyStockValues.sort(function (element) { return element.timestamp.getTime(); });
            sortedStockValues.reverse();
            var latestValue = sortedStockValues[0];
            latestByDay.set(day, latestValue);
        }
        return latestByDay;
    };
    StockHistory.prototype.GetLatestMotion = function () {
        var latestValueByDay = this.GetLatestEachDay();
        var dailyList = [];
        latestValueByDay.forEach(function (value, key) {
            dailyList.push(value);
        });
        var sortedDailyList = dailyList.sort(function (stockValue) { return stockValue.timestamp.getTime(); });
        dailyList.reverse();
        var todaysStockValue = dailyList[0];
        var yesterdaysStockValue = dailyList[1];
        var latestMotion = new LatestStockMotion(todaysStockValue, yesterdaysStockValue);
        return latestMotion;
    };
    return StockHistory;
}());
exports.StockHistory = StockHistory;
var LatestStockMotion = /** @class */ (function () {
    function LatestStockMotion(todaysStockValue, yesterdaysStockValue) {
        this.name = todaysStockValue.name;
        this.changeInPercent = (todaysStockValue.value / yesterdaysStockValue.value - 1) * 100;
        this.latest = todaysStockValue.value;
    }
    return LatestStockMotion;
}());
