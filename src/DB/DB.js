import mongoose from "mongoose";

const DbConnnection = async () => {
    // console.log(process.env.DB_STRING)
    await mongoose.connect("mongodb+srv://3access:3access@cluster0.ala49.mongodb.net/3Access", {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      }).then((res) => {
        console.log('data base is on')
    }).catch(err => console.log("err in database connection -->",err))
}
export { DbConnnection }
