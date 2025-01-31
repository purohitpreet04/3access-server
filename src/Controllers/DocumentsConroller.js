import { getDocumentModule } from "../Models/DocumentModel.js";
import { getDynemicPdf } from "../Models/GetDynemicDocuments.js";
import pdfMake from "pdfmake";
import path from "path";
import { getPreSignedUrl } from "../Utils/s3Config.js";

export const getdocument = async (req, res) => {
    try {
        const { type, id, assessment_id } = req.query;

        const htmlContent = await getDynemicPdf(type, id, false, {}, assessment_id) || ''
        // let html = addFooterToHTML(htmlContent.html, htmlContent.logo);
        // let bhtml = addBorderAndSpacingToHTML(htmlContent.html, htmlContent.logo);
        res.send(htmlContent.html)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch tenant details',
            error: error.message,
        });
    }
}


// Function to add footer with logo
const addFooterToHTML = (html, logoURL) => {
    const footerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: #f8f8f8; border-top: 1px solid #ddd; text-align: center; padding: 10px;">
            <img src="${logoURL}" alt="Logo" style="height: 40px;">
        </div>
    `;

    if (html.includes('</body>')) {
        return html.replace('</body>', `${footerHTML}</body>`);
    }
    return footerHTML + html;
};



