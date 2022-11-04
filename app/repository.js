"use strict";
exports.__esModule = true;
exports.instance = exports.ValidatedRow = exports.Repository = void 0;
var domain_1 = require("./domain");
var Repository = /** @class */ (function () {
    function Repository() {
        this.data = [
            'Date;Kod;Kurs',
            '2017-01-01 12:00:00;ABB;217',
            '2017-01-01 12:00:01;NCC;122',
            '2017-01-01 12:00:02;ABB;218',
            '2017-01-01 12:00:03;NCC;123',
            '2017-01-01 12:00:04;NCC;121',
            '2017-01-01 12:00:05;AddLife B;21',
            '2017-01-01 12:00:06;NCC;121',
            '2017-01-01 12:00:06;SSAB B;221',
            '2017-01-01 12:01:04;8TRA;226',
            '2017-01-01 12:01:05;AddLife B;27',
            '2017-01-01 12:01:06;NCC;119',
            '2017-01-01 12:01:07;ABB;219',
            '2017-01-02 12:00:07;ABB;222',
            '2017-01-02 12:00:08;NCC;117',
            '2017-01-02 12:00:09;NCC;116',
            '2017-01-02 12:00:10;8TRA;225',
            '2017-01-02 12:00:23;SSAB B;209',
            '2017-01-02 12:01:10;AddLife B;38',
            '2017-01-02 12:01:09;NCC;116',
            '2017-01-02 12:02:09;NCC;118',
            '2017-01-02 12:03:09;NCC;121'
        ];
    }
    Repository.prototype.GetData = function () {
        return this.data;
    };
    Repository.prototype.GetStockExchangeFromContets = function () {
        var contents = this.data.slice(1);
        var stockValues = [];
        for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
            var row = contents_1[_i];
            var validatedRow = new ValidatedRow(row);
            var stockValue = new domain_1.StockValue(validatedRow.name, validatedRow.value, validatedRow.timestamp);
            stockValues.push(stockValue);
        }
        return stockValues;
    };
    return Repository;
}());
exports.Repository = Repository;
var ValidatedRow = /** @class */ (function () {
    function ValidatedRow(row) {
        var row_split = row.split(';');
        if (row_split.length != 3) {
            throw new Error('Something is wrong with this row: ' + row);
        }
        var timestamp_raw = row_split[0];
        try {
            this.timestamp = new Date(timestamp_raw);
        }
        catch (error) {
            throw new Error('Date cannot be parsed: ' + timestamp_raw);
        }
        this.value = parseInt(row_split[2]);
        this.name = row_split[1];
    }
    return ValidatedRow;
}());
exports.ValidatedRow = ValidatedRow;
exports.instance = new Repository();
