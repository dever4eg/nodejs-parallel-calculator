import { parentPort, workerData } from 'worker_threads';
import { calculateMath } from '../math/calculate-math';

function run() {
  const expression: string = workerData;

  const result = calculateMath(expression);

  parentPort.postMessage(result);
}

run();
