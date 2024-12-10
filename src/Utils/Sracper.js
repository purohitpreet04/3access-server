import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function CheckStatus(user) {
    // Configure Chrome options
    return new Promise(async (res, rej) => {
        const options = new chrome.Options();
        options.addArguments('--headless'); // Run browser in headless mode (no UI)
        options.addArguments('--disable-gpu'); // Recommended for headless mode
        options.addArguments('--no-sandbox'); // Useful in some environments
        options.addArguments('--disable-dev-shm-usage'); // Prevent resource issues

        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        try {
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
            await dd.sendKeys(new Date(user?.dateOfBirth).getDate() || '');

            const mm = await driver.wait(until.elementLocated(By.id('dpCLAU00050_P2')), 10000)
            await mm.sendKeys(new Date(user?.dateOfBirth).getMonth() || '');

            const yy = await driver.wait(until.elementLocated(By.id('dpCLAU00050_P3')), 10000)
            await yy.sendKeys(new Date(user?.dateOfBirth).getFullYear() || '');

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
            const isActive = pageSource.includes('<td headers="QUE_RESPONSE">Active</td>');
            const isIneligible = pageSource.includes('<td headers="QUE_RESPONSE">Ineligible</td>');
            // const amount = ''
            let tdElement = await driver.findElement(By.css('td[headers="QUE_RESPONSE"]'));
            let innerHTML = await tdElement.getAttribute('innerHTML');
            let value = innerHTML.match(/&#xA3;\s*(\d+(\.\d+)?)/)[1];

            console.log(value);
            res(isActive)

        } catch (error) {
            rej(error)
            console.error('An error occurred in checking tenant status:', error);
        } finally {
            await driver.quit();
            console.log('Browser session ended.');
            rej()
        }
    })

}

// Execute the scraper function
export default CheckStatus;
