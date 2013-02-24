var scale = require("./scale/scale");
scale.linear = require("./scale/linear");
scale.log = require("./scale/log");
scale.pow = require("./scale/pow");
scale.sqrt = require("./scale/sqrt");
scale.ordinal = require("./scale/ordinal");
scale.category10 = require("./scale/category");
scale.category20 = require("./scale/category").category20;
scale.category20b = require("./scale/category").category20b;
scale.category20c = require("./scale/category").category20c;
scale.quantile = require("./scale/quantile");
scale.quantize = require("./scale/quantize");
scale.threshold = require("./scale/threshold");
scale.identity = require("./scale/identity");
module.exports = scale;