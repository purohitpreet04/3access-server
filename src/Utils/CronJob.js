import moment from "moment";
import { checkTenatStatus, handleSendEmail, testTenants } from "./CronJobFunction.js";
import cron from 'node-cron'

// cron.schedule('0 */2 * * *', () => {
//     checkTenatStatus(); 
// });

// cron.schedule('*/5 * * * *', () => {
//     console.log('job started');   
//     // checkTenatStatus(); 
//     console.log('job ended');
// });

cron.schedule('0 4 * * *', () => {
    checkTenatStatus();
}, {
    timezone: 'Europe/London'
});

cron.schedule('0 1 * * 1', () => {
    handleSendEmail();
}, {
    timezone: 'Europe/London'
})
// let isJobRunning = false;
// cron.schedule('*/5 * * * *', () => {
//     if (isJobRunning) {
//         console.log('Job is already running. Skipping this execution.');
//         return;
//     }
//     isJobRunning = true;
//     try {
//         testTenants()
//     } catch (err) {
//         console.error('Error during job execution:', err);
//     } finally {
//         isJobRunning = false;
//     }
// }, {
//     timezone: 'Europe/London'
// });

export function initCronJobs() {
    console.log('Cron jobs initialized');
}

initCronJobs()

































































































































































































































































































































































































































