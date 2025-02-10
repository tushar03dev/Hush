import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    rooms: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    id: { type: Schema.Types.ObjectId, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms:{type:[Schema.Types.ObjectId]}
});

export const User = mongoose.model<IUser>('users', userSchema);


