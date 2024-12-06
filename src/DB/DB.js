import mongoose from "mongoose";

const DbConnnection = async () => {
    // console.log(process.env.DB_STRING)
    await mongoose.connect(process.env.DB_STRING).then((res) => {
        console.log('data base is on')
    }).catch(err => console.log("err in database connection -->",err))
}
export { DbConnnection }
