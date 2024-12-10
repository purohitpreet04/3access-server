import puppeteer from "puppeteer";
import { getDocumentModule } from "./DocumentModel.js"

export const GeneratePdf = async (type, id) => {
    try {
      const htmlContent = await getDocumentModule(type, id); // Fetch HTML content based on type and id
      
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      // Set the content of the page (HTML to be rendered)
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  
      // Generate PDF directly as a buffer, without saving it as a file
      const buffer = await page.pdf({
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      });
  
      await browser.close();
      return buffer; // Return the PDF buffer directly
    } catch (error) {
      console.error('Error generating PDF:')
    //   throw new Error('Failed to generate PDF');
    }
  };