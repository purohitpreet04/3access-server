import { checkTenatStatus, handleSendEmail } from "./CronJobFunction.js";
import cron  from 'node-cron'

// cron.schedule('0 0 */7 * *', () => {
//     checkTenatStatus()
// });
cron.schedule('0 4 * * *', () => {
    console.log(`Running job at: ${moment().tz('Europe/London').format()}`);
    checkTenatStatus(); // Make sure this function is defined
}, {
    timezone: 'Europe/London' // Ensures 4 AM UK time (adjusts for BST/GMT)
});


cron.schedule('0 6 * * *', () => {
    console.log(`Running job at: ${moment().tz('Europe/London').format()}`);
    handleSendEmail(); 
}, {
    timezone: 'Europe/London' // Ensures 4 AM UK time (adjusts for BST/GMT)
});



export function initCronJobs() {
    console.log('Cron jobs initialized');
}