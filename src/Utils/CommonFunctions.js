import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import moment from 'moment';
import path from 'path';
// import puppeteer from 'puppeteer';
import { tenatsignImageArray } from '../../test.js';
import { getPreSignedUrl } from './s3Config.js';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';
import { s3 } from './s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';


config()

export const HandleError = (req, res, error = {}, status = 500, message) => {
  res.status(status).send({ message: message || "internal server Error...", success: false, severity: 'error' })
}

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '8hr',
  });
};

export const getDate = (date, format = "DD-MM-YYYY") => {
  if (!date) {
    return moment().format(format);
  }

  const parsedDate = moment(date, moment.ISO_8601, true);
  if (!parsedDate.isValid()) {
    return "";
  }

  return parsedDate.format(format);
}

// export const getDate = (date, format = "DD-MM-YYYY") => {
//   if (!date) {
//     return formatDate(new Date(), format);
//   }
//   const parsedDate = new Date(date);
//   if (isNaN(parsedDate.getTime())) {
//     return "";
//   }
//   return formatDate(parsedDate, format);
// };

// const formatDate = (date, format) => {

//   const day = String(date.getUTCDate()).padStart(2, "0");
//   const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//   const year = date.getUTCFullYear();

//   switch (format) {
//     case "DD-MM-YYYY":
//       return `${day}-${month}-${year}`;
//     case "MM-DD-YYYY":
//       return `${month}-${day}-${year}`;
//     case "YYYY-MM-DD":
//       return `${year}-${month}-${day}`;
//     default:
//       throw new Error("Unsupported format");
//   }
// };



export const generateAttachments = (filePath) => {
  return {
    filename: path.basename(filePath), // Extracts the file name
    path: path.join(process.env.__dirname, filePath), // Creates an absolute path
  };
};


export const generatePdfFromHtml = async (htmlContent) => {


  return false
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();

  // // Set the HTML content
  // await page.setContent(htmlContent);

  // // Generate PDF in memory
  // const pdfBuffer = await page.pdf({
  //   format: 'A4',
  //   printBackground: true,
  // });

  // await browser.close();
  // return pdfBuffer;
};

// export function replacePlaceholders(template, data) {

//   return template.replace(/{{(.*?)}}/g, async (_, key) => {
//     if (tenatsignImageArray.includes(key)) {
//       return key.trim() in data ? `<img src="${data[key.trim()]}" alt="Logo" style="height: 40px;"></img>` : `{{${key}}}`;
//     }
//     return key.trim() in data ? data[key.trim()] : `{{${key}}}`;
//   });
// }


// export async function replacePlaceholders(template, data) {
//   // Match all placeholders
//   const matches = template.match(/{{(.*?)}}/g);

//   if (!matches) return template;
//   // console.log(matches);

//   const replacements = await Promise.all(
//     matches.map(async (placeholder) => {
//       const key = placeholder.replace(/{{|}}/g, "").trim();
//       const isImageKey = tenatsignImageArray.some(({ key: imageKey }) => imageKey === key);

//       // If it's an image key, handle getPreSignedUrl
//       if (isImageKey) {
//         const preSignedUrl = data[key] ? await getPreSignedUrl(data[key]) : null;

//         return preSignedUrl
//           ? { placeholder, replacement: `<img src="${preSignedUrl}" alt="Logo" style="height: 100px;"></img>` }
//           : { placeholder, replacement: '' };
//       }

//       // If not an image key, replace with data or keep placeholder
//       return key in data
//         ? { placeholder, replacement: data[key] }
//         : { placeholder, replacement: placeholder };
//     })
//   );

//   // Replace placeholders with resolved values
//   let result = template;
//   replacements.forEach(({ placeholder, replacement }) => {
//     result = result.replace(placeholder, replacement);
//   });

//   return result;
// }


