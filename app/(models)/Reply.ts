import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise


const replySchema = new Schema({
    postId: String,
    parentId: String,
    reply: String,
    userName: String,
},
    {
        timestamps: true,
    }
);

const Reply = mongoose.models.Thread || mongoose.model("Reply", replySchema)

export default Reply;