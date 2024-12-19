import { getDocumentModule } from "./DocumentModel.js"
import path from 'path';
import { __dirname } from "../../index.js";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake";
import { JSDOM } from "jsdom";
import { getDynemicPdf } from "./GetDynemicDocuments.js";


export const GeneratePdf = async (type, id) => {
    try {
        const htmlContent = await getDynemicPdf(type, id, true) || '<p>No content available</p>';
                const fonts = {
                   Roboto: {
                       normal: path.join(__dirname, "font/Roboto-Regular.ttf"),
                       bold: path.join(__dirname, "font/Roboto-Bold.ttf"),
                       italics: path.join(__dirname, "font/Roboto-Italic.ttf"),
                       bolditalics: path.join(__dirname, "font/Roboto-BoldItalic.ttf"),
                   },
                   Arial: {
                       normal: path.join(__dirname, "font/ArialTh.ttf"),
                       bold: path.join(__dirname, "font/Roboto-Bold.ttf"),
                       italics: path.join(__dirname, "font/Roboto-Italic.ttf"),
                       bolditalics: path.join(__dirname, "font/Roboto-BoldItalic.ttf"),
                   }
               };

        const sanitizedHtmlContent = htmlContent.html.replace(/id="isPasted"/g, "");
        const dom = new JSDOM(sanitizedHtmlContent);
        const pdfContent = htmlToPdfmake(dom.window.document.body.innerHTML, { window: dom.window });
        const printer = new pdfMake(fonts);
        const docDefinition = {
            // content: htmlContent.html,
            content: pdfContent,
            styles: {
                body: {
                    fontSize: 12,
                    margin: [10, 10, 10, 10],
                },
            },
            pageMargins: [20, 30, 20, 30], // Define page margins
            header: async (currentPage, pageCount) => ({
                columns: [
                    {
                        image: htmlContent.logo,
                        width: 20,
                        height: 20,
                        alignment: 'left',
                    },
                    {
                        text: `Page ${currentPage} of ${pageCount}`,
                        alignment: 'right',
                        margin: [0, 20, 20, 0],
                        fontSize: 8,
                    },
                ],
                margin: [20, 10],
            }),
            footer: (currentPage) => ({
                text: `Generated on: ${new Date().toLocaleDateString()}`,
                alignment: 'center',
                fontSize: 8,
                margin: [0, 10],
            }),
            pageSize: 'A4',
            pageMargins: [50, 50, 50, 50], // Add extra margin for border
            background: () => ({
                canvas: [
                    {
                        type: 'rect', // Draw border
                        x: 10,
                        y: 10,
                        w: 575,
                        h: 822, // Adjust for A4 size
                        lineWidth: 1,
                    },
                ],
            }),
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=document.pdf');
            res.send(pdfBuffer);
        });
        
        const pdfBuffer = Buffer.concat(chunks);
        
        pdfDoc.end();
        return pdfBuffer
        
    } catch (error) {
      console.error('Error generating PDF:')
    }
  };
// export const GeneratePdf = async (type, id) => {
//     try {
//       const htmlContent = await getDocumentModule(type, id); // Fetch HTML content based on type and id
      
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
  
//       // Set the content of the page (HTML to be rendered)
//       await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  
//       // Generate PDF directly as a buffer, without saving it as a file
//       const buffer = await page.pdf({
//         format: 'A4',
//         margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
//       });
  
//       await browser.close();
//       return buffer; // Return the PDF buffer directly
//     } catch (error) {
//       console.error('Error generating PDF:')
//     //   throw new Error('Failed to generate PDF');
//     }
//   };