export async function replacePlaceholders(template, data) {
  try {
    const matches = template.match(/{{(.*?)}}/g);

    if (!matches) return template;

    const replacements = await Promise.all(
      matches.map(async (placeholder) => {
        const key = placeholder.replace(/{{|}}/g, "").trim();
        const isImageKey = tenatsignImageArray.some(({ key: imageKey }) => imageKey === key);

        if (isImageKey) {
          const imageUrl = data[key] ? await getPreSignedUrl(data[key]) : null;
          let base64img = ''
          if (imageUrl && /^https?:\/\//.test(imageUrl)) {
            try {
              const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
              const base64Image = Buffer.from(response.data).toString('base64');
              const fileType = response.headers['content-type'];
              base64img = `data:${fileType};base64,${base64Image}`;
            } catch (imageError) {
              base64img = ''; // Fallback to empty string if image fetch fails
            }

            return {
              placeholder,
              replacement: `
              <img src="${base64img}" alt="signs" style="height: 200px; width: 200px; object-fit: contain; margin-right: 10px;" />
              `
            };
          }

          return { placeholder, replacement: placeholder || '' };
        }

        return key in data
          ? { placeholder, replacement: data[key] || '' }
          : { placeholder, replacement: placeholder || '' };
      })
    );

    let result = template;
    replacements.forEach(({ placeholder, replacement }) => {
      result = result.replace(placeholder, replacement);
    });

    return result;

  } catch (error) {
    console.log(error);
  }
}

export async function generateHtmlforPdf(template, data) {
  try {
    const matches = template.match(/{{(.*?)}}/g);

    if (!matches) return template;

    const replacements = await Promise.all(
      matches.map(async (placeholder) => {
        const key = placeholder.replace(/{{|}}/g, "").trim();
        const isImageKey = tenatsignImageArray.some(({ key: imageKey }) => imageKey === key);

        if (isImageKey) {
          const imageUrl = data[key] ? await getPreSignedUrl(data[key]) : null;
          let base64img = '';
          if (imageUrl && /^https?:\/\//.test(imageUrl)) {
            try {
              const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
              const base64Image = Buffer.from(response.data).toString('base64');
              const fileType = response.headers['content-type'];
              base64img = `data:${fileType};base64,${base64Image}`;
            } catch (imageError) {
              base64img = '';
            }

            return {
              placeholder,
              replacement: {
                image: base64img,
                width: 40,
                height: 20,
                alignment: 'center',
              } || '',
            };
          }

          return { placeholder, replacement: placeholder || '' };
        }

        return key in data
          ? { placeholder, replacement: data[key] }
          : { placeholder, replacement: placeholder };
      })
    );


    // Replace placeholders with pdfMake-compatible replacements
    let result = template;
    replacements.forEach(({ placeholder, replacement }) => {
      if (typeof replacement === 'object') {
        result = result.replace(placeholder, `
              <img src="${replacement?.image}" alt="signs" style="height: 200px; width: 200px;" />
              `);
      } else {
        result = result.replace(placeholder, replacement);
      }
    });

    return result; // Convert stringified objects back to JSON format
  } catch (error) {

    console.error('Error replacing placeholders:', error.message);
  }
}

