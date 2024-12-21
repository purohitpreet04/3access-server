import { getDynemicPdf } from "./GetDynemicDocuments.js";
import puppeteer from "puppeteer";

export const GeneratePdf = async (type, id) => {
    let browser = null;
    return new Promise(async (resolve, reject) => {
        try {
            const htmlContent = await getDynemicPdf(type, id, true) || '<p>No content available</p>';
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
                    <div style="text-align: left; width: 100%; padding-left: 20px;">
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
            reject(new Error(`PDF generation failed: ${error.message}`));
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    })

};
