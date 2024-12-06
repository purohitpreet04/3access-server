import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import moment from 'moment';
import path from 'path';
import puppeteer from 'puppeteer';

config()

export const HandleError = (req, res, error, status = 500) => {
  res.status(status).send({ message: "internal server Error...", success: false, severity: 'error' })
}

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const getDate = (date, format = "DD-MM-YYYY") => {
  if (date == (null || '')) {
    return moment().format(format)
  } else {
    return date != ('' || null) ? moment(date).format(format) : ''
  }
}


export const generateAttachments = (filePath) => {
    return {
      filename: path.basename(filePath), // Extracts the file name
      path: path.join(process.env.__dirname, filePath), // Creates an absolute path
    };
};


export const generatePdfFromHtml = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(htmlContent);

  // Generate PDF in memory
  const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
};