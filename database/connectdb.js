import mongoose from "mongoose";


try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("connect db ok ✔️")
} catch (error) {
    console.log("error connecting to mongodb:" + error)
}