export const sanitizeContent = (htmlContent) => {
  // First sanitize the HTML content
  let sanitizedContent = sanitizeHtml(htmlContent, {
    allowedTags: [
      'b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'br', 'table', 'tr', 'td', 'th', 'span', 'div'
    ],
    allowedAttributes: {
      '*': ['href', 'src', 'alt', 'title', 'style'],  // Allow 'style' attribute to preserve inline styles
      'a': ['href'],
      'img': ['src', 'alt'],
      'table': ['border', 'cellspacing', 'cellpadding', 'align', 'width', 'height'], // Allow all table attributes
      'tr': ['align', 'valign'],
      'th': ['align', 'valign', 'rowspan', 'colspan'],
      'td': ['align', 'valign', 'rowspan', 'colspan', 'width', 'height'],
      'p': ['*'],
      'div': ['*'],
      'span': ['*'],
      'h1': ['*'], 'h2': ['*'], 'h3': ['*'], 'h4': ['*'], 'h5': ['*'], 'h6': ['*'],
      'ul': ['*'], 'li': ['*']
    },
    allowedStyles: {
      '*': {
        // Allow common CSS properties that pdfMake can support
        'color': [/^\#([0-9A-F]{3}){1,2}$/i],
        'font-size': [/^\d+(px|em|%)$/],
        'font-family': [/^([\w\s\-]+)$/],
        'line-height': [/^\d+(px|em|%)$/],
        'text-align': ['left', 'right', 'center', 'justify'],
        'font-weight': ['normal', 'bold'],
        'font-style': ['normal', 'italic'],
        'background': [/^\#([0-9A-F]{3}){1,2}$/i],
        "border": [/^#[0-9A-F]{3}([0-9A-F]{3})?$/i]

      }
    }
  });

  // Replace font-family style with Roboto
  sanitizedContent = sanitizedContent
    .replace(/font-family:[^;]+/g, 'font-family: Roboto')
    // .replace(/<table([^>]*)style="([^"]*)"/g, '<table$1style="$2; width:100%;"') // Append width to existing style
    .replace(/<table(?![^>]*style)/g, '<table style="width:100%;"'); // Add style if it doesn't exist
  return htmlContent;
};


export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const isTokenExpired = (expiryDate) => {
  return new Date() > expiryDate;
};


export const UploaadBase64ToS3 = async (obj) => {

  const ProccessObject = async (data) => {
    for (let key in data) {
      const value = data[key];

      if (typeof value === 'object') {
        data[key] = await ProccessObject(value)
      } else if (typeof value === 'string' && value.startsWith('data:image/png;base64,')) {
        try {
          const [, format, base64Data] = value.match(/^data:image\/(\w+);base64,(.*)$/) || [];
          const fileName = `${Date.now()}-${key}.png`;
          const buffer = Buffer.from(base64Data, 'base64');
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `uploads/signatures/${fileName}`,
            Body: buffer,
            ContentType: 'image/png',
          }
          await s3.send(new PutObjectCommand(params));
          data[key] = `uploads/signatures/${fileName}`
        } catch (err) {
          console.log('error in UploaadBase64ToS3', err);
          return {}
        }
      } else {
        data[key] = value
      }
    }
    return data
  }

  return await ProccessObject({ ...obj });

}


export let property = [
  "property",
  "postCode",
  "city",
  "area",
  "address",
  "rslTypeGroup",
  "Proeprty",
  "bedrooms",
  "basicRent",
  "serviceCharges",
  "eligibleRent",
  "ineligibleCharge",
  "sharedWithOther",
  "fullAddress",
  "addedByModel",
  "addedByRole",
  "addedBy"
]

export let tenant = [
  "firstName",
  "middleName",
  "lastName",
  "room",
  "dateOfBirth",
  "nationalInsuranceNumber",
  "claimReferenceNumber",
  "signInDate",
  "signOutDate",
  "addedByModel",
  "addedByRole",
  "addedBy"
]

export let replaceData = {
  rslTypeGroup: "Rsl",
  doornumber: "Door Number",
  rodename: "Road Name",
  area: "Area Name",
  city: "City",
  postCode: "Postcode",
  bedrooms: "Number of Bedrooms in Property",
  basicRent: "Basic Rent",
  serviceCharges: "Service Charges",
  eligibleRent: "eligible Rent",
  ineligibleCharge: "weekly eligible Charge",
  sharedWithOther: "Bedroom sharedWithOther",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Surname",
  room: "Room",
  dateOfBirth: "Date of Birth",
  nationalInsuranceNumber: "NINO",
  claimReferenceNumber: "Claim Reference No",
  signInDate: "Sign In Date"
}