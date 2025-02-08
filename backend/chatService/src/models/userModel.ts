import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    id: { type: Schema.Types.ObjectId, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('users', userSchema);


