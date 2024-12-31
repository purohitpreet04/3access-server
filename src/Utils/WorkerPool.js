import { Worker } from 'worker_threads';
import path from 'path';
import { __dirname } from '../../index.js';

class WorkerPool {
  constructor(size) {
    this.size = size;
    this.workers = [];
    this.queue = [];
    this.activeWorkers = 0;
  }
  addWorker() {
    const worker = new Worker(
      path.resolve(__dirname, 'src/WorkerServices/Worker.js')
    );
    this.workers.push(worker);
    return worker;
  }

  async runTask(data) {
    return new Promise((resolve, reject) => {
      const worker = this.workers.find(w => !w.busy);
      
      if (worker) {
        worker.busy = true;
        worker.postMessage(data);
        
        worker.once('message', (result) => {
          worker.busy = false;
          this.processQueue();
          
          if (result.success) {
            resolve(result);
          } else {
            reject(new Error(result.error));
          }
        });
        
        worker.once('error', reject);
      } else if (this.workers.length < this.size) {
        const newWorker = this.addWorker();
        this.runTask(data).then(resolve).catch(reject);
      } else {
        this.queue.push({ data, resolve, reject });
      }
    });
  }

  processQueue() {
    if (this.queue.length > 0) {
      const { data, resolve, reject } = this.queue.shift();
      this.runTask(data).then(resolve).catch(reject);
    }
  }
}


export default WorkerPool;