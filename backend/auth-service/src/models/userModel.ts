import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    rooms: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms:{type:[Schema.Types.ObjectId]}
});

export const User = mongoose.model<IUser>('users', userSchema);

