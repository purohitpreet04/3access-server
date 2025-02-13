import { getDynemicPdf } from "./GetDynemicDocuments.js";
import puppeteer from "puppeteer";
import Property from "../DB/Schema/PropertySchema.js";
import user from "../DB/Schema/userSchema.js";
import RSL from "../DB/Schema/RSLSchema.js";
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

//using puppeteer
export const GeneratePdf = async (type, id, data, assessment_id) => {
    let browser = null;
    return new Promise(async (resolve, reject) => {
        try {
            const htmlContent = await getDynemicPdf(type, id, true, data, assessment_id) || '<p>No content available</p>';
            const browser = await puppeteer.launch({
                headless: 'new',
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--font-render-hinting=none'
                ]
            });
            const page = await browser.newPage();
            await page.setViewport({
                width: 1200,
                height: 800
            });

            await page.setContent(htmlContent?.html, {
                waitUntil: ['domcontentloaded', 'networkidle0'],
                timeout: 30000
            });
            await page.evaluateHandle('document.fonts.ready');
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '50mm',
                    bottom: '20mm',
                    left: '20mm',
                    right: '20mm',
                },
                displayHeaderFooter: true,
                headerTemplate: `
                    <div style="text-align: left; padding-left: 20px; position:reletive, right:20px, top:10px">
                        <img src="${htmlContent?.logo}" style="width: 100px; height: 100px;" />
                    </div>
                `,
                footerTemplate: `
                    <div style="text-align: center; width: 100%; padding-top: 10px;">
                        Page <span class="pageNumber"></span> of <span class="totalPages"></span><br/>
                        Generated on: ${new Date().toLocaleDateString()}
                    </div>
                `,
                preferCSSPageSize: true,
            });

            await browser.close();
            resolve(pdfBuffer);
        } catch (error) {
            reject({});
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    })
};
