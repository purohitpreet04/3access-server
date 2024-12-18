import mongoose from "mongoose"
import RSL from "../DB/Schema/RSLSchema.js"

export const getallRsl = async (id, page, limit, search, filter) => {
    const rslData = await RSL.find({ addedBy: new mongoose.Types.ObjectId(id), role: 'company' }, { password: 0, staff: 0, companyagent: 0, emailcc: 0, emailto: 0 })
    if (rslData.length === 0) {
        return { data: [], success: false }
    }
    return { data: rslData, success: false }
}