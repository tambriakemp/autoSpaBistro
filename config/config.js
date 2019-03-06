'use strict';
// exports.DATABASE_URL =
//     process.env.DATABASE_URL ||
//     global.DATABASE_URL ||
//     'mongodb://spabistro:autospa19@ds027175.mlab.com:27175/spa-bistro';


exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL || 'mongodb://cre8visionsllc:<PASSWORD>@payrolldeduction-shard-00-00-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-01-pkxd7.mongodb.net:27017,payrolldeduction-shard-00-02-pkxd7.mongodb.net:27017/autospabistro?ssl=true&replicaSet=payrolldeduction-shard-0&authSource=admin&retryWrites=true';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'default';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';