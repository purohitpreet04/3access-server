import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs'
import moment from 'moment';

async function CheckStatus(user) {

    return new Promise(async (res, rej) => {
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');

        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        try {
            let bdate = user?.dateOfBirth.split('T')[0].split('-')
            await driver.get('https://espws.necsws.com/ords/pwslive/call_initial_apex_page.nes_selfsrv?service=NEB&la=BIRM&language=ENG');
            const linkElement = await driver.wait(until.elementLocated(By.id('link-LANDSUM010')), 10000);
            await driver.executeScript("arguments[0].scrollIntoView(true);", linkElement);
            await driver.executeScript("window.scrollBy(0, -100);");
            await driver.wait(until.elementIsVisible(linkElement), 5000);
            try {
                await linkElement.click();
            } catch (error) {
                if (error.name === 'ElementClickInterceptedError') {
                    await driver.executeScript("arguments[0].click();", linkElement);
                }
            }

            await driver.wait(until.urlContains('f?p=NEBPWS:210'), 10000);
            let url = await driver.getCurrentUrl()
            await driver.get(url);
            driver.sleep(3000)

            const checkbox = await driver.wait(until.elementLocated(By.id('cbCLAU00020')), 10000);
            await driver.executeScript("arguments[0].value = 'y';", checkbox);

            const ln = await driver.wait(until.elementLocated(By.id('CLAU00030')), 10000);
            await ln.sendKeys(user?.lastName || '');

            const NINumber = await driver.wait(until.elementLocated(By.id('CLAU00040')), 10000)
            await NINumber.sendKeys(user?.nationalInsuranceNumber || '');

            const dd = await driver.wait(until.elementLocated(By.id('dpCLAU00050_P1')), 10000)
            await dd.sendKeys(bdate[2] || '');
            // await dd.sendKeys(new Date(user?.dateOfBirth).getDate() || '');

            const mm = await driver.wait(until.elementLocated(By.id('dpCLAU00050_P2')), 10000)
            await mm.sendKeys(bdate[1] || '');
            // await mm.sendKeys(new Date(user?.dateOfBirth).getMonth() || '');

            const yy = await driver.wait(until.elementLocated(By.id('dpCLAU00050_P3')), 10000)
            await yy.sendKeys(bdate[0] || '');
            // await yy.sendKeys(new Date(user?.dateOfBirth).getFullYear() || '');

            const postcode = await driver.wait(until.elementLocated(By.id('CLAU00060')), 10000)
            await postcode.sendKeys(user?.property?.postCode || '');

            const refNum = await driver.wait(until.elementLocated(By.id('CLAU00070')), 10000)
            await refNum.sendKeys(user?.claimReferenceNumber || '');

            const nextButton = await driver.wait(until.elementLocated(By.id('nextButton')), 10000);
            await driver.executeScript("arguments[0].scrollIntoView(true);", nextButton);
            await driver.executeScript("window.scrollBy(0, -100);");
            await driver.wait(until.elementIsVisible(nextButton), 5000);
            if (nextButton.isDisplayed()) {
                await driver.executeScript("arguments[0].click();", nextButton);
            }
            try {
            } catch (error) {
                if (error.name === 'ElementClickInterceptedError') {
                    await nextButton.click();
                } else {
                    throw error;
                }
            }
            const pageSource = await driver.getPageSource();
            await driver.sleep(3000);
            let userData = {}
            try {
                const errorInFetchingData = await driver.findElement(By.className('validation-summary'));
                if (errorInFetchingData) {
                    const errorList = await errorInFetchingData.findElements(By.tagName('li'));
                    if (errorList.length > 0) {
                        const errorMessages = [];
                        for (const errorItem of errorList) {
                            const errorMessage = await errorItem.getText();
                            errorMessages.push(errorMessage);
                        }
                        userData = { error: errorMessages.toString(), status: 0, checked: 0 }
                        // return res({ error: errorMessages.toString(), status: 0, checked: 0 });
                    } else {
                        console.log('No error messages found within the validation-summary');
                    }
                }
            } catch (error) {
                if (error.name === 'NoSuchElementError') {
                    console.log('No validation-summary element found. Moving to table...');
                } else {
                    throw error; // Re-throw the error if it's not related to the missing element
                }
            }

            try {
                const table = await driver.wait(until.elementLocated(By.id('R12666048653399214table')), 10000);
                const rows = await table.findElements(By.css('tbody tr'));
                const tableData = {};
                for (let row of rows) {
                    const cells = await row.findElements(By.css('td'));
                    const key = (await cells[0].getText()).replaceAll(' ', '_').trim();
                    const value = await cells[1].getText();
                    userData[key] = value;
                }
                
                // console.log('tableData=>', tableData);
                // userData['Housing_benefit_weekly_amount'] = tableData['Housing benefit weekly amount']
                // userData['Next_HB_payment_date'] = tableData['Next HB payment date']
                // userData['Next_HB_payment_amount'] = tableData['Next HB payment amount'] || 0

                // // userData['status'] = tableData?.Status === 'Active' ? 1 : 0
                // userData['status'] = tableData?.Status === 'Active' ? 1 : 0
                // // userData['Housing_benefit_weekly_amount'] = Number(tableData['Housing_benefit_weekly_amount'].split(' ')[1])
                // // userData['Next_HB_payment_amount'] = Number(tableData['Next_HB_payment_amount'].split(' ')[1])
                // // userData['Next_HB_payment_date'] = moment(tableData['Next_HB_payment_date'], 'DD/MM/YYYY').toISOString()
                // userData['checked'] = 1
            } catch (error) {
                if (error.name === 'NoSuchElementError') {
                    console.log('No tenant details found. Task Over...');
                } else {
                    throw error; // Re-throw the error if it's not related to the missing element
                }
            }


            res({ ...userData })
        } catch (error) {
            rej(error)
        } finally {
            await driver.quit();

            rej()
        }
    })

}

// Execute the scraper function
export default CheckStatus;
// const isActive = pageSource.includes('<td headers="QUE_RESPONSE">Active</td>');
// const isIneligible = pageSource.includes('<td headers="QUE_RESPONSE">Ineligible</td>');
// const amount = ''
// let tdElement = await driver.findElement(By.css('td[headers="QUE_RESPONSE"]'));
// let innerHTML = await tdElement.getAttribute('innerHTML');
// let value = innerHTML.match(/&#xA3;\s*(\d+(\.\d+)?)/)[1];