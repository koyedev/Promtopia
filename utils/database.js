import mongoose from "mongoose";

let isConnected = false
export const ConnectToDb = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log("MongoDb is already Connected");
        return
    }

    try{
     await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "",
        useNewUrlParser: true,
        useUnifiedTopology: true
     })
     isConnected = true
     console.log("MonogoDb COnnected")

    }catch(err){
      console.log(err)
    }
}