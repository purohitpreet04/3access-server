import mongoose, { isValidObjectId } from "mongoose";
import user from "../DB/Schema/userSchema.js";
import Tenants from "../DB/Schema/TenantsSchema.js";

export const sendEmailtoAgent = async (_id, status) => {
    if (isValidObjectId(_id)) return null


    


}