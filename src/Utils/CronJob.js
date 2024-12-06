import { checkTenatStatus } from "./CronJobFunction.js";
import cron  from 'node-cron'

cron.schedule('0 0 */7 * *', () => {
    checkTenatStatus()
});

export function initCronJobs() {
    console.log('Cron jobs initialized');
}