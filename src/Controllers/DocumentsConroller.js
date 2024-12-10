import { getDocumentModule } from "../Models/DocumentModel.js";

export const getdocument = async (req, res) => {
    try {
        const { type, id } = req.query;
        const htmlContent = await getDocumentModule(type, id)
       
        // console.log(userdata)
        res.send(htmlContent)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch tenant details',
            error: error.message,
        });
    }
}