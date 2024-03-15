import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise

const reportSchema = new Schema({
    reportId: String,
    subjectType: String,
    subjectId: String,
    reason: String,
    userName: String,
},
    {
        timestamps: true,
    }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema)

export default Report;