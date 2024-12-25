import mongoose from "mongoose"
import RSL from "../DB/Schema/RSLSchema.js"

// export const getallRsl = async (id, page, limit, search, filter) => {
//     const rslData = await RSL.find({
//         addedBy: new mongoose.Types.ObjectId(id),
//         role: 'company', status: 0
//     },
//      { password: 0, staff: 0, companyagent: 0, emailcc: 0, emailto: 0 }
//     )
//     if (rslData.length === 0) {
//         return { data: [], success: false }
//     }
//     return { data: rslData, success: false }
// }

export const getallRsl = async (id, page = 1, limit = 10, search, filter) => {
    try {
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const query = {
            addedBy: new mongoose.Types.ObjectId(id),
            role: 'company',
            status: 0
        };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
            ];
        }

        const totalCount = await RSL.countDocuments(query);

        const rslData = await RSL.find(
            query,
            { password: 0, staff: 0, companyagent: 0, emailcc: 0, emailto: 0 }
        )
        .skip(skip)
        .limit(limitNum)
        .lean();

        if (rslData.length === 0) {
            return {
                data: [],
                success: false,
                pagination: {
                    total: totalCount,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(totalCount / limitNum)
                }
            };
        }

        return {
            data: rslData,
            success: true,
            pagination: {
                total: totalCount,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalCount / limitNum)
            }
        };
    } catch (error) {
        return {
            data: [],
            success: false,
            error: error.message,
            pagination: {
                total: 0,
                page: 1,
                limit: limit,
                totalPages: 0
            }
        };
    }
};
