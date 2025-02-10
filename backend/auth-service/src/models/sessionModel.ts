import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    token: string;
    updatedAt: Date;
}

const SessionSchema = new Schema<ISession>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    token: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

export const Session = mongoose.model<ISession>("Session", SessionSchema);
