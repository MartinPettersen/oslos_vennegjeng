import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise
import { Post } from "@/types/Post";


type Thread = {
    headline: String,
    userName: String,
    content: String,
    replies: Post[],
}

const postSchema = new Schema({
    postId: String,
    parentId: String,
    reply: String,
    userName: String,
    children: Array,
    

},
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post;