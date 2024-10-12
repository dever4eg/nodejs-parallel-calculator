import { Worker } from 'worker_threads';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class CalculateMathAsyncService {
  calculateMathAsync(expression: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(join(__dirname, 'calculate-math.worker.js'), {
        workerData: expression,
      });

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }
}
