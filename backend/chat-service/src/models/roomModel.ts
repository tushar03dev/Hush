import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
    name?: string;
    isGroup: boolean;
    members: mongoose.Types.ObjectId[];
    admins?: mongoose.Types.ObjectId[];
    chats?: {
        roomId: mongoose.Types.ObjectId;
        timestamps: Date;
        sender: mongoose.Types.ObjectId;
        dataType: 'video' |  'audio' | 'text' | 'image';
        encryptedContent: string | { video: string; text: string };
        iv: string;
        tag?: string; //  authentication tag for AES-GCM
    }[];
}

const RoomSchema = new Schema<IRoom>({
    name: { type: String, required: function() { return this.isGroup; } },
    isGroup: { type: Boolean, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    chats: [
        {
            roomId: {type: Schema.Types.ObjectId, ref: 'Room', required: true},
            timestamps: { type: Date, default: Date.now },
            sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            dataType: { type: String, enum: ['video','audio', 'text', 'image'], required: true },
            encryptedContent: { type: Schema.Types.Mixed, required: true },
            iv: { type: String, required: true },
            tag: { type: String }, //  authentication tag for AES-GCM
        }
    ],
});

export const Room = mongoose.model<IRoom>('ChatRoom', RoomSchema);


