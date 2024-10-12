const { resolve } = require('path');

require('ts-node').register();
require(resolve(__dirname, './calculate-math.worker.ts'